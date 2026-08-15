import { prisma } from '@/lib/prisma';

export interface GoogleUserProfile {
  id: string;
  email: string;
  verified_email?: boolean;
  name?: string;
  picture?: string;
}

export interface GoogleBusinessAccount {
  name: string; // Resource name format: "accounts/{accountId}"
  accountName: string;
  type?: string;
  role?: string;
  verificationState?: string;
}

export interface GoogleBusinessLocation {
  name: string; // Resource name format: "locations/{locationId}"
  title: string;
  storefrontAddress?: {
    addressLines?: string[];
    locality?: string;
    administrativeArea?: string;
    postalCode?: string;
    regionCode?: string;
  };
  websiteUri?: string;
  phoneNumbers?: {
    primaryPhone?: string;
  };
  categories?: {
    primaryCategory?: {
      displayName?: string;
    };
  };
  metadata?: {
    mapsUri?: string;
    placeId?: string;
  };
}

export class GoogleMyBusinessService {
  /**
   * Fetches the Google User Profile (email and identity) using OAuth 2.0 userinfo endpoint
   */
  static async fetchUserProfile(accessToken: string): Promise<GoogleUserProfile | null> {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        console.error('Failed to fetch Google userinfo:', await res.text());
        return null;
      }
      return await res.json();
    } catch (err) {
      console.error('Error in fetchUserProfile:', err);
      return null;
    }
  }

  /**
   * Calls Google My Business Account Management API to list verified accounts
   */
  static async fetchAccounts(accessToken: string): Promise<GoogleBusinessAccount[]> {
    try {
      const res = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Google Business Account Management API error:', errText);
        return [];
      }

      const data = await res.json();
      return data.accounts || [];
    } catch (err) {
      console.error('Error fetching Google Business accounts:', err);
      return [];
    }
  }

  /**
   * Calls Google My Business Business Information API to list locations for a given account
   */
  static async fetchLocations(
    accessToken: string,
    accountResourceName: string
  ): Promise<GoogleBusinessLocation[]> {
    try {
      const readMask = 'name,title,storefrontAddress,websiteUri,phoneNumbers,categories,metadata';
      const url = `https://mybusinessbusinessinformation.googleapis.com/v1/${accountResourceName}/locations?readMask=${encodeURIComponent(readMask)}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Google Business Information API error:', errText);
        return [];
      }

      const data = await res.json();
      return data.locations || [];
    } catch (err) {
      console.error('Error fetching Google Business locations:', err);
      return [];
    }
  }

  /**
   * Syncs all Google accounts and locations for a GoogleConnection, saving them to Prisma
   */
  static async syncConnection(connectionId: string, accessToken: string) {
    const connection = await prisma.googleConnection.findUnique({
      where: { id: connectionId },
    });

    if (!connection) {
      throw new Error('GoogleConnection record not found.');
    }

    const accounts = await this.fetchAccounts(accessToken);
    let totalLocationsSynced = 0;
    const syncedLocations: any[] = [];

    for (const account of accounts) {
      const locations = await this.fetchLocations(accessToken, account.name);

      for (const loc of locations) {
        const address = [
          loc.storefrontAddress?.addressLines?.join(', '),
          loc.storefrontAddress?.locality,
          loc.storefrontAddress?.administrativeArea,
          loc.storefrontAddress?.postalCode,
        ]
          .filter(Boolean)
          .join(', ');

        const gmbLocation = await prisma.googleLocation.create({
          data: {
            connectionId: connection.id,
            gmbAccountId: account.name,
            gmbLocationId: loc.name,
            locationName: loc.title,
            address: address || null,
            phone: loc.phoneNumbers?.primaryPhone || null,
            website: loc.websiteUri || null,
            category: loc.categories?.primaryCategory?.displayName || null,
            syncStatus: 'SYNCED',
            lastSyncedAt: new Date(),
          },
        });

        syncedLocations.push(gmbLocation);
        totalLocationsSynced++;
      }
    }

    await prisma.googleConnection.update({
      where: { id: connectionId },
      data: { updatedAt: new Date() },
    });

    return {
      accountsCount: accounts.length,
      locationsCount: totalLocationsSynced,
      syncedLocations,
    };
  }
}

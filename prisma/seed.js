const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const defaultPasswordHash = await bcrypt.hash('demo1234', 10);

  const demoUsers = [
    {
      id: 'user-owner-1',
      name: 'Dr. Marcus Miller',
      email: 'marcus@apexdentalstudio.demo',
      passwordHash: defaultPasswordHash,
      role: 'OWNER',
      planType: 'PRO',
    },
    {
      id: 'user-agency-1',
      name: 'Alexandra Vance',
      email: 'alexandra@vancegrowthagency.demo',
      passwordHash: defaultPasswordHash,
      role: 'AGENCY_ADMIN',
      planType: 'AGENCY',
      agencyId: 'agency-1',
    },
    {
      id: 'user-starter-1',
      name: 'David Rossi',
      email: 'david@quantumfitness.demo',
      passwordHash: defaultPasswordHash,
      role: 'OWNER',
      planType: 'STARTER',
    },
    {
      id: 'user-free-1',
      name: 'Sarah Connor',
      email: 'sarah@localartisan.demo',
      passwordHash: defaultPasswordHash,
      role: 'OWNER',
      planType: 'FREE',
    },
  ];

  for (const user of demoUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        passwordHash: user.passwordHash,
        role: user.role,
        planType: user.planType,
      },
      create: user,
    });
  }

  console.log('Successfully seeded 4 demo users into Prisma database.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

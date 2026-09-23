import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

import { EN_User } from '../../user/entity/user.entity';
import { EN_Role } from '../../user/entity/role.entity';
import { EN_Permission } from '../../user/entity/permission.entity';
import { userRoles, permissions } from '../../global/system.enums';

export async function seedSuperadmin(dataSource: DataSource): Promise<void> {
  const userRepo = dataSource.getRepository(EN_User);
  const roleRepo = dataSource.getRepository(EN_Role);
  const permissionRepo = dataSource.getRepository(EN_Permission);

  const email = process.env.SUPERADMIN_EMAIL || 'admin@lonavalamc.gov.in';
  const password = process.env.SUPERADMIN_PASSWORD || 'Admin@12345';
  const firstName = process.env.SUPERADMIN_FIRST_NAME || 'Super';
  const lastName = process.env.SUPERADMIN_LAST_NAME || 'Admin';
  const phone = process.env.SUPERADMIN_PHONE || '9876543210';

  console.log(`🌱 Checking / Seeding superadmin user: ${email}...`);

  // 1. Ensure SUPER_ADMIN role exists
  let superRole = await roleRepo.findOne({
    where: { role: userRoles.SUPER_ADMIN },
    relations: ['permissions'],
  });

  if (!superRole) {
    const newRole = roleRepo.create({
      role: userRoles.SUPER_ADMIN,
    });
    superRole = await roleRepo.save(newRole);
    console.log(`   ✔ SUPER_ADMIN role created (id: ${superRole.id})`);
  } else {
    console.log(`   ✔ SUPER_ADMIN role found (id: ${superRole.id})`);
  }

  // 2. Ensure all permissions are assigned to SUPER_ADMIN role
  const allPermissions = Object.values(permissions);
  const existingPerms = await permissionRepo.find({
    where: { role: { id: superRole.id } },
  });
  const existingPermNames = new Set(existingPerms.map((p) => p.permission));

  for (const perm of allPermissions) {
    if (!existingPermNames.has(perm)) {
      const newPermission = permissionRepo.create({
        permission: perm,
        role: superRole,
      });
      await permissionRepo.save(newPermission);
      console.log(`   ✔ Added permission: ${perm} to SUPER_ADMIN role`);
    }
  }

  // 3. Create or update Superadmin user
  const existingUser = await userRepo.findOne({
    where: { email },
    relations: ['roles'],
  });

  if (existingUser) {
    let updated = false;
    if (!existingUser.roles || existingUser.roles.id !== superRole.id) {
      existingUser.roles = superRole;
      updated = true;
    }
    if (!existingUser.isVerified) {
      existingUser.isVerified = true;
      updated = true;
    }
    if (updated) {
      await userRepo.save(existingUser);
      console.log(`   ✔ Updated existing superadmin user roles and verification status.`);
    } else {
      console.log(`✅ Superadmin already exists and is configured properly (email: ${email}).`);
    }
    return;
  }

  // Create new Superadmin user
  const newUser = userRepo.create({
    email,
    password, // EN_User @BeforeInsert hashes password automatically
    firstName,
    lastName,
    phone,
    isVerified: true,
    roles: superRole,
  });

  const savedUser = await userRepo.save(newUser);
  console.log(
    `   ✔ Superadmin user created successfully (id: ${savedUser.id}, email: ${savedUser.email})`,
  );
  console.log(`🎉 Superadmin seed completed.`);
}

@Injectable()
export class SuperadminSeederService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SuperadminSeederService.name);

  constructor(
    @InjectRepository(EN_User)
    private readonly userRepo: Repository<EN_User>,

    @InjectRepository(EN_Role)
    private readonly roleRepo: Repository<EN_Role>,

    @InjectRepository(EN_Permission)
    private readonly permissionRepo: Repository<EN_Permission>,

    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const email = this.configService.get<string>('SUPERADMIN_EMAIL', 'admin@lonavalamc.gov.in');
    const password = this.configService.get<string>('SUPERADMIN_PASSWORD', 'Admin@12345');
    const firstName = this.configService.get<string>('SUPERADMIN_FIRST_NAME', 'Super');
    const lastName = this.configService.get<string>('SUPERADMIN_LAST_NAME', 'Admin');
    const phone = this.configService.get<string>('SUPERADMIN_PHONE', '9876543210');

    // 1. Ensure SUPER_ADMIN role exists
    let superRole = await this.roleRepo.findOne({
      where: { role: userRoles.SUPER_ADMIN },
      relations: ['permissions'],
    });

    if (!superRole) {
      const newRole = this.roleRepo.create({
        role: userRoles.SUPER_ADMIN,
      });
      superRole = await this.roleRepo.save(newRole);
    }

    // 2. Ensure all permissions assigned
    const allPermissions = Object.values(permissions);
    const existingPerms = await this.permissionRepo.find({
      where: { role: { id: superRole.id } },
    });
    const existingPermNames = new Set(existingPerms.map((p) => p.permission));

    for (const perm of allPermissions) {
      if (!existingPermNames.has(perm)) {
        const newPermission = this.permissionRepo.create({
          permission: perm,
          role: superRole,
        });
        await this.permissionRepo.save(newPermission);
      }
    }

    // 3. Ensure user exists
    const existingUser = await this.userRepo.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (existingUser) {
      if (!existingUser.roles || existingUser.roles.id !== superRole.id || !existingUser.isVerified) {
        existingUser.roles = superRole;
        existingUser.isVerified = true;
        await this.userRepo.save(existingUser);
      }
      return;
    }

    const newUser = this.userRepo.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      isVerified: true,
      roles: superRole,
    });
    await this.userRepo.save(newUser);
    this.logger.log(`🎉 Superadmin user seeded: ${email}`);
  }
}

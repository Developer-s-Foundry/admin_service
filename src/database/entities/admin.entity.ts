import { Column , PrimaryColumn, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { BaseModel } from "../../database/entities/base.entity";

export enum AccountStatus {
    ACTIVE = "active",
    SUSPENDED = "suspended",
    BANNED = "banned"
}

export enum AdminRole {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    MODERATOR = "moderator",
}

export interface IAdmin{
  admin_id: string;
  email: string;
  password: string;
  status: AccountStatus;
}

@Entity('admins')
export class Admin {
    @PrimaryColumn()
    admin_id: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', enum: ['active', 'inactive'], default: 'active' })
    status: string;

    @Column({ type: 'enum', enum: ['admin', 'super_admin'], default: 'admin' })
    role: string;
}
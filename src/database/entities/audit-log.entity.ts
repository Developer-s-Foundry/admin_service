// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
// import { Admin } from './admin.entity';

// @Entity('audit_logs')
// export class AuditLog {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Admin)
//   @JoinColumn({ name: 'admin_id' })
//   admin: Admin;

//   @Column()
//   action: string;

//   @Column()
//   targetType: string; // 'user', 'account', etc.

//   @Column()
//   targetId: string;

//   @Column('jsonb', { nullable: true })
//   meta: Record<string, any>;

//   @CreateDateColumn()
//   timestamp: Date;
// }

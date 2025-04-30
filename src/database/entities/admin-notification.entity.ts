// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
// import { Admin } from './admin.entity';

// @Entity('admin_notifications')
// export class AdminNotification {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Admin)
//   @JoinColumn({ name: 'admin_id' })
//   admin: Admin;

//   @Column()
//   title: string;

//   @Column()
//   message: string;

//   @Column({ default: false })
//   read: boolean;

//   @CreateDateColumn()
//   createdAt: Date;
// }

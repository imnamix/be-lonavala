import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('fileUpload')
export class EN_Upload {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: true })
  public fileName: string;

  @Column({ nullable: true })
  public fileSize: number;

  @Column({ nullable: true })
  public fileType: string;

  @Column({ nullable: true })
  public fileTitle: string;

  @Column({ nullable: true })
  public bucket: string;

  @Column()
  public fileUrl: string;

  @Column({ nullable: false, default: '123' })
  public key: string;

  @CreateDateColumn({ nullable: true })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @Column({ default: null, nullable: true })
  createdBy: number;

  @Column({ default: null, nullable: true })
  updatedBy: number;
}

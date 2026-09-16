import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('council_member')
export class CouncilMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Smt. Surekha Nitin Jadhav' })
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @ApiProperty({ example: 'श्रीमती सुरेखा नितीन जाधव' })
  @Column({ type: 'varchar', length: 200, default: '' })
  marathiName: string;

  @ApiProperty({ example: 'President (नगराध्यक्ष)' })
  @Column({ type: 'varchar', length: 200 })
  designation: string;

  @ApiProperty({ example: 'President', default: 'Corporator' })
  @Column({ type: 'varchar', length: 100, default: 'Corporator' })
  roleCategory: string;

  @ApiProperty({ example: 'Ward 1 - Bangarwadi & Railway Station' })
  @Column({ type: 'varchar', length: 200, default: 'Municipal Council' })
  ward: string;

  @ApiProperty({ example: '2022 - 2027' })
  @Column({ type: 'varchar', length: 100, default: '2022 - 2027' })
  tenure: string;

  @ApiProperty({ example: 'Standing Committee Chairperson', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  committee: string;

  @ApiProperty({ example: '+91 2114 273030' })
  @Column({ type: 'varchar', length: 50, default: '' })
  phone: string;

  @ApiProperty({ example: 'president@lonavalamc.gov.in' })
  @Column({ type: 'varchar', length: 150, default: '' })
  email: string;

  @ApiProperty({ example: 'LMC Administrative Complex, Lonavala - 410401', required: false })
  @Column({ type: 'varchar', length: 300, nullable: true, default: null })
  address: string;

  @ApiProperty({
    example:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  })
  @Column({ type: 'varchar', length: 1000, default: '' })
  imageUrl: string;

  @ApiProperty({ default: 0 })
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  @ApiProperty({ default: true })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedDate: Date;
}

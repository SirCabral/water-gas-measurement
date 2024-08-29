import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('measurements')
class Measure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('bytea')
  image: Buffer;

  @Column()
  URI: string;

  @Column()
  value: number;

  @Column()
  customer_code: string;

  @Column()
  date: Date;

  @Column()
  type: string;

  @Column({ default: false })
  has_confirmed: boolean;
}

export default Measure;
import { length } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Productos{
    
    @PrimaryColumn()
    id: number;
    @Column({length:50,nullable:false})
    nombre: string;
    @Column()
    precio: number;
    @Column()
    stock: number;
    @Column()
    categoria: number;
    @Column({default:1})
    estado: boolean;

}
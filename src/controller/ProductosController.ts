import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entity/Productos";

class ProductosController{

static getAll= async(req: Request, res: Response)=>{

    try {
        //instancia bd
        const repo= AppDataSource.getRepository(Productos);

        //consulta bd por metodo find
        const listaProductos= await repo.find({where:{estado:true}});

        //valido si trajo datos, sino devuelvo error
        if(listaProductos.length==0){
            return res.status(404).json({message:"No hay datos registrados"})
        }
     //retorno si encuentra los datos    
    return res.status(200).json(listaProductos)

    } catch (error) {
        return res.status(400).json({message:"Error al acceder a la base de datos"})
        
    }

}

static create= async(req: Request, res: Response)=>{

    const repoProducto= AppDataSource.getRepository(Productos)


    try {
        
        //destructuring
        const {id, nombre, precio, stock, categoria, estado}= req.body; 

      //validar datos 
      if(!id){
        return res.status(400).json({message:"Debe indicar un id del productor"})

        }
     if(!nombre){
        return res.status(400).json({message:"Debe indicar el nombre del productor"})

        }
     if(!precio){
            return res.status(400).json({message:"Debe indicar  el precio del productor"})
    
          }
     if(!stock){
        return res.status(400).json({message:"Debe indicar el stock del productor"})
    
        }
     if(!categoria){
        return res.status(400).json({message:"Debe indicar la categoria del productor"})
    
        }
     if(!estado){
        return res.status(400).json({message:"Debe indicar el estado del productor"})
        
        }
        //reglas de negocio 

        //validar si el producto existe

        let product= await repoProducto.findOne({where:{id}});
        if(product){
            return res.status(400).json({message:"Ese producto ya existe en la base de datos"})
        }

        if(stock<=0){
            return res.status(400).json({message:"El stock debe ser mayor a 0"})
        }
            
       product: new Productos;
       
       product.id=  id;
       product.nombre=nombre;
       product.precio=precio;
       product.categoria=categoria;
       product.stock=stock;
       product.estado=true;



     await repoProducto.save(product);


    } catch (error) {
        return res.status(400).json({message:"Error al guardar"})
        
    }

    return res.status(200).json("Producto guardado correctamente")   
}


static getOne= async(req: Request, res: Response)=>{

    try {
        const id = parseInt(req.params['id']);

        //Validacion de mas, por lo que vimos en clase.
        if(!id){
            return res.status(400).json({message: "Debe indicar el id"})
        }
        const repo= AppDataSource.getRepository(Productos);
        

        try {
            const producto= await repo.findOneOrFail({where:{id}});
            return res.status(200).json(producto);
        } catch (error) {
            
            return res.status(404).json({message:"El producto con el id indicado no fue encontrado"})
        }
       

    } catch (error) {
        
    }



}

}

export default ProductosController;
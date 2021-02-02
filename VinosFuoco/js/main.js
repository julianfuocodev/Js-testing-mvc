//Variables------------------------------------------------------

let data =[];
let carrito =[];
let compraConfirmada =[];
let cntdcarrito=0;
let cate;
let rd = false;


//Objetos-------------------------------------------------------

//Lista de productos
function listProductos(id, nombre, precio, categoria, color, talla, destacado){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = categoria;
    this.color = color;
    this.talla = talla;
    this.destacado = destacado;
 
    this.getId = function(){
        return this.id;
     }
     
     this.getNombre = function(){
       return this.nombre;
    }

    this.getPrecio = function(){
        return this.precio;
     }

     this.getCategoria = function(){
        return this.categoria;
     }

     this.getColor = function(){
        return this.color;
     }

     this.getTalla = function(){
        return this.talla;
     }

     this.getDestacado = function(){
        return this.destacado;
     }
 
 }


//Vista MVC-------------------------------------------------------------------

//Vista categoria
const index = `
<div class='col-3'>
    <div class='categoria'>
        <h2>Categorias:</h2>
        <form>
            <div>
                <input type='radio' id='tinto' onchange=cambiarCategoria() name='cat' value='Tinto'>
                <label for='Tinto'>Tinto</label>
            </div>
            <div>
                <input type='radio' id='blanco' onchange=cambiarCategoria() name='cat' value='Blanco'>
                <label for='Blanco'>Blanco</label>
            </div>
            <div>
                <input type='radio' id='cabernet' onchange=cambiarCategoria() name='cat' value='Cabernet'>
                <label for='Cabernet'>Cabernet</label>
            </div>

        </form>
    </div>
</div>
<div class ='col-9' id='productos'>
</div>
`


//Vista comprar

const comprar =`
<div class="comprar container">
<div class="align-self-center">
<h1>Completa tu compra</h1>
</div>
<div class="facturaDatos">
<div id="factura" class="col-6"></div>
<div id="datos" class="col-6">

<form class="datosCliente">

            
                <div class="form-row">
                  <div class="col">
                    <label for="firstName">Nombre</label>
                    <input type="text" class="form-control" id= "firstName" placeholder="Nombre">
                  </div>
                  <div class="col">
                    <label for="lasttName">Apellido</label>
                    <input type="text" class="form-control" id= "lastName" placeholder="Apellido">
                  </div>
                </div>
              


            <div class="form-row">
              <div class="form-group col-md-12">
                <label for="inputEmail4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Direccion</label>
              <input type="text" class="form-control" id="inputAddress" placeholder="Calle, numero, Edificio, Departamento">
            </div>
            <div class="form-row">
              <div class="form-group col-md-8">
                <label for="inputCity">Ciudad</label>
                <input type="text" class="form-control" id="ciudad" placeholder="Indique CABA o GBA">
              </div>
              <div class="form-group col-md-4">
                <label for="inputZip">Codigo Postal</label>
                <input type="text" class="form-control" id="postal" placeholder="Codigo Postal">
              </div>
            </div>
            <div class="form-group col-md-12"></div>
            <button onclick=confirmar() type="button" class="btn btn-success">Confirmar Compra</button>
            </div>
          </form>

</div>
</div>
</div>
`


//Funciones

//Borrar elemento
function borrarElemento(elemento){
    let borrarElemento = $(elemento);
    borrarElemento.remove();
 }

//Crear Tag
function crearTag(tag, clase, padre){
    let salida = document.createElement(tag)
    salida.className = clase;
    $(padre).append(salida);
}

//Crear elemento
function crearElemento(tag, contenido, padre){
    let salida = document.createElement(tag);
    salida.textContent = contenido;
    $(padre).append(salida)
}

//Select
function crearElementoSelect(tag, contenido, padre){
    let salida = document.createElement(tag);
    salida.className = contenido;
    salida.textContent = contenido;
    $(padre).append(salida)
    $("." + contenido).attr("value", contenido);
}

//Add Img
function agregarImagen(id){
    var image = new Image();

    var src = "img/"+id+".png"; 
    image.src = src;
    image.className = "img-fluid"
    $('.vista:last-child').append(image);
}

//Count
function cantidad(id){
 const cantidad = "<div class='containerCntd'><p>Cantidad</p><select class='form-control' id="+id+"><option class='1'>1</option><option class='2'>2</option><option class='3'>3</option><option class='4'>4</option><option class='5'>5</option></select></div>"
 $(".vista:last-child").append(cantidad);
}


//Productos por Categoria-----------------------------------------------------

//Mostrar productos
function mostrarProductos(){
    borrarElemento("#productos div");
    cate = $('input:radio[name=cat]:checked').val();//Se toma la categoria seleccionada
    data.forEach(item => {
        if(rd == false && cate === item.getCategoria() || rd && item.getDestacado()){//Si el producto coincide en la categoria seleccionada se renderiza
            crearTag("div", 'vista', "#productos");//Se crea un div para la tarjeta del producto
            crearElemento("h2", item.getNombre(), ".vista:last-child");//nombre
            agregarImagen(item.getId());//imagen
            crearElemento("h2", "$"+item.getPrecio(), ".vista:last-child");//precio
            crearTag("div", 'containerColor', ".vista:last-child");//se crea contenedor de area de seleccion de color
            crearElemento("p", "Color", "div.vista:last-child div.containerColor");//texto color
            crearTag("select", "form-control color"+item.getId(), "div.vista:last-child div.containerColor");//se crea un select para la seleccion de color
            item.getColor().forEach(element => {crearElementoSelect("option", element, ".vista:last-child select.color"+item.getId())});//colores
            crearTag("div", 'containerTalla', ".vista:last-child");//se crea contenedor de area de seleccion de talla
            crearElemento("p", "Talla", "div.vista:last-child div.containerTalla");//texto talla
            crearTag("select", "form-control talla"+item.getId(), "div.vista:last-child div.containerTalla");//se crea un select para la seleccion de talla
            item.getTalla().forEach(element => {crearElementoSelect("option", element, ".vista:last-child select.talla"+item.getId())});//tallas
            cantidad("cntd"+item.id);//Seleccion de cantidad
            $(".vista:last-child").append("<button onclick=agregarCarrito('"+item.getId()+"') type='button' class='btn btn-warning' id="+item.getId()+"'>Agregar al Carrito</button>" ); //agregar al carrito 
            $(".vista:last-child").hide();
            $(".vista:last-child").fadeIn(1000);
        }
    })
    }

//Callback
function callbackJSON(resp, state){
    data =[];
    if(state === "success"){
        let c=0;
        for (const i of resp) {
            data[c] = new listProductos(i.id, i.nombre, i.precio, i.categoria, i.Color, i.Talla, i.destacado)
            c++;
        }//Se guarda en data todo el jason
        mostrarProductos();   
}
}
    function cambiarCategoria() {
    rd = false;
     mostrarProductos();
}


//Check------------------------------------
  function navbar(){
    $("body div nav ul").remove();
    $("body div nav").append("<ul class='navbar-nav mr-auto barra'><li class='nav-item'><a class='nav-link ColorText' href=#'></button></a></li><li class='nav-item'><p>"+cntdcarrito+"</p><button type='button'  class='btn' onclick=verCarrito()  data-toggle='modal' data-target='#modalCarrito'><img src='img/carrito.png' alt='carrito' class='img-fluid rounded-lg'></button></li></ul>");
  }

function verIndex(){
    rd = true;
    navbar();
    $("#index_comprar div").remove();
    $("#index_comprar").append(index);
    $.ajax({url:"../data/productsJson.json", datatype:"json", success: callbackJSON})//Se toman los datos del Json para mostrar destacados
}
  $( () => {
    verIndex();
    })


//Carrito--------------------------------------------

function agregarCarrito(id){
    let nuevoElemento;
    let color = $(".color"+id).val();
    let talla = $(".talla"+id).val();
    let cntd = parseInt($("#cntd"+id).val());
    cntdcarrito = cntdcarrito + cntd;
    let precio;
    let nombre;
    data.forEach(item => {
        if(item.getId() == id) {
            precio = item.getPrecio();
            nombre = item.getNombre()
        }
    })
    nuevoElemento = {id,nombre,precio,color,talla,cntd};

    let flag=false;
    carrito.forEach(item => {
        if(item.id == id && item.talla == talla && item.color == color ) {
            item.cntd=item.cntd+cntd;
            flag = true;
        }
    })
    if(!flag){
        carrito.push(nuevoElemento);
    }
    navbar();   
}


//Ver Carrito
function renderCarrito(padre){
    let compra = 0;
    $(padre+" div").remove();
    $(padre).append("<div class='elementoCarrito row'><p class='col-2'>Cantidad</p><p class='col-6'>Descripcion</p><p class='col-2'>Precio Unitario</p><p class='col-2'>Precio Total</p></div>");//cabezal de carrito
    
    if(carrito.length == 0)
        {$(padre).append("<div class='elementoCarrito row justify-content-center'><p>No haz agregado productos a tu carrito</p></div>");//Si no hay productos en carrito
    }   
    else {for(const item of carrito){
        total = item.precio*item.cntd;
        if(padre === ".modal-body") $(padre).append("<div id='"+item.id+"+"+item.color+"+"+item.talla+"' class='elementoCarrito row'><div class='elementoCarrito col-2'><button type='button' class='btn btn-danger' onclick=eliminarProducto('"+item.id+"+"+item.color+"+"+item.talla+"')>X</button><p class='col-2'>"+item.cntd+"</p></div><p class='col-6'>"+item.nombre+" Color "+item.color+" Talla "+item.talla+"</p><p class='col-2'>"+item.precio+"</p><p class='col-2'>"+total+"</p></div>");//productos en carrito
        else $(padre).append("<div id='"+item.id+"+"+item.color+"+"+item.talla+"' class='elementoCarrito row'><div class='elementoCarrito col-2'><p class='col-2'>"+item.cntd+"</p></div><p class='col-6'>"+item.nombre+" Color "+item.color+" Talla "+item.talla+"</p><p class='col-2'>"+item.precio+"</p><p class='col-2'>"+total+"</p></div>");//productos en carrito
        compra = compra + total;
    }}

    $(padre).append("<div class='elementoCarrito row justify-content-end'><p class='col-2'>Total</p><p class='col-2'>"+compra+"</p></div>");//precio final


}

function verCarrito(){
    renderCarrito(".modal-body");
    }


//Borrar producto
function eliminarProducto(id){
    let result = id.split("+");
    for(const item of carrito){
        if(item.id==result[0]&&item.color==result[1]&&item.talla==result[2]){
            cntdcarrito = cntdcarrito - item.cntd;
            let i = carrito.indexOf(item);
            carrito.splice(i,1);
        }
        renderCarrito(".modal-body");
    navbar();
    }
}

//Terminar compra
function mostrarVenta(){
    renderCarrito("#factura");
}

function confirmar(){
    let nombre = $("#firstName").val();
    let apellido = $("#lastName").val();
    let mail = $("#inputEmail4").val();
    let direccion = $("#inputAddress").val();
    let ciudad = $("#ciudad").val();
    let postal = $("#postal").val();

    if(carrito.length == 0) alert("Aun no haz agregado productos a tu compra")
    else{
        compraConfirmada = carrito;
        carrito = [];
        cntdcarrito = 0;
        renderCarrito("#factura");
        navbar();
        alert(nombre+" "+apellido+" Gracias por tu compra, en breve nos pondremos en contacto con vos, enviaremos tu pedido a "+direccion+" "+ciudad);
    }
}

function concretar(){
    $("#index_comprar div").remove();
    $("#index_comprar").append(comprar);
    mostrarVenta();
}










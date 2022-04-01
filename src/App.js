import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';
const url = "https://181g0262.81g.itesrc.net/api/dispositivos/";

class App extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: 0,
      marca: '',
      modelo: '',
      memoriaRam: '',
      procesador: '',
      tarjetaGrafica: '',
      capacidadDisco: '',
      tipoDispositivo: 0,
      tipoDisco: 0,
      precio: 0,
      tipoModal: ''
    }
  }
 peticionGet=()=>{
   axios.get(url).then(r=>{
    this.setState({data: r.data});
  }).catch(e=>{
    console.log(e.message);
  });
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  seleccionarDispositivo=(d)=>{
    this.setState({
      tipoModal: 'actualizar',
      form:{
        id: d.id,
        marca: d.marca,
        modelo: d.modelo,
        memoriaRam: d.memoriaRam,
        procesador: d.procesador,
        tarjetaGrafica: d.tarjetaGrafica,
        capacidadDisco: d.capacidadDisco,
        precio: d.precio,
        tipoDispositivo: 1,
        tipoDisco: 1
      }
    })
  }

  handlerChange=async e=>{
    //e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  peticionPost=async ()=>{
    delete this.state.form.id;
    console.log(this.state.form);
    await axios.post(url,
      this.state.form).then(r=>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(e=>{
      console.log(e.message);
    });
  }

  peticionPut=()=>{
    axios.put(url, this.state.form).then(r=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete=()=>{

    axios({
      url: url,
      method: 'DELETE',
      data: {id: this.state.form.id,
        marca: this.state.form.marca,
        modelo: this.state.form.modelo,
        memoriaRam: 1,
        precio: 1,
        procesador: this.state.form.procesador,
        tarjetaGrafica: this.state.form.tarjetaGrafica,
        tipoDisco: 1,
        tipoDispositivo: 1},
      params: {
        id: this.state.form.id,
        marca: this.state.form.marca,
        modelo: this.state.form.modelo,
        memoriaRam: this.state.form.memoriaRam,
        precio: this.state.form.precio,
        procesador: this.state.form.procesador,
        tarjetaGrafica: this.state.form.tarjetaGrafica,
        tipoDisco: 1,
        tipoDispositivo: 1
      }
    })
    
    .then(r=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    }).catch(e=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  componentDidMount(){
    this.peticionGet();
  }
 
render(){
  const {form} = this.state;
  return (
    <div className="App">
      <br/><br/><br/>
      <h1>CRUD de Dispositivos API REST</h1>
      <button className='btn btn-success' onClick={()=>{this.setState({form: null, tipoModal:'insertar'});this.modalInsertar()}}>Agregar</button>
      <table className='table'>
        <thead>
          <tr>
            <th scope="col">Marca</th>
            <th scope="col">Modelo</th>
            <th scope="col">Memoria RAM</th>
            <th scope="col">Almacenamiento</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map(d=>{
            return(
              <tr>
                <td>{d.marca}</td>
                <td>{d.modelo}</td>
                <td>{d.memoriaRam}</td>
                <td>{d.capacidadDisco}</td>
                <td>{d.precio}</td>
                <td>
                  <button className='btn btn-primary' onClick={()=>{this.seleccionarDispositivo(d); this.modalInsertar()}}> <FontAwesomeIcon icon={faEdit}/></button>
                  {" "}
                  <button className='btn btn-danger' onClick={()=>{this.seleccionarDispositivo(d); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
          <span style={{float:'right'}} onClick={()=>this.modalInsertar()}>x</span>
        </ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label htmlFor='id'>ID</label>
            <input className='form-control' type='text' name='id' id='id' readOnly value={form? form.id : this.state.data.length+1} />
            <br />
            <label htmlFor='marca'>Marca</label>
            <input className='form-control' type='text' name='marca' id='marca' onChange={this.handlerChange} value={form? form.marca : ''} />
            <br />
            <label htmlFor='modelo'>Modelo</label>
            <input className='form-control' type='text' name='modelo' id='modelo' onChange={this.handlerChange} value={form? form.modelo : ''} />
            <br />
            <label htmlFor='memoriaRAM'>Memoria RAM</label>
            <input className='form-control' type='text' name='memoriaRam' id='memoriaRam' onChange={this.handlerChange} value={form? form.memoriaRam : ''} />
            <br />
            <label htmlFor='procesador'>Procesador</label>
            <input className='form-control' type='text' name='procesador' id='procesador' onChange={this.handlerChange} value={form? form.procesador : ''} />
            <br />
            <label htmlFor='tarjetaGrafica'>Tarjeta Gráfica</label>
            <input className='form-control' type='text' name='tarjetaGrafica' id='tarjetaGrafica' onChange={this.handlerChange} value={form? form.tarjetaGrafica : ''} />
            <br />
            <label htmlFor='capacidadDisco'>Almacenamiento</label>
            <input className='form-control' type='text' name='capacidadDisco' id='capacidadDisco' onChange={this.handlerChange} value={form? form.capacidadDisco : ''} />
            <br />
            <label htmlFor='precio'>Precio</label>
            <input className='form-control' type='text' name='precio' id='precio' onChange={this.handlerChange} value={form? form.precio : 0} />
            <label hidden htmlFor='tipoDisco'>Tipo Disco</label>
            
          </div>
        </ModalBody>

        <ModalFooter>
          {this.state.tipoModal==='insertar' ? 
            <button className='btn btn-success' onClick={()=>this.peticionPost()}>Insertar</button>
          : 
          <button className='btn btn-primary' onClick={()=>this.peticionPut()}>Actualizar</button>
          }

          <button className='btn btn-danger' onClick={()=>this.modalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEliminar}>
        <ModalBody>Estás seguro de eliminar el dispositivo {form&&form.marca&&form.modelo}</ModalBody>
        <ModalFooter>
        <button className='btn btn-danger' onClick={()=>this.peticionDelete()}>Si</button>
        <button className='btn btn-secundary' onClick={()=>this.setState({modalEliminar: false})}>No</button>
      </ModalFooter>
      </Modal>
    </div>
  );
}
}

export default App;

'use strict';

import React from 'react';
import { TextField, RaisedButton, FontIcon } from 'material-ui';

import IconTextField from '../components/Form/IconTextField';
import MultipleFiles from '../components/Form/MultipleFiles';
import AppStore from '../stores/AppStore';
import CreateProduct from '../requests/CreateProduct';

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: new FormData()
        }
    }
    handleChange(e) {
        const { form } = this.state;
        const { name, value } = e.target;

        if (!form.has(name)) {
            form.append(name, value);
        } else {
            form.set(name, value);
        }

        this.setState({form});
    }
    handleFileChange(data) {
        const { form } = this.state;
        const images = data.getAll('files');

        if (form.has('image')) {
            form.delete('image');
        }

        for (var i in images) {
            if (typeof images[i] == 'object') {
                form.append('image', images[i]);
            }
        }

        this.setState({form});
    }

    handleSubmit(e) {
        e.preventDefault();
        const { form } = this.state;
        CreateProduct(form, (response) => {
            if (response.status) {
                AppStore.showMessage('Produto salvo');
                AppStore.setPage('/produtos');
            } else {
                AppStore.showMessage(response.message || 'Erro ao salvar produto');
            }
        });
    }

    handleCancel() {
        AppStore.setPage('/produtos');
    }

    render() {
        const { form } = this.state;
        const name = form.get('name') || '';
        const description = form.get('description') || '';
        const price = form.get('price') || '';

        return (
            <div className="page-form">
                <h4 className='title'>
                    Cadastrar produto
                    <span onClick={this.handleCancel.bind(this)} className="icon">&times;</span>
                </h4>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <IconTextField
                        icon={<FontIcon
                                className="fa fa-cutlery" />}
                        field={<TextField
                            onChange={this.handleChange.bind(this)}
                            hintText="Nome"
                            name="name"
                            value={name}
                            fullWidth={true} />} />
                    <IconTextField
                        icon={<FontIcon
                                className="fa fa-comment-o" />}
                        field={<TextField
                            onChange={this.handleChange.bind(this)}
                            hintText="Descrição"
                            name="description"
                            value={description}
                            fullWidth={true} />} />
                    <IconTextField
                        icon={<FontIcon
                                className="fa fa-money" />}
                        field={<TextField
                            onChange={this.handleChange.bind(this)}
                            hintText="Preço"
                            name="price" />}
                            value={price} />
                    <MultipleFiles
                        handleChange={this.handleFileChange.bind(this)}
                        label='Adicionar imagens' />
                    <RaisedButton primary={true} label="Enviar" onClick={this.handleSubmit.bind(this)} />
                </form>
            </div>
        );
    }
}

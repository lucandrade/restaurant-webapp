'use strict';

import React from 'react';
import { RaisedButton, Chip } from 'material-ui';

import String from '../../utils/String';

export default class MultipleFiles extends React.Component {
    constructor(props) {
        super(props);
        this.addFileToData = this.addFileToData.bind(this);
        this.state = {
            form: new FormData()
        }
    }

    handleChange(e) {
        const qt = e.target.files.length;
        for (var i in e.target.files) {
            if (typeof e.target.files[i] == 'object') {
                this.addFileToData(e.target.files[i], i == qt-1);
            }
        }
    }

    makeChips(data) {
        const me = this;
        const chips = [];
        const style = {
            margin: 4
        };

        data.map((file, i) => {
            chips.push(<Chip
                onRequestDelete={me.handleRemove.bind(me, i)}
                key={i}
                style={style}>
                {file.name} ({String.fileSize(file.size)})
            </Chip>);
        });

        return chips;
    }

    addFileToData(file, last) {
        const { form } = this.state;
        const files = form.getAll('files');
        let exist = true;

        for (var i in files) {
            if (typeof files[i] == 'object') {
                exist = true;

                for (var p in files[i]) {
                    if (typeof files[i][p] == 'function' || typeof files[i][p] == 'object') {
                        continue;
                    }

                    if (files[i][p] != file[p]) {
                        exist = false;
                    }
                }

                if (exist) {
                    break;
                }
            }
        }

        if (!exist || files.length == 0) {
            form.append('files', file);
        }

        this.setState({form});

        if (last) {
            this.props.handleChange(form);
        }
    }

    handleRemove(r) {
        const { form } = this.state;
        const files = form.getAll('files');
        const newForm = new FormData();

        for (var i in files) {
            if (r == i) {
                continue;
            }

            if (typeof files[i] == 'object') {
                newForm.append('files', files[i]);
            }
        }

        document.getElementById('fileButton').value = '';
        this.setState({form: newForm});
        this.props.handleChange(newForm);
    }

    render() {
        const { label } = this.props;
        const { form } = this.state;
        const files = form.getAll('files');
        const data = [];

        for (var i in files) {
            if (typeof files[i] == 'object') {
                if (files[i].name) {
                    data.push({
                        name: files[i].name,
                        size: files[i].size,
                    });
                }
            }
        }
        const styles = {
            input: {
                cursor: 'pointer',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                width: '100%',
                opacity: '0'
            },
            chipWrapper: {
                marginTop: '20px',
                display: 'flex',
                flexWrap: 'wrap',
            }
        };

        const chips = this.makeChips(data);
        return (
            <div>
                <RaisedButton primary={true} label={label || 'Adicionar arquivos'}>
                    <input
                        onChange={this.handleChange.bind(this)}
                        id="fileButton"
                        multiple="true"
                        style={styles.input}
                        type="file" />
                </RaisedButton>
                <div style={styles.chipWrapper}>
                    {chips}
                </div>
            </div>
        );
    }
}

import * as classNames from 'classnames';
import * as React from 'react';

import * as Rivet from '../util/Rivet';
import Icon from '../util/RivetIcons';

interface FileProps {
    /** The name(s) of the selected files */
    fileName?: string;
    /** File state, if maintaining state outside of the component */
    files?: string;
    /** The text for the file button */
    label?: string;
}

const initialState = { files: '' }
type FileState = Readonly<typeof initialState>

const FileInput: React.SFC<FileProps & React.HTMLAttributes<HTMLInputElement>> = 
({ className, fileName, id = Rivet.shortuid(), label = 'Upload a file', ...attrs }) => (
    <div className={classNames('rvt-file', className)}>
        <input {...attrs} type="file" id={id} aria-describedby={id + "-file-description"} />
        <label htmlFor={id} className="rvt-button">
            <span>{label}</span>
            <Icon name="file" />
        </label>
        <div className="rvt-file__preview" id={id + "-file-description"}>
            { fileName ? <span>{fileName}</span> : 'No file selected' }
        </div>
    </div>
);
FileInput.displayName = 'FileInput';

class File extends React.PureComponent<FileProps & React.HTMLAttributes<HTMLInputElement>, FileState> {

    public readonly state: FileState = initialState;

    public render() {
        const files = ('files' in this.props) ? this.props.files : this.state.files;
        return (
            <FileInput {...this.props} fileName={files} onChange={this.handleFileChange} />
        )
    }

    private handleFileChange = (changeEvent) => {
        // changeEvent.target.files is a FileList which is not iterable, though a for..of loop works
        const files: string[] = [];
        for(const file of changeEvent.target.files) {
            files.push(file.name);
        }
        this.setState({ files: files.join(', ') });
        if (this.props.onChange){
            this.props.onChange(changeEvent);
        }
    }

}

export default Rivet.rivetize(File);
export { File as UnwrappedFile, FileInput, FileState };

type DataType = string | string[] | Blob | Blob[] | Iterable<string | Blob>;

function isIterable<T>(obj: T | Iterable<T>): obj is Iterable<T> {
    return obj !== null && typeof obj === 'object' && typeof (obj as Iterable<T>)[Symbol.iterator] === 'function';
}

function createFormData(fieldName: string, data: DataType) {
    const formData = new FormData();

    if (isIterable(data)) {
        for (const v of data) {
            formData.append(fieldName, v);
        }
    } else {
        formData.append(fieldName, data);
    }

    return formData;
}

export default createFormData;

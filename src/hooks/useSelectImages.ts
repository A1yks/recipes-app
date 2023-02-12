import { useSnackbar } from 'notistack';
import formatBytes from 'src/utils/formatBytes';

type SelectImagesConfig = {
    maxFiles?: number;
    maxFileSize?: number;
};

const defaultConfig: SelectImagesConfig = {
    maxFiles: undefined,
    maxFileSize: undefined,
};

function useSelectImages(
    callback: (files: FileList) => void,
    { maxFiles, maxFileSize }: SelectImagesConfig = defaultConfig
) {
    const { enqueueSnackbar } = useSnackbar();

    function showError(message: string) {
        enqueueSnackbar(message, { variant: 'error' });
    }

    function selectImageHandler() {
        const inp = document.createElement('input');

        inp.type = 'file';
        inp.accept = 'image/*';
        inp.multiple = maxFiles !== undefined;

        inp.addEventListener('change', async () => {
            if (inp.files === null || inp.files.length === 0) {
                return showError('You have not choosen any file');
            }

            if (maxFiles !== undefined && inp.files.length > maxFiles) {
                return showError(`You can only upload a maximum of ${maxFiles} files`);
            }

            if (maxFileSize !== undefined) {
                for (const file of inp.files) {
                    if (file.size > maxFileSize) {
                        return showError(`File size should not exceed ${formatBytes(maxFileSize)}`);
                    }
                }
            }

            callback(inp.files);
        });

        inp.click();
    }

    return selectImageHandler;
}

export default useSelectImages;

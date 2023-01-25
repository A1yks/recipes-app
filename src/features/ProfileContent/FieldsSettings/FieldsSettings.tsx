import { Grid, SxProps } from '@mui/material';
import ControlledInput from 'src/components/ControlledInput';
import LoadingButton from 'src/components/LoadingButton';
import useFieldsSettings from './hooks/useFieldsSettings';

const evenSx = {
    pl: { md: 3 },
} satisfies SxProps;

const secondRowSx = {
    mt: { md: 3 },
} satisfies SxProps;

function FieldsSettings(props: Props.WithSx) {
    const { control, formState, isSaving, changeHandler, submitHandler } = useFieldsSettings();

    return (
        <Grid container component="form" onSubmit={submitHandler} justifyContent="space-between" sx={props.sx} mt={4}>
            <Grid item md={6} sm>
                <ControlledInput
                    name="name"
                    value={formState.name}
                    onChange={changeHandler('name')}
                    control={control}
                    fullWidth
                    label="Name"
                    variant="standard"
                />
            </Grid>
            <Grid item md={6} sm sx={evenSx}>
                <ControlledInput
                    name="surname"
                    value={formState.surname}
                    onChange={changeHandler('surname')}
                    control={control}
                    fullWidth
                    label="Surname"
                    variant="standard"
                />
            </Grid>
            <Grid item md={6} sm sx={secondRowSx}>
                <ControlledInput
                    name="login"
                    value={formState.login}
                    onChange={changeHandler('login')}
                    control={control}
                    fullWidth
                    label="Login"
                    variant="standard"
                />
            </Grid>
            <Grid item md={6} sm sx={{ ...evenSx, ...secondRowSx }}>
                <ControlledInput
                    name="password"
                    value={formState.password}
                    onChange={changeHandler('password')}
                    control={control}
                    fullWidth
                    label="Password"
                    type="password"
                    variant="standard"
                    autoComplete="new-password"
                />
            </Grid>
            <Grid item mt={3} ml="auto">
                <LoadingButton loading={isSaving} variant="contained" fullWidth type="submit">
                    Save
                </LoadingButton>
            </Grid>
        </Grid>
    );
}

export default FieldsSettings;

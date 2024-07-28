import { Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (

        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: '#8c9eff' }}
        >

            <Grid item
                className='box-shadow'
                xs={3}
                sx={{
                    backgroundColor: '#e8eaf6',
                    padding: 3,
                    borderRadius: 2,
                    width: { sm: 450 }
                }}
            >

                <Typography variant='h4' sx={{ mb: 1, mt: 1, textAlign: 'center', color: 'purple' }}>{title}</Typography>

                {children}

            </Grid>
        </Grid>
    )
}

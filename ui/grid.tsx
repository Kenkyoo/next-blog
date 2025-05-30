import { Grid } from "@chakra-ui/react";

const GridCols = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      display="grid"
      gap="8"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Grid>
  );
};

export default GridCols;

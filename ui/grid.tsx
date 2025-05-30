import { Grid } from "@chakra-ui/react";

const GridCols = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      display="grid"
      gap="4"
      gridTemplateColumns="repeat(3, minmax(0, 1fr))"
    >
      {children}
    </Grid>
  );
};

export default GridCols;

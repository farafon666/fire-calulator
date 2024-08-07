import { Container, Grid, Typography } from "@mui/material";
import { CATEGORIES_WITH_TEXT } from "./types/calculator";
import CategoryColumn from "./components/CategoryColumn/CategoryColumn";
import { useAppSelector } from "./redux/hooks";
import Entry from "./components/Entry";
import AddEntryModal from "./components/AddEntryModal/AddEntryModal";
import PlotsWrapper from "./components/Plots/PlotsWrapper";

function App() {
  const entry = useAppSelector(store => store.calculator.remaining);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PlotsWrapper />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {CATEGORIES_WITH_TEXT.map((category) => (
          <Grid key={category.value} item xs={4}>
            <CategoryColumn category={category.value} text={category.text} />
          </Grid>
        ))}
        <Grid key='remaining' item xs={4}>
          <Grid container>
            <Grid key={'category remaining'} item xs={12}>
              <Typography variant='h5' >Остаток</Typography>
            </Grid>
              <Grid key={entry.id} item xs={12}>
                <Entry entry={entry} />
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <AddEntryModal />
    </Container>
  );
}

export default App;
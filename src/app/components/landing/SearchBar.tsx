import { Container, TextField, Button } from '@mui/material'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar() {
  return (
    <section className="-mt-14 relative z-10">
      <Container maxWidth="lg">
        <div className="bg-white rounded-xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <TextField label="Destination" fullWidth />
          <TextField type="date" fullWidth />
          <TextField label="Guests" type="number" fullWidth />
          <Button variant="contained" startIcon={<FaSearch />}>
            Search
          </Button>
        </div>
      </Container>
    </section>
  )
}

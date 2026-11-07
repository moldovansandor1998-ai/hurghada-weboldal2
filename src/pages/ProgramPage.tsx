import { useParams } from 'react-router-dom';
import { programs } from '@/data/programs';
import ProgramDetails from '@/sections/ProgramDetails';
import Footer from '@/sections/Footer';
import NotFound from './NotFound';

export default function ProgramPage() {
  const { programId } = useParams();
  const program = programs.find((item) => item.id === programId);
  if (!program) return <NotFound />;
  return <><ProgramDetails program={program} /><Footer /></>;
}

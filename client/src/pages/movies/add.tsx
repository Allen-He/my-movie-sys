import MoviesForm from '@/components/MoviesForm';

export default function add() {
  return <MoviesForm initialValues={{
    isComing: false,
    isHot: false,
    isClassic: false
  }} />
}

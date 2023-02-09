import './styles.css';

export const TextInput = ({ anctionFn, inputValue }) => {
  return (
    <input
      className='text-input'
      onChange={anctionFn}
      value={inputValue}
      type="search"
      placeholder='Type your search'
    />
  )
}
import React from 'react';
import Select, { MultiValue, StylesConfig} from 'react-select';
import { wordlists } from 'bip39';
interface OptionType {
  value: string;
  label: string;
}

interface SeedPhraseInputProps {
  words: string[];
  onChange: (newWords: string[]) => void;
}

const wordlist = wordlists.english;
const options: OptionType[] = wordlist.map(word => ({ value: word, label: word }));

// Стили для react-select
const customStyles: StylesConfig<OptionType, true> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#000',
    minHeight: '30px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000',
  }),
  input: (provided) => ({
    ...provided,
    color: '#000',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#ccc' : 'transparent',
    color: '#000',
  }),
};

const SeedPhraseInput: React.FC<SeedPhraseInputProps> = ({ words, onChange }) => {
  const handleWordChange = (newValue: MultiValue<OptionType>) => {
    const newWords = newValue ? newValue.map(option => option.value) : [];
    onChange(newWords);
  };

  return (
    <Select
      options={options}
      isMulti
      value={words.map(word => ({ value: word, label: word }))}
      onChange={handleWordChange}
      styles={customStyles}
      placeholder="Enter words..."
    />
  );
}

export default SeedPhraseInput;

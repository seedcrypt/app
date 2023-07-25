import { wordlists } from 'bip39';
const wordlist = wordlists.english;

function wordToIndex(word: string) {
  return wordlist.indexOf(word);
}

function indexToWord(index: number) {
  return wordlist[index];
}
export function passwordToBip(password: string) {
  password = password.toLowerCase().replace(/[^a-z]/g, '');
  return password.split('').map(ch => wordlist[ch.charCodeAt(0) - 'a'.charCodeAt(0)]).join(' ');
}
export function encrypt(phrase: string, key: string) {
  const phraseWords = phrase.split(' ');
  const keyWords = key.split(' ');

  const encryptedWords = phraseWords.map((word, i) => {
    const phraseIndex = wordToIndex(word);
    const keyIndex = wordToIndex(keyWords[i % keyWords.length]);
    const encryptedIndex = (phraseIndex + keyIndex) % wordlist.length;
    return indexToWord(encryptedIndex);
  });

  return encryptedWords.join(' ');
}

export function decrypt(encryptedPhrase: string, key: string) {
  const encryptedWords = encryptedPhrase.split(' ');
  const keyWords = key.split(' ');

  const decryptedWords = encryptedWords.map((word, i) => {
    const encryptedIndex = wordToIndex(word);
    const keyIndex = wordToIndex(keyWords[i % keyWords.length]);
    const phraseIndex = (encryptedIndex - keyIndex + wordlist.length) % wordlist.length;
    return indexToWord(phraseIndex);
  });

  return decryptedWords.join(' ');
}

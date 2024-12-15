export const getRandomWordsString = async (): Promise<string> => {
  let response = "extremely-loyal-customer";

  try {
    const randomWordsResponse = await fetch("https://random-word-api.herokuapp.com/word?number=3&length=4");
    const words: string[] = await randomWordsResponse.json();
    response = words.join("-");
  } catch (error) {
    console.error("Failed to generate random words string", error); // swallow
  } finally {
    return response;
  }
};

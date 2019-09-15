import axios from "axios";

const check = word => {
  return new Promise((correct, uncorrect) => {
    axios.get(`https://r2u.org.ua/s`, {
      params: {
        w: word,
        scope: 'ukrq',
        dicts: 'all',
        highlight: 'on'
      }
    }).then(
      ({ data }) => {
        const search = data.search('<em class="info">Знайдено');
        if (search > 0) correct(word);
        else uncorrect(word);
      },
      () => {
        uncorrect();
      }
    );
  });
};

const check_block = word => {
  return new Promise((correct, uncorrect) => {
    axios.get(`http://sum.in.ua/?swrd=${word}`).then(
      ({ data }) => {
        const search = data.search('itemprop="headline"');
        if (search > 0) correct(word);
        else uncorrect(word);
      },
      () => {
        uncorrect();
      }
    );
  });
};

export default check;

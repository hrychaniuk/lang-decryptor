import lodash from "lodash";
import words from "@/../words.alien.json";
import aliens from "@/../lang.alien.json";
import native from "@/../lang.native.json";

const _exceptions = [
	"аа",
	"аь",
	"юю",
	"юь",
	"юи",
	"юя",
	"юъ",
	"бп",
	"бй",
	"ьь",
	"ья",
	"ьщ",
	"тб",
	"иь",
	"ии",
	"сз",
	"сй",
	"чщ",
	"чй",
	"чш",
	"яя",
	"яь",
	"яі",
	"єє",
	"єь",
	"єе",
	"жз",
	"жь",
	"жй",
	"жш",
	"жщ",
	"жх",
	"жю",
	"жц",
	"жф",
	"жя"
	//
];

_exceptions.push(...[
	"пщ",
	"зф",
	"мй",
	"мш",
	"фт",
	"ьї",
	"фє",
	"аоа",
	"кф",
	"шж",
	"лх",
	"фн",
	"їрг",
	"жї",
	"кчр",
	"льл",
	"жє",
	"гц",
	"йх",
	"мрм",
	"сьі",
	"шюа",
	"зюв",
	"рях",
	"оїщ",
	"шящ",
	"дф",
	"фя",
	"нчг",
	"іїт",
	"єїт",
	"саю",
	"цої",
	"тї",
	"дї",
	"чль",
	"гбя",
	"шщ",
	"впг",
	"пнш",
	"двх",
	"чгп",
	"йп",
	"єи",
	"хю",
	"цх",
	"впр",
	"цф",
	"юпв",
	"яї",
	"нф",
	"рю",
	"ои",
	"фщ",
	"блк",
	"хї",
	"цвп",
	"пдц",
	"юі",
	"їи",
	"всд",
	"кж",
	"сї",
	"йт",
	"їг",
	"птд",
	"йщ",
	"пє",
	"аїа",
	"гй",
	"уощ",
	"дщ",
	"шб",
	"йф",
	"лвх",
	"снг",
	"цнщ",
	"щя",
	"юй",
	"фб",
	"шмц",
	"нжг",
	"фї",
	"ює",
	"зж",
	"сщ",
	"вшв",
	"мь",
	"цн",
	"щь",
	"цє",
	"йс",
	"бтм",
	"йю",
	"грк",
	"еь",
	"зй",
	"здб",
	"гщ",
	"ие",
	"щс",
	"кя",
	"лкг",
	"лвп",
	"лмд",
	"цд",
	"тц",
	"фх",
	"жнх",
	"яа",
	"бвд",
	"хй",
	"сдп",
	"нй",
	"лфл",
	"чгш",
	"рпл",
	"цч",
	"щц",
	"юуї",
	"рмр",
	"шї",
	"хк",
	"шє",
	"іиі",
	"гя",
	"еє",
	"щю",
	"мж",
	"лй",
	"мц",
	"шрш",
	"кнж",
	"іїі",
	"кш",
	"шя",
	"тє",
	"юу",
	"гбс",
	"яе",
	"юп",
	"їє",
	"сях",
	"зї",
	"їхс",
	"дй",
	"щл",
	"щж",
	"плг",
	"хч",
	"іь",
	"ьвї",
	"дц",
	"чвп",
	"іое",
	"тз",
	"бф",
	"зч"
]);

// const exceptions = [...new Set(_exceptions)];
const exceptions = [];

const isExceptions = (relations) => {
	let generatedWords = [];
	generatedWords = words.map(i => {
		return i.key.split(' ').map(j => relations[j]).join('');
	});

	const isFinded = generatedWords.some(i => {
		return exceptions.some(j => i.includes(j));
	});

	return isFinded;
};

export default function() {
	let randomLetters, relation;
	console.time("generator:");

	let i = 0;

	(function r() {
		randomLetters = [];
		while(true)
		{
		    var randomQuiz = Math.floor(Math.random() * native.length);
		    if(randomLetters.length === aliens.length) break; 

			if(!randomLetters.includes(native[randomQuiz].name)) {
			   randomLetters.push(native[randomQuiz].name);
			}
		}

		relation = aliens.reduce((acc, alien, index) => {
			acc[alien.id] = randomLetters[index];
			return acc;
		}, {});

		i++;
		const isExt = isExceptions(relation);
		if(isExt) r();
	})();

	console.log(i);

	console.timeEnd("generator:");
	return relation;
}
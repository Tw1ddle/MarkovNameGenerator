(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
};
var Main = function() {
	this.similar = "alina";
	this.excludes = "z";
	this.includes = "l";
	this.endsWith = "";
	this.startsWith = "a";
	this.maxProcessingTime = 500;
	this.prior = 0.01;
	this.order = 3;
	this.maxLength = 10;
	this.minLength = 7;
	this.numToGenerate = 100;
	this.trainingDataKey = "tolkienesque_forenames";
	this.trainingData = new haxe_ds_StringMap();
	this.trainingData.set("us_forenames","james\r\njohn\r\nrobert\r\nmichael\r\nwilliam\r\ndavid\r\nrichard\r\ncharles\r\njoseph\r\nthomas\r\nchristopher\r\ndaniel\r\npaul\r\nmark\r\ndonald\r\ngeorge\r\nkenneth\r\nsteven\r\nedward\r\nbrian\r\nronald\r\nanthony\r\nkevin\r\njason\r\nmatthew\r\ngary\r\ntimothy\r\njose\r\nlarry\r\njeffrey\r\nfrank\r\nscott\r\neric\r\nstephen\r\nandrew\r\nraymond\r\ngregory\r\njoshua\r\njerry\r\ndennis\r\nwalter\r\npatrick\r\npeter\r\nharold\r\ndouglas\r\nhenry\r\ncarl\r\narthur\r\nryan\r\nroger\r\njoe\r\njuan\r\njack\r\nalbert\r\njonathan\r\njustin\r\nterry\r\ngerald\r\nkeith\r\nsamuel\r\nwillie\r\nralph\r\nlawrence\r\nnicholas\r\nroy\r\nbenjamin\r\nbruce\r\nbrandon\r\nadam\r\nharry\r\nfred\r\nwayne\r\nbilly\r\nsteve\r\nlouis\r\njeremy\r\naaron\r\nrandy\r\nhoward\r\neugene\r\ncarlos\r\nrussell\r\nbobby\r\nvictor\r\nmartin\r\nernest\r\nphillip\r\ntodd\r\njesse\r\ncraig\r\nalan\r\nshawn\r\nclarence\r\nsean\r\nphilip\r\nchris\r\njohnny\r\nearl\r\njimmy\r\nantonio\r\ndanny\r\nbryan\r\ntony\r\nluis\r\nmike\r\nstanley\r\nleonard\r\nnathan\r\ndale\r\nmanuel\r\nrodney\r\ncurtis\r\nnorman\r\nallen\r\nmarvin\r\nvincent\r\nglenn\r\njeffery\r\ntravis\r\njeff\r\nchad\r\njacob\r\nlee\r\nmelvin\r\nalfred\r\nkyle\r\nfrancis\r\nbradley\r\njesus\r\nherbert\r\nfrederick\r\nray\r\njoel\r\nedwin\r\ndon\r\neddie\r\nricky\r\ntroy\r\nrandall\r\nbarry\r\nalexander\r\nbernard\r\nmario\r\nleroy\r\nfrancisco\r\nmarcus\r\nmicheal\r\ntheodore\r\nclifford\r\nmiguel\r\noscar\r\njay\r\njim\r\ntom\r\ncalvin\r\nalex\r\njon\r\nronnie\r\nbill\r\nlloyd\r\ntommy\r\nleon\r\nderek\r\nwarren\r\ndarrell\r\njerome\r\nfloyd\r\nleo\r\nalvin\r\ntim\r\nwesley\r\ngordon\r\ndean\r\ngreg\r\njorge\r\ndustin\r\npedro\r\nderrick\r\ndan\r\nlewis\r\nzachary\r\ncorey\r\nherman\r\nmaurice\r\nvernon\r\nroberto\r\nclyde\r\nglen\r\nhector\r\nshane\r\nricardo\r\nsam\r\nrick\r\nlester\r\nbrent\r\nramon\r\ncharlie\r\ntyler\r\ngilbert\r\ngene\r\nmarc\r\nreginald\r\nruben\r\nbrett\r\nangel\r\nnathaniel\r\nrafael\r\nleslie\r\nedgar\r\nmilton\r\nraul\r\nben\r\nchester\r\ncecil\r\nduane\r\nfranklin\r\nandre\r\nelmer\r\nbrad\r\ngabriel\r\nron\r\nmitchell\r\nroland\r\narnold\r\nharvey\r\njared\r\nadrian\r\nkarl\r\ncory\r\nclaude\r\nerik\r\ndarryl\r\njamie\r\nneil\r\njessie\r\nchristian\r\njavier\r\nfernando\r\nclinton\r\nted\r\nmathew\r\ntyrone\r\ndarren\r\nlonnie\r\nlance\r\ncody\r\njulio\r\nkelly\r\nkurt\r\nallan\r\nnelson\r\nguy\r\nclayton\r\nhugh\r\nmax\r\ndwayne\r\ndwight\r\narmando\r\nfelix\r\njimmie\r\neverett\r\njordan\r\nian\r\nwallace\r\nken\r\nbob\r\njaime\r\ncasey\r\nalfredo\r\nalberto\r\ndave\r\nivan\r\njohnnie\r\nsidney\r\nbyron\r\njulian\r\nisaac\r\nmorris\r\nclifton\r\nwillard\r\ndaryl\r\nross\r\nvirgil\r\nandy\r\nmarshall\r\nsalvador\r\nperry\r\nkirk\r\nsergio\r\nmarion\r\ntracy\r\nseth\r\nkent\r\nterrance\r\nrene\r\neduardo\r\nterrence\r\nenrique\r\nfreddie\r\nwade\r\nmary\r\npatricia\r\nlinda\r\nbarbara\r\nelizabeth\r\njennifer\r\nmaria\r\nsusan\r\nmargaret\r\ndorothy\r\nlisa\r\nnancy\r\nkaren\r\nbetty\r\nhelen\r\nsandra\r\ndonna\r\ncarol\r\nruth\r\nsharon\r\nmichelle\r\nlaura\r\nsarah\r\nkimberly\r\ndeborah\r\njessica\r\nshirley\r\ncynthia\r\nangela\r\nmelissa\r\nbrenda\r\namy\r\nanna\r\nrebecca\r\nvirginia\r\nkathleen\r\npamela\r\nmartha\r\ndebra\r\namanda\r\nstephanie\r\ncarolyn\r\nchristine\r\nmarie\r\njanet\r\ncatherine\r\nfrances\r\nann\r\njoyce\r\ndiane\r\nalice\r\njulie\r\nheather\r\nteresa\r\ndoris\r\ngloria\r\nevelyn\r\njean\r\ncheryl\r\nmildred\r\nkatherine\r\njoan\r\nashley\r\njudith\r\nrose\r\njanice\r\nkelly\r\nnicole\r\njudy\r\nchristina\r\nkathy\r\ntheresa\r\nbeverly\r\ndenise\r\ntammy\r\nirene\r\njane\r\nlori\r\nrachel\r\nmarilyn\r\nandrea\r\nkathryn\r\nlouise\r\nsara\r\nanne\r\njacqueline\r\nwanda\r\nbonnie\r\njulia\r\nruby\r\nlois\r\ntina\r\nphyllis\r\nnorma\r\npaula\r\ndiana\r\nannie\r\nlillian\r\nemily\r\nrobin\r\npeggy\r\ncrystal\r\ngladys\r\nrita\r\ndawn\r\nconnie\r\nflorence\r\ntracy\r\nedna\r\ntiffany\r\ncarmen\r\nrosa\r\ncindy\r\ngrace\r\nwendy\r\nvictoria\r\nedith\r\nkim\r\nsherry\r\nsylvia\r\njosephine\r\nthelma\r\nshannon\r\nsheila\r\nethel\r\nellen\r\nelaine\r\nmarjorie\r\ncarrie\r\ncharlotte\r\nmonica\r\nesther\r\npauline\r\nemma\r\njuanita\r\nanita\r\nrhonda\r\nhazel\r\namber\r\neva\r\ndebbie\r\napril\r\nleslie\r\nclara\r\nlucille\r\njamie\r\njoanne\r\neleanor\r\nvalerie\r\ndanielle\r\nmegan\r\nalicia\r\nsuzanne\r\nmichele\r\ngail\r\nbertha\r\ndarlene\r\nveronica\r\njill\r\nerin\r\ngeraldine\r\nlauren\r\ncathy\r\njoann\r\nlorraine\r\nlynn\r\nsally\r\nregina\r\nerica\r\nbeatrice\r\ndolores\r\nbernice\r\naudrey\r\nyvonne\r\nannette\r\njune\r\nsamantha\r\nmarion\r\ndana\r\nstacy\r\nana\r\nrenee\r\nida\r\nvivian\r\nroberta\r\nholly\r\nbrittany\r\nmelanie\r\nloretta\r\nyolanda\r\njeanette\r\nlaurie\r\nkatie\r\nkristen\r\nvanessa\r\nalma\r\nsue\r\nelsie\r\nbeth\r\njeanne\r\nvicki\r\ncarla\r\ntara\r\nrosemary\r\neileen\r\nterri\r\ngertrude\r\nlucy\r\ntonya\r\nella\r\nstacey\r\nwilma\r\ngina\r\nkristin\r\njessie\r\nnatalie\r\nagnes\r\nvera\r\nwillie\r\ncharlene\r\nbessie\r\ndelores\r\nmelinda\r\npearl\r\narlene\r\nmaureen\r\ncolleen\r\nallison\r\ntamara\r\njoy\r\ngeorgia\r\nconstance\r\nlillie\r\nclaudia\r\njackie\r\nmarcia\r\ntanya\r\nnellie\r\nminnie\r\nmarlene\r\nheidi\r\nglenda\r\nlydia\r\nviola\r\ncourtney\r\nmarian\r\nstella\r\ncaroline\r\ndora\r\njo\r\nvickie\r\nmattie\r\nterry\r\nmaxine\r\nirma\r\nmabel\r\nmarsha\r\nmyrtle\r\nlena\r\nchristy\r\ndeanna\r\npatsy\r\nhilda\r\ngwendolyn\r\njennie\r\nnora\r\nmargie\r\nnina\r\ncassandra\r\nleah\r\npenny\r\nkay\r\npriscilla\r\nnaomi\r\ncarole\r\nbrandy\r\nolga\r\nbillie\r\ndianne\r\ntracey\r\nleona\r\njenny\r\nfelicia\r\nsonia\r\nmiriam\r\nvelma\r\nbecky\r\nbobbie\r\nviolet\r\nkristina\r\ntoni\r\nmisty\r\nmae\r\nshelly\r\ndaisy\r\nramona\r\nsherri\r\nerika\r\nkatrina\r\nclaire\r\nlindsey\r\nlindsay\r\ngeneva\r\nguadalupe\r\nbelinda\r\nmargarita\r\nsheryl\r\ncora\r\nfaye\r\nada\r\nnatasha\r\nsabrina\r\nisabel\r\nmarguerite\r\nhattie\r\nharriet\r\nmolly\r\ncecilia\r\nkristi\r\nbrandi\r\nblanche\r\nsandy\r\nrosie\r\njoanna\r\niris\r\neunice\r\nangie\r\ninez\r\nlynda\r\nmadeline\r\namelia\r\nalberta\r\ngenevieve\r\nmonique\r\njodi\r\njanie\r\nmaggie\r\nkayla\r\nsonya\r\njan\r\nlee\r\nkristine\r\ncandace\r\nfannie\r\nmaryann\r\nopal\r\nalison\r\nyvette\r\nmelody\r\nluz\r\nsusie\r\nolivia\r\nflora\r\nshelley\r\nkristy\r\nmamie\r\nlula\r\nlola\r\nverna\r\nbeulah\r\nantoinette\r\ncandice\r\njuana\r\njeannette\r\npam\r\nkelli\r\nhannah\r\nwhitney\r\nbridget\r\nkarla\r\ncelia\r\nlatoya\r\npatty\r\nshelia\r\ngayle\r\ndella\r\nvicky\r\nlynne\r\nsheri\r\nmarianne\r\nkara\r\njacquelyn\r\nerma\r\nblanca\r\nmyra\r\nleticia\r\npat\r\nkrista\r\nroxanne\r\nangelica\r\njohnnie\r\nrobyn\r\nfrancis\r\nadrienne\r\nrosalie\r\nalexandra\r\nbrooke\r\nbethany\r\nsadie\r\nbernadette\r\ntraci\r\njody\r\nkendra\r\njasmine\r\nnichole\r\nrachael\r\nchelsea\r\nmable\r\nernestine\r\nmuriel\r\nmarcella\r\nelena\r\nkrystal\r\nangelina\r\nnadine\r\nkari\r\nestelle\r\ndianna\r\npaulette\r\nlora\r\nmona\r\ndoreen\r\nrosemarie\r\nangel\r\ndesiree\r\nantonia\r\nhope\r\nginger\r\njanis\r\nbetsy\r\nchristie\r\nfreda\r\nmercedes\r\nmeredith\r\nlynette\r\nteri\r\ncristina\r\neula\r\nleigh\r\nmeghan\r\nsophia\r\neloise\r\nrochelle\r\ngretchen\r\ncecelia\r\nraquel\r\nhenrietta\r\nalyssa\r\njana\r\nkelley\r\ngwen\r\nkerry\r\njenna\r\ntricia\r\nlaverne\r\nolive\r\nalexis\r\ntasha\r\nsilvia\r\nelvira\r\ncasey\r\ndelia\r\nsophie\r\nkate\r\npatti\r\nlorena\r\nkellie\r\nsonja\r\nlila\r\nlana\r\ndarla\r\nmay\r\nmindy\r\nessie\r\nmandy\r\nlorene\r\nelsa\r\njosefina\r\njeannie\r\nmiranda\r\ndixie\r\nlucia\r\nmarta\r\nfaith\r\nlela\r\njohanna\r\nshari\r\ncamille\r\ntami\r\nshawna\r\nelisa\r\nebony\r\nmelba\r\nora\r\nnettie\r\ntabitha\r\nollie\r\njaime\r\nwinifred\r\nkristie".split("\n"));
	this.trainingData.set("tolkienesque_forenames","alfwine\r\nabattârik\r\nadanedhel\r\nadanel\r\nadrahil\r\nadûnakhôr\r\naegnor\r\naerin\r\nagarwaen\r\naikanáro\r\naiwendil\r\nalatar\r\nalatáriel\r\nalcarin\r\naldamir\r\naldarion\r\naldaron\r\naldor\r\namandil\r\namdír\r\namlaith\r\namras\r\namrod\r\namroth\r\namrothos\r\nanairë\r\nanardil\r\nanárion\r\nanborn\r\nancalagon\r\nancalimë\r\nancalimon\r\nandrast\r\nanducal\r\nanfauglir\r\nandreth\r\nandróg\r\nangbor\r\nangrod\r\nannatar\r\narador\r\naraglas\r\naragorn\r\naragost\r\narahad\r\narahael\r\naranarth\r\narantar\r\naranuir\r\naraphant\r\naraphor\r\narassuil\r\naratan\r\naratar\r\narathorn\r\naraval\r\naravir\r\naravorn\r\naredhel\r\nargeleb\r\nargon\r\nargonui\r\narien\r\naros\r\narthedain\r\narvedui\r\narvegil\r\narveleg\r\narwen\r\nasfaloth\r\natanamir\r\natanatar\r\naulë\r\nausir\r\navranc\r\nazaghâl\r\nazog\r\nbaldor\r\nbalin\r\nbaragund\r\nbarahir\r\nbarahir\r\nbaran\r\nbard\r\nbauglir\r\nbelecthor\r\nbeleg\r\nbelegorn\r\nbelegund\r\nbelemir\r\nbëor\r\nbeorn\r\nbereg\r\nberegond\r\nberen\r\nbergil\r\nbert\r\nberúthiel\r\nbifur\r\nboldog\r\nberylla\r\nbofur\r\nbolg\r\nbolger\r\nbombadil\r\nbombur\r\nbór\r\nborin\r\nboromir\r\nboron\r\nborondir\r\nbrand\r\nbrandir\r\ngormadoc\r\nmeriadoc\r\nprimula\r\nbrego\r\nbregolas\r\nbregor\r\nbrodda\r\nbrytta\r\nbucca\r\nbarliman\r\ncalembel\r\ncalimehtar\r\ncalion\r\ncalmacil\r\ncalmacil\r\ncaranthir\r\ncarcharoth\r\ncastamir\r\ncemendur\r\nceleborn\r\ncelebrían\r\ncelebrimbor\r\ncelebrindor\r\ncelegorm\r\ncelepharn\r\nceorl\r\ncírdan\r\ncirion\r\nciryaher\r\nciryandil\r\nciryatan\r\nciryon\r\ncotton\r\ncurufin\r\ncurunír\r\ndaeron\r\ndáin\r\ndéagol\r\ndenethor\r\ndéor\r\ndeórwine\r\ndernhelm\r\ndior\r\ndís\r\ndori\r\ndorlas\r\ndraugluin\r\nduilin\r\ndurin\r\ndwalin\r\neärendil\r\neärendur\r\namandil\r\neärnil\r\neärnur\r\neärwen\r\necthelion\r\negalmoth\r\neilinel\r\nelanor\r\nelbereth\r\neldacar\r\neldarion\r\nelemmakil\r\nelendil\r\nelendor\r\nelendur\r\nelenna\r\nelenwë\r\nelessar\r\nelfhelm\r\nelfhild\r\nelfwine\r\nelladan\r\nelmo\r\nelrohir\r\nelrond\r\nelros\r\nelu\r\nelwë\r\nelwing\r\nelven\r\nking\r\nemeldir\r\nemerië\r\nenel\r\nenelyë\r\neöl\r\néomer\r\néomund\r\neönwë\r\neorl\r\néothain\r\néothéod\r\néowyn\r\neradan\r\nerendis\r\nerestor\r\nerkenbrand\r\nilúvatar\r\nestel\r\nestelmo\r\nestë\r\nfalassion\r\nfaniel\r\nfaramir\r\nfastred\r\nfëanor\r\nfelaróf\r\nfengel\r\nfíli\r\nfinarfin\r\nfindis\r\nfinduilas\r\nfinduilas\r\nfingolfin\r\nfingon\r\nfinrod\r\nfinvain\r\nfinwë\r\nfíriel\r\nfolcwine\r\nfréa\r\nfréaláf\r\nfréawine\r\nfreca\r\nfrerin\r\nfrór\r\nfuinur\r\nfundin\r\ngalador\r\ngaladriel\r\ngaldor\r\ngamil\r\ngamling\r\ngandalf\r\nghânburi\r\ngilgalad\r\ngildor\r\ngilrain\r\ngimilkhâd\r\ngimilzôr\r\ngimli\r\nginglith\r\ngirion\r\nglanhír\r\nglaurung\r\nglóin\r\nglóredhel\r\nglorfindel\r\ngoldberry\r\ngoldwine\r\ngolfimbul\r\ngollum\r\ngorbag\r\ngorlim\r\ngorthaur\r\ngothmog\r\ngram\r\ngríma\r\ngrimbold\r\ngrishnákh\r\ngrór\r\ngwaihir\r\ngwathir\r\ngwindor\r\nhador\r\nhalbarad\r\nhaldad\r\nhaldan\r\nhaldar\r\nhaldir\r\nhaleth\r\nhallas\r\nhalmir\r\nháma\r\nhandir\r\nhardang\r\nhareth\r\nhelm\r\nherion\r\nherucalmo\r\nherumor\r\nherunúmen\r\nhirgon\r\nhiril\r\nhostamir\r\nhuan\r\nhundar\r\nhuor\r\nhúrin\r\nhyarmendacil\r\nibûn\r\nidril\r\nilmarë\r\nilúvatar\r\nimbar\r\nimin\r\niminyë\r\nimrahil\r\nindis\r\ninglor\r\ningwë\r\ninziladûn\r\ninzilbêth\r\nírildë\r\nirimë\r\nirmo\r\nisildur\r\nisilmë\r\nisilmo\r\nivriniel\r\nkhamûl\r\nkhîm\r\nkíli\r\narthedain\r\nlagduf\r\nlalaith\r\nlegolas\r\nlenwë\r\nléod\r\nlindir\r\nlugdush\r\nlúthien\r\nlurtz\r\nmablung\r\nmaedhros\r\nmaeglin\r\nmaglor\r\nmagor\r\nmahtan\r\nmaiar\r\nmalach\r\nmallor\r\nmalvegil\r\nmanthor\r\nmanwë\r\nmarach\r\nvoronwë\r\nmauhúr\r\nmelian\r\nmeleth\r\nmeneldil\r\nmeneldur\r\nmîm\r\nminalcar\r\nminardil\r\nminastir\r\nminyatur\r\nmírielar\r\nzimraphel\r\nmírielserindë\r\nmithrandir\r\nmorgoth\r\nmorwen\r\nmorwen\r\nmuzgash\r\nnahar\r\nnáin\r\nnámo\r\nnarmacil\r\nnarvi\r\nnerdanel\r\nnessa\r\nnienna\r\nnienor\r\nnimloth\r\nnimrodel\r\nníniel\r\nnóm\r\nnori\r\nohtar\r\nóin\r\nolórin\r\nolwë\r\nondoher\r\nori\r\nornendil\r\norodreth\r\noromë\r\noropher\r\norophin\r\nossë\r\nostoher\r\npallando\r\npalantir\r\npelendur\r\npengolodh\r\npharazôn\r\nberúthiel\r\nradagast\r\nrían\r\nrómendacil\r\nrúmil\r\nlobelia\r\nlotho\r\nsador\r\nsaeros\r\nsakalthôr\r\nsalgant\r\nsalmar\r\nsaruman\r\nsauron\r\nscatha\r\nshadowfax\r\nshagrat\r\nshelob\r\nsilmariën\r\nsingollo\r\nsiriondil\r\nsmaug\r\nsméagol\r\nsnowmane\r\nsoronto\r\nstrider\r\nsúrion\r\nelmar\r\ntarcil\r\ntarondor\r\ntarannon\r\ntata\r\ntatië\r\ntelchar\r\ntelemmaitë\r\ntelemnar\r\ntelperiën\r\ntelumehtar\r\nthengel\r\nthéoden\r\nthéodred\r\nthéodwyn\r\nthingol\r\nthorin\r\nthorondir\r\nthorondor\r\nthráin\r\nthranduil\r\nthrór\r\ntilion\r\ntindomiel\r\ntinúviel\r\nadalgrim\r\nbelladonna\r\nferumbras\r\nfortinbras\r\ngerontius\r\nisumbras\r\npaladin\r\nperegrin\r\npervinca\r\ntulkas\r\ntuor\r\nturgon\r\nturambar\r\ntúrin\r\nufthak\r\nuglúk\r\nuinen\r\nuldor\r\nulfang\r\nulfast\r\nulwarth\r\nulmo\r\numbardacil\r\nundómiel\r\nungoliant\r\nuolë\r\nkúvion\r\nurwen\r\nvairë\r\nvalacar\r\nvalandil\r\nvalandur\r\nvána\r\nvanimeldë\r\nvarda\r\nvardamir\r\nnólimon\r\nvidugavia\r\nvidumavi\r\nvinyarion\r\nvorondil\r\nvoronwë\r\nwalda\r\nwormtongue\r\nyavanna\r\nyávien\r\nzimraphel\r\nzimrathôn".split("\n"));
	this.trainingData.set("werewolf_forenames","accalia\r\nadalwolf\r\nadalwolfa\r\nadolpha\r\nadolphus\r\namaguk\r\namarog\r\namoux\r\namwolf\r\nardolf\r\nardwolf\r\naudolf\r\nbardalph\r\nbardolf\r\nbeowulf\r\nbiryuk\r\nbleddyn\r\nbledig\r\nbleidd\r\nbodolf\r\nbotewolf\r\nbotolf\r\nbotwolf\r\ncana\r\ncanagan\r\nchann\r\nchanteloup\r\nconall\r\nconan\r\ncuan\r\ndolph\r\ndolphus\r\nethelwulf\r\neyolf\r\nfaolan\r\nfarkas\r\nfelan\r\nfenris\r\nfreki\r\nfridolf\r\nfriduwulf\r\ngeirolf\r\nguadalupe\r\ngunnolf\r\nhoniahaka\r\nhrolf\r\nhrolleif\r\ningolf\r\nivaylo\r\nlandga\r\nleidolf\r\nleloo\r\nlobo\r\nloup\r\nlowell\r\nlupe\r\nluperca\r\nlupo\r\nlupu\r\nlupus\r\nlyall\r\nlykaios\r\nmaccon\r\nmaengun\r\nmaheegan\r\nmahigan\r\nmaicoh\r\nmaiyun\r\nmakoce\r\nmingan\r\nmohegan\r\nnashoba\r\nnuntis\r\nodolf\r\nodwolfe\r\nolcan\r\nonai\r\nphelan\r\nradolf\r\nraff\r\nralph\r\nrand\r\nrandale\r\nrandall\r\nrandi\r\nrandolph\r\nranulfo\r\nraoul\r\nraul\r\nrendall\r\nreule\r\nrezso\r\nrodolfo\r\nrolf\r\nrudi\r\nrudolph\r\nsandalio\r\nseff\r\nshunkaha\r\nsingarti\r\nsirhaan\r\nsköll\r\nsusi\r\ntala\r\ntasha\r\ntate\r\ntchono\r\ntoralu\r\nudolf\r\nudolph\r\nujku\r\nulf\r\nulfred\r\nulger\r\nullok\r\nulmar\r\nulmer\r\nulric\r\nulvelaik\r\nuwais\r\nvarg\r\nvelvel\r\nvilkas\r\nvilks\r\nvuk\r\nvukasin\r\nweylyn\r\nwolfgang\r\nwolfram\r\nwolfrik\r\nwoolsey\r\nwulfgar\r\nylva".split("\n"));
	this.trainingData.set("romandeity_forenames","abeona\r\nabudantia\r\nadeona\r\naequitas\r\naera\r\naeternitas\r\nafricus\r\nalemonia\r\nangerona\r\nangita\r\nanna\r\nantevorte\r\naquilo\r\naurora\r\nauster\r\nbona\r\ncamenaees\r\ncandelifera\r\ncardea\r\ncarmenta\r\ncarnea\r\ncinxia\r\nclementia\r\ncloacina\r\ncoelus\r\nconcordia\r\nconditor\r\nconsus\r\nconvector\r\ncopia\r\ncorus\r\ncunina\r\ndea\r\ndea\r\ndecima\r\ndia\r\ndevera\r\ndeverra\r\ndisciplina\r\ndiscordia\r\ndius\r\negestes\r\nempanda\r\neventus\r\nfabulinus\r\nfama\r\nfauna\r\nfaunus\r\nfaustitas\r\nfavonius\r\nfebris\r\nfelicitas\r\nferonia\r\nfides\r\nflora\r\nfontus\r\nfornax\r\nfortuna\r\nfulgora\r\nfurina\r\nhonos\r\nindivia\r\njuturna\r\njuventas\r\nlactans\r\nlares\r\nlaverna\r\nliber\r\nlibera\r\nliberalitas\r\nlibertas\r\nlibitina\r\nlima\r\nlucifer\r\nlucina\r\nluna\r\nmaia\r\nmaiesta\r\nmania\r\nmanes\r\nmatuta\r\nmeditrina\r\nmefitas\r\nmellona\r\nmena\r\nmens\r\nmessor\r\nmoneta\r\nmors\r\nmorta\r\nmuta\r\nmutinus\r\nnaenia\r\nnecessitas\r\nnemestrinus\r\nnona\r\nnox\r\nnundina\r\nobarator\r\noccator\r\norbona\r\norcus\r\npales\r\nparcaes\r\npax\r\npenates\r\npicus\r\npietas\r\npoena\r\npomona\r\nportunes\r\nporus\r\npostverta\r\npotina\r\npriapus\r\nprorsa\r\nprovidentia\r\npudicitia\r\nputa\r\nquirinus\r\nquiritis\r\nrobigo\r\nrobigus\r\nroma\r\nrumina\r\nsancus\r\nsaritor\r\nsecuritas\r\nsemonia\r\nsors\r\nspes\r\nstata\r\nstimula\r\nstrenua\r\nsuadela\r\nsubrincinator\r\nsummanus\r\ntempestes\r\nterminus\r\nterra\r\ntrivia\r\nvacuna\r\nveritas\r\nvertumnus\r\nviduus\r\nviriplacaa\r\nvirtus\r\nvitumnus\r\nvolturnus\r\nvolumna\r\nvulturnus\r\napollo\r\ndemeter\r\ndiana\r\nartemis\r\njuno\r\nhera\r\njupiter\r\nzeus\r\nmars\r\nares\r\nmercury\r\nhermes\r\nminerva\r\nathena\r\nmenrva\r\nneptune\r\nposeidon\r\nvenus\r\naphrodite\r\nvesta\r\nhestia\r\nvulcan\r\nhephaestus\r\nasclepius\r\nattis\r\nbacchus\r\nbellona\r\nbubona\r\nceres\r\ncupid\r\ncybele\r\ndis\r\nendovelicus\r\nfaunus\r\nfuries\r\nhercules\r\nisis\r\njanus\r\nmithras\r\nops\r\nsalus\r\nserapis\r\nsaturn\r\nsilvanus\r\nsol\r\nsol\r\nsomnus\r\ntellus\r\nveiovis\r\nvictoria".split("\n"));
	this.trainingData.set("norsedeity_forenames","brynhildr\r\neir\r\ngeirahöð\r\ngeiravör\r\ngeirdriful\r\ngeirönul\r\ngeirskögul\r\ngöll\r\ngöndul\r\nguðr\r\ngunnr\r\nherfjötur\r\nherja\r\nhlaðguðr\r\nhildr\r\nhjalmþrimul\r\nhervör\r\nhjörþrimul\r\nhlökk\r\nhrist\r\nhrund\r\nkára\r\nmist\r\nölrún\r\nrandgríðr\r\nráðgríðr\r\nreginleif\r\nróta\r\nsanngriðr\r\nsigrdrífa\r\nsigrún\r\nskalmöld\r\nskeggöld\r\nskögul\r\nskuld\r\nsveið\r\nsvipul\r\nþögn\r\nþrima\r\nþrúðr\r\nbaduhenna\r\nbil\r\nbeyla\r\neir\r\nēostre\r\nfreyja\r\nfrigg\r\nfulla\r\ngefjun\r\ngersemi\r\ngerðr\r\ngná\r\ngullveig\r\nhariasa\r\nhlín\r\nhretha\r\nhnoss\r\nilmr\r\niðunn\r\nirpa\r\nlofn\r\nnanna\r\nnerthus\r\nnjörun\r\nrán\r\nrindr\r\nsága\r\nsandraudiga\r\nsif\r\nsigyn\r\nsinthgunt\r\nsjöfn\r\nskaði\r\nsnotra\r\nsól\r\nsyn\r\ntanfana\r\nþrúðr\r\nþorgerðr\r\nvár\r\nvör\r\nzisa\r\nbaldr\r\nbragi\r\ndellingr\r\nforseti\r\nfreyr\r\nheimdallr\r\nhermóðr\r\nhöðr\r\nhœnir\r\nlóðurr\r\nloki\r\nmáni\r\nmeili\r\nnjörðr\r\nodin\r\nóðr\r\nsaxnōt\r\nthor\r\ntýr\r\nullr\r\nváli\r\nviðarr\r\nvé\r\nvili".split("\n"));
	this.trainingData.set("swedish_forenames","elsa\r\nalice\r\nmaja\r\nagnes\r\nlilly\r\nolivia\r\njulia\r\nebba\r\nlinnea\r\nmolly\r\nella\r\nwilma\r\nklara\r\nstella\r\nfreja\r\nalicia\r\nalva\r\nalma\r\nisabelle\r\nellen\r\nsaga\r\nellie\r\nastrid\r\nemma\r\nnellie\r\nemilia\r\nvera\r\nsigne\r\nelvira\r\nnova\r\nselma\r\nester\r\nleah\r\nfelicia\r\nsara\r\nsofia\r\nelise\r\nines\r\ntyra\r\namanda\r\nelin\r\nida\r\nmoa\r\nmeja\r\nisabella\r\ntuva\r\nnora\r\nsiri\r\nmatilda\r\nsigrid\r\nedith\r\nlovisa\r\njuni\r\nliv\r\nlova\r\nhanna\r\ntilde\r\niris\r\nthea\r\nemelie\r\nmelissa\r\ncornelia\r\nleia\r\ningrid\r\nlivia\r\njasmine\r\nnathalie\r\ngreta\r\nstina\r\njoline\r\nfilippa\r\nemmy\r\nsvea\r\nmärta\r\ntilda\r\nhilda\r\nmajken\r\nceline\r\nellinor\r\nlykke\r\nnovalie\r\nlinn\r\ntindra\r\nmy\r\nmira\r\nrut\r\nronja\r\nhilma\r\nlisa\r\nmaria\r\nelina\r\nlovis\r\nminna\r\nhedda\r\namelia\r\nsally\r\nnicole\r\nvictoria\r\nluna\r\nanna\r\nelisa\r\nlucas\r\nwilliam\r\noscar\r\noliver\r\nliam\r\nelias\r\nhugo\r\nvincent\r\ncharlie\r\nalexander\r\naxel\r\nludvig\r\nelliot\r\nnoah\r\nleo\r\nviktor\r\nfilip\r\narvid\r\nalfred\r\nnils\r\nisak\r\nemil\r\ntheo\r\ntheodor\r\nedvin\r\nmelvin\r\ngustav\r\nsixten\r\nadam\r\nanton\r\nbenjamin\r\nolle\r\nvalter\r\nerik\r\nadrian\r\nalbin\r\nleon\r\nharry\r\nmax\r\ngabriel\r\nmalte\r\nmelker\r\njosef\r\nmohamed\r\nviggo\r\nebbe\r\nwilmer\r\nalvin\r\ncasper\r\nlove\r\njacob\r\njack\r\nkevin\r\nfelix\r\naugust\r\nloke\r\ncarl\r\nmilo\r\nsigge\r\nnoel\r\njonathan\r\nvidar\r\nsebastian\r\nville\r\ncolin\r\nmilton\r\nsimon\r\nsam\r\nfrank\r\nelton\r\nloui\r\nrasmus\r\ndavid\r\nsamuel\r\njoel\r\nhenry\r\nwilhelm\r\nlinus\r\ntage\r\nmatteo\r\nelis\r\nvilgot\r\nelvin\r\nivar\r\naron\r\nalex\r\notto\r\njohn\r\nmaximilian\r\neddie\r\nneo\r\ndaniel\r\njulian\r\nmio\r\nhjalmar\r\ndante\r\nali\r\nedward\r\nhampus\r\nsvante".split("\n"));
	this.trainingData.set("english_towns","abingdon\r\naccrington\r\nacle\r\nacton\r\nadlington\r\nalcester\r\naldeburgh\r\naldershot\r\nalford\r\nalfreton\r\nalnwick\r\nalsager\r\nalston\r\nalton\r\naltrincham\r\namble\r\nambleside\r\namersham\r\namesbury\r\nampthill\r\nandover\r\nappleby\r\narlesey\r\narundel\r\nashbourne\r\nashburton\r\nashby\r\nashford\r\nashington\r\nashton\r\naskern\r\naspatria\r\natherstone\r\nattleborough\r\naxbridge\r\naxminster\r\naylesbury\r\naylsham\r\ntown\r\nbacup\r\nbakewell\r\nbampton\r\nbanbury\r\nbarking\r\nbarnard\r\nbarnes\r\nbarnet\r\nbarnoldswick\r\nbarnsley\r\nbarnstaple\r\nbarrow\r\nbarton\r\nbasingstoke\r\nbatley\r\nbattle\r\nbawtry\r\nbeaconsfield\r\nbeaminster\r\nbebington\r\nbeccles\r\nbeckenham\r\nbedale\r\nbedford\r\nbedworth\r\nbelper\r\nbentham\r\nberkeley\r\nberkhamsted\r\nberwick\r\nbeverley\r\nbewdley\r\nbexhill\r\nbexley\r\nbicester\r\nbiddulph\r\nbideford\r\nbiggleswade\r\nbillericay\r\nbillingham\r\nbilston\r\nbingham\r\nbingley\r\nbirchwood\r\nbirkenhead\r\nbishop\r\nblackburn\r\nblackpool\r\nblackrod\r\nblackwater\r\nblandford\r\nbletchley\r\nblyth\r\nbodmin\r\nbognor\r\nbollington\r\nbolsover\r\nbolton\r\nbootle\r\nbordon\r\nboroughbridge\r\nboston\r\nbottesford\r\nbourne\r\nbournemouth\r\nbovey\r\nbrackley\r\nbradford\r\nbrading\r\nbradley\r\nbradninch\r\nbraintree\r\nbrampton\r\nbrandon\r\nbraunstone\r\nbrentford\r\nbrentwood\r\nbridgnorth\r\nbridgwater\r\nbridlington\r\nbridport\r\nbrierfield\r\nbrierley\r\nbrigg\r\nbrighouse\r\nbrightlingsea\r\nbrixham\r\nbroadstairs\r\nbromborough\r\nbromley\r\nbromsgrove\r\nbromyard\r\nbroseley\r\nbrough\r\nbroughton\r\nbruton\r\nbuckfastleigh\r\nbuckingham\r\nbude\r\nbudleigh\r\nbulwell\r\nbungay\r\nbuntingford\r\nburford\r\nburgess\r\nburgh\r\nburnham\r\nburnley\r\nburntwood\r\nburslem\r\nburton\r\nburton\r\nbury\r\nbury\r\nbushey\r\nbuxton\r\ncaistor\r\ncallington\r\ncalne\r\ncamborne\r\ncamelford\r\ncannock\r\ncanvey\r\ncarnforth\r\ncarlton\r\ncarshalton\r\ncarterton\r\ncastle\r\ncastleford\r\nchagford\r\nchapel\r\nchard\r\ncharlbury\r\nchatham\r\nchatteris\r\ncheadle\r\ncheltenham\r\nchertsey\r\nchesham\r\ncheshunt\r\nchesterfield\r\nchester\r\nchickerell\r\nchilton\r\nchingford\r\nchippenham\r\nchipping\r\nchipping\r\nchipping\r\nchorley\r\nchorleywood\r\nchristchurch\r\nchudleigh\r\nchulmleigh\r\nchurch\r\ncinderford\r\ncirencester\r\nclare\r\nclay\r\ncleator\r\ncleethorpes\r\ncleobury\r\nclevedon\r\nclitheroe\r\nclun\r\ncockermouth\r\ncoggeshall\r\ncolburn\r\ncolchester\r\ncoleford\r\ncoleshill\r\ncolne\r\ncolyton\r\ncongleton\r\nconisbrough\r\ncorbridge\r\ncorby\r\ncorringham\r\ncorsham\r\ncotgrave\r\ncowes\r\ncoulsdon\r\ncramlington\r\ncranbrook\r\ncraven\r\ncrawley\r\ncrediton\r\ncrewe\r\ncrewkerne\r\ncricklade\r\ncromer\r\ncrook\r\ncrosby\r\ncrowborough\r\ncroydon\r\ncrowland\r\ncrowle\r\ncullompton\r\ndagenham\r\ndalton\r\ndarley\r\ndarlington\r\ndartford\r\ndartmouth\r\ndarwen\r\ndaventry\r\ndawley\r\ndawlish\r\ndeal\r\ndenholme\r\ndereham\r\ndesborough\r\ndevizes\r\ndewsbury\r\ndidcot\r\ndinnington\r\ndiss\r\ndoncaster\r\ndorchester\r\ndorking\r\ndover\r\ndovercourt\r\ndownham\r\ndriffield\r\ndroitwich\r\ndronfield\r\ndudley\r\ndukinfield\r\ndulverton\r\ndunstable\r\ndunwich\r\ndursley\r\nealing\r\nearby\r\nearl\r\nearley\r\neasingwold\r\neast\r\neast\r\neast\r\neastbourne\r\neastleigh\r\neast\r\neastwood\r\neccles\r\neccleshall\r\nedenbridge\r\nedgware\r\nedmonton\r\negremont\r\nelland\r\nellesmere\r\nellesmere\r\nelstree\r\nemsworth\r\nenfield\r\nepping\r\nepworth\r\nerith\r\neton\r\nevesham\r\nexmouth\r\neye\r\nfairford\r\nfakenham\r\nfalmouth\r\nfareham\r\nfaringdon\r\nfarnham\r\nfaversham\r\nfazeley\r\nfeatherstone\r\nfelixstowe\r\nferndown\r\nferryhill\r\nfiley\r\nfilton\r\nfinchley\r\nfleet\r\nfleetwood\r\nflitwick\r\nfolkestone\r\nfordbridge\r\nfordingbridge\r\nfordwich\r\nfowey\r\nframlingham\r\nfrinton\r\nfrodsham\r\nfrome\r\ngainsborough\r\ngarstang\r\ngateshead\r\ngillingham\r\ngillingham\r\nglastonbury\r\nglossop\r\ngodalming\r\ngodmanchester\r\ngoole\r\ngorleston\r\ngosport\r\ngrange\r\ngrantham\r\ngrassington\r\ngravesend\r\ngrays\r\ngreat\r\ngreat\r\ngreat\r\ngreater\r\ngrimsby\r\nguildford\r\nguisborough\r\nhadleigh\r\nhailsham\r\nhalesowen\r\nhalesworth\r\nhalewood\r\nhalifax\r\nhalstead\r\nhaltwhistle\r\nredenhall\r\nharlow\r\nharpenden\r\nharrogate\r\nharrow\r\nhartland\r\nhartlepool\r\nharwich\r\nharworth\r\nhaslemere\r\nhaslingden\r\nhastings\r\nhatfield\r\nhatfield\r\nhatherleigh\r\nhavant\r\nhaverhill\r\nhawkinge\r\nhaxby\r\nhawes\r\nhayle\r\nhaywards\r\nheanor\r\nheathfield\r\nhebden\r\nhedge\r\nhednesford\r\nhedon\r\nhelmsley\r\nhelston\r\nhemel\r\nhemsworth\r\nhendon\r\nhenley\r\nhertford\r\nhessle\r\nhetton\r\nhexham\r\nheywood\r\nhigham\r\nhighbridge\r\nhighworth\r\nhigh\r\nhinckley\r\nhingham\r\nhitchin\r\nhoddesdon\r\nholbeach\r\nholsworthy\r\nholt\r\nhoniton\r\nhorley\r\nhorncastle\r\nhornsea\r\nhornsey\r\nhorsforth\r\nhorsham\r\nhorwich\r\nhoughton\r\nhounslow\r\nhowden\r\nhuddersfield\r\nhungerford\r\nhunstanton\r\nhuntingdon\r\nhyde\r\nhythe\r\nilford\r\nilfracombe\r\nilkeston\r\nilkley\r\nilminster\r\nimmingham\r\ningleby\r\nipswich\r\nirthlingborough\r\nivybridge\r\njarrow\r\nkeighley\r\nkempston\r\nkendal\r\nkenilworth\r\nkesgrave\r\nkeswick\r\nkettering\r\nkeynsham\r\nkidderminster\r\nkidsgrove\r\nkimberley\r\nkingsbridge\r\nkingsteignton\r\nkingston\r\nkington\r\nkirkby\r\nkirkbymoorside\r\nkirkham\r\nkirton\r\nknaresborough\r\nknutsford\r\nlangport\r\nlaunceston\r\nleatherhead\r\nlechlade\r\nledbury\r\nleek\r\nleigh\r\nleighton\r\nleiston\r\nleominster\r\nletchworth\r\nlewes\r\nleyburn\r\nleyton\r\nliskeard\r\nlittlehampton\r\nloddon\r\nloftus\r\nlong\r\nlongridge\r\nlongtown\r\nlooe\r\nlostwithiel\r\nloughborough\r\nloughton\r\nlouth\r\nlowestoft\r\nludgershall\r\nludlow\r\nluton\r\nlutterworth\r\nlydd\r\nlydney\r\nlyme\r\nlymington\r\nlynton\r\nlytchett\r\nlytham\r\nmablethorpe\r\nmacclesfield\r\nmadeley\r\nmaghull\r\nmaidenhead\r\nmaidstone\r\nmaldon\r\nmalmesbury\r\nmaltby\r\nmalton\r\nmalvern\r\nmanningtree\r\nmansfield\r\nmarazion\r\nmarch\r\nmargate\r\nmarlborough\r\nmarlow\r\nmaryport\r\nmasham\r\nmatlock\r\nmedlar\r\nmelksham\r\nmeltham\r\nmelton\r\nmere\r\nmexborough\r\nmiddleham\r\nmiddlesbrough\r\nmiddleton\r\nmiddlewich\r\nmidhurst\r\nmidsomer\r\nmildenhall\r\nmillom\r\nminchinhampton\r\nminehead\r\nminster\r\nmirfield\r\nmitcham\r\nmitcheldean\r\nmodbury\r\nmorecambe\r\nmoretonhampstead\r\nmoreton\r\nmorley\r\nmorpeth\r\nmossley\r\nmuch\r\nnailsea\r\nnailsworth\r\nnantwich\r\nneedham\r\nnelson\r\nneston\r\nnewark\r\nnewbiggin\r\nnewbury\r\nnewcastle\r\nnewent\r\nnewhaven\r\nnewlyn\r\nnewmarket\r\nnewport\r\nnewquay\r\nnewton\r\nnormanton\r\nnorth\r\nnorthallerton\r\nnortham\r\nnorthampton\r\nnorthfleet\r\nnorthleach\r\nnorthwich\r\nnorton\r\nnuneaton\r\noakengates\r\noakham\r\nokehampton\r\noldbury\r\noldham\r\nollerton\r\nolney\r\nongar\r\norford\r\normskirk\r\nossett\r\noswestry\r\notley\r\nottery\r\noundle\r\npaddock\r\npadiham\r\npadstow\r\npaignton\r\npainswick\r\npartington\r\npatchway\r\npateley\r\npeacehaven\r\npenistone\r\npenkridge\r\npenrith\r\npenryn\r\npenwortham\r\npenzance\r\npershore\r\npeterlee\r\npetersfield\r\npetworth\r\npickering\r\nplympton\r\npocklington\r\npolegate\r\npontefract\r\nponteland\r\npoole\r\nporthleven\r\nportishead\r\nportland\r\npotton\r\npoynton\r\npreesall\r\nprescot\r\nprinces\r\nprudhoe\r\npudsey\r\nqueenborough\r\nradstock\r\nramsey\r\nramsgate\r\nraunds\r\nrawtenstall\r\nrayleigh\r\nreading\r\nredcar\r\nredruth\r\nreepham\r\nreigate\r\nrichmond\r\nrichmond\r\nringwood\r\nripley\r\nrochdale\r\nrochester\r\nrochford\r\nromford\r\nromsey\r\nross\r\nrothbury\r\nrotherham\r\nrothwell\r\nrowley\r\nroyal\r\nroyston\r\nrugby\r\nrugeley\r\nrushden\r\nryde\r\nrye\r\nsaffron\r\nsalcombe\r\nsale\r\nsaltash\r\nsandbach\r\nsandhurst\r\nsandiacre\r\nsandown\r\nsandwich\r\nsandy\r\nsawbridgeworth\r\nsaxmundham\r\nscarborough\r\nscunthorpe\r\nseaford\r\nseaham\r\nseaton\r\nsedbergh\r\nsedgefield\r\nselby\r\nselsey\r\nsettle\r\nsevenoaks\r\nshaftesbury\r\nshanklin\r\nshefford\r\nshepshed\r\nshepton\r\nsherborne\r\nsheringham\r\nshifnal\r\nshildon\r\nshipston\r\nshirebrook\r\nshoreham\r\nshrewsbury\r\nsidmouth\r\nsilloth\r\nsilsden\r\nsittingbourne\r\nskegness\r\nskelmersdale\r\nskelton\r\nskipton\r\nsleaford\r\nslough\r\nsmethwick\r\nsnaith\r\nsnodland\r\nsoham\r\nsolihull\r\nsomerton\r\nsoutham\r\nsouthall\r\nsouthborough\r\nsouthend\r\nsouthgate\r\nsouthminster\r\nsouthport\r\nsouthsea\r\nsouthwell\r\nsouthwick\r\nsouthwold\r\nspalding\r\nspennymoor\r\nspilsby\r\nsprowston\r\nstafford\r\nstaines\r\nstainforth\r\nstalbridge\r\nstalham\r\nstalybridge\r\nstamford\r\nstanley\r\nstanhope\r\nstapleford\r\nstaveley\r\nstevenage\r\nsteyning\r\nstockport\r\nstocksbridge\r\nstockton\r\nstone\r\nstonehouse\r\nstony\r\nstotfold\r\nstourbridge\r\nstourport\r\nstowmarket\r\nstow\r\nstratford\r\nstretford\r\nstrood\r\nstroud\r\nsturminster\r\nsudbury\r\nsurbiton\r\nsutton\r\nsutton\r\nswaffham\r\nswanage\r\nswanley\r\nswanscombe\r\nswindon\r\nsyston\r\ntadcaster\r\ntadley\r\ntamworth\r\ntaunton\r\ntavistock\r\nteignmouth\r\ntelscombe\r\ntenbury\r\ntenterden\r\ntetbury\r\ntewkesbury\r\nthame\r\nthatcham\r\nthaxted\r\nthetford\r\nthirsk\r\nthornaby\r\nthornbury\r\nthorne\r\nthorpe\r\nthrapston\r\ntickhill\r\ntidworth\r\ntipton\r\ntisbury\r\ntiverton\r\ntodmorden\r\ntonbridge\r\ntopsham\r\ntorpoint\r\ntorquay\r\ntotnes\r\ntottenham\r\ntotton\r\ntow\r\ntowcester\r\ntring\r\ntrowbridge\r\ntwickenham\r\ntynemouth\r\nuckfield\r\nulverston\r\nuppingham\r\nupton\r\nuttoxeter\r\nuxbridge\r\nventnor\r\nverwood\r\nwadebridge\r\nwadhurst\r\nwainfleet\r\nwallasey\r\nwallsend\r\nwallingford\r\nwalsall\r\nwaltham\r\nwaltham\r\nwalthamstow\r\nwalton\r\nwantage\r\nware\r\nwareham\r\nwarminster\r\nwarrington\r\nwarwick\r\nwatchet\r\nwatford\r\nwath\r\nwatlington\r\nwatton\r\nwellingborough\r\nwednesbury\r\nwellington\r\nwells\r\nwembley\r\nwendover\r\nwestbury\r\nwesterham\r\nwesthoughton\r\nweston\r\nwetherby\r\nweybridge\r\nweymouth\r\nwhaley\r\nwhitby\r\nwhitchurch\r\nwhitehaven\r\nwhitehill\r\nwhitnash\r\nwhittlesey\r\nwhitworth\r\nwickham\r\nwickwar\r\nwidnes\r\nwigan\r\nwigton\r\nwillenhall\r\nwillesden\r\nwilton\r\nwilmslow\r\nwimbledon\r\nwimborne\r\nwincanton\r\nwinchcombe\r\nwinchelsea\r\nwindermere\r\nwindsor\r\nwinsford\r\nwinslow\r\nwinterton\r\nwirksworth\r\nwisbech\r\nwitham\r\nwithernsea\r\nwitney\r\nwiveliscombe\r\nwivenhoe\r\nwoburn\r\nwoburn\r\nwoking\r\nwokingham\r\nwolsingham\r\nwolverton\r\nwood\r\nwoodbridge\r\nwoodley\r\nwoodstock\r\nwooler\r\nworkington\r\nworksop\r\nworthing\r\nwotton\r\nwragby\r\nwymondham\r\nyarm\r\nyarmouth\r\nyate\r\nyateley\r\nyeovil\r\nbasildon\r\nbracknell\r\nmilton\r\nredditch\r\ntelford\r\nwashington\r\nwelwyn".split("\n"));
	this.trainingData.set("theological_demons","abaddon\r\napollyon\r\nabezethibou\r\nabraxas\r\nabyzou\r\nadramelech\r\naeshma\r\nagaliarept\r\nagrat\r\nagares\r\nagiel\r\nahriman\r\nangra\r\naim\r\nhaborym\r\naka\r\nala\r\nalal\r\nalastor\r\nalloces\r\nallocer\r\nallu\r\namaymon\r\namdusias\r\namy\r\nanamalech\r\nancitif\r\nandhaka\r\nandras\r\nandrealphus\r\nandromalius\r\nantichrist\r\nanzu\r\narmaros\r\narchon\r\narunasura\r\nasag\r\nasakku\r\nasbel\r\nasmodai\r\nasmodeus\r\nastaroth\r\nasura\r\nazazel\r\nazi\r\nbaal\r\nbael\r\nbabi\r\nbakasura\r\nbalam\r\nbalberith\r\nbali\r\nbanshee\r\nbaphomet\r\nbarbas\r\nbarbatos\r\nbarong\r\nbathin\r\nmathim\r\nbathym\r\nmarthim\r\nbeelzebub\r\nbehemoth\r\nbelial\r\nbeleth\r\nbelphegor\r\nberith\r\nbeherit\r\nbhūta\r\nbifrons\r\nboruta\r\nbotis\r\nbuer\r\nbukavac\r\nbune\r\nbushyasta\r\ncain\r\ncanio\r\ncharun\r\nchemosh\r\nchoronzon\r\ncimejes\r\nkimaris\r\ncimeies\r\ncorson\r\ncrocell\r\nprocell\r\nculsu\r\ndaeva\r\ndagon\r\ndajjal\r\ndantalion\r\ndanjal\r\ndavy\r\ndecarabia\r\ndemiurge\r\ndemogorgon\r\ndevil\r\ndrekavac\r\ndzoavits\r\neblis\r\neligos\r\neisheth\r\nfocalor\r\nforas\r\nforcas\r\nforneus\r\nfurcas\r\nforcas\r\nfurfur\r\ngaap\r\ngaderel\r\ngaki\r\ngamigin\r\nghoul\r\nglasya\r\ncaacrinolaas\r\ncaassimolar\r\nclassyalabolas\r\ngorgon\r\ngremory\r\ngomory\r\ngrigori\r\ngualichu\r\nguayota\r\ngusion\r\ngusoin\r\ngusoyn\r\nhaagenti\r\nhalphas\r\nmalthus\r\nhantu\r\nhaures\r\nflauros\r\nflavros\r\nhauras\r\nhavres\r\nifrit\r\nincubus\r\nipos\r\nipes\r\njinn\r\njikininki\r\nkabandha\r\nkabhanda\r\nkali\r\nkasadya\r\nkokabiel\r\nkroni\r\nkrampus\r\nkillakee\r\nkumbhakarna\r\nlegion\r\nlechies\r\nleyak\r\nlempo\r\nleraje\r\nleraie\r\nleviathan\r\nlili\r\nlilin\r\nlilim\r\nlilith\r\nlucifer\r\nlucifuge\r\nmalphas\r\nmammon\r\nmara\r\nmaricha\r\nmarax\r\nmorax\r\nforaii\r\nmarchosias\r\nmasih\r\nmastema\r\nmephistopheles\r\nmerihem\r\nmoloch\r\nmurmur\r\nmorpheus\r\nnaamah\r\nnaberius\r\ncerbere\r\nnaberus\r\nninurta\r\nnamtar\r\nonoskelis\r\norcus\r\norias\r\noriax\r\nornias\r\norobas\r\nose\r\nördög\r\npaimon\r\npazuzu\r\npelesit\r\nphenex\r\npenemue\r\npithius\r\npocong\r\npontianak\r\npruflas\r\npuloman\r\nrahab\r\nraum\r\nronove\r\nrusalka\r\nrakshasa\r\nrangda\r\nravan\r\nsabnock\r\nsaleos\r\nsamael\r\nsatan\r\nseir\r\nsemyaz\r\nshax\r\nchax\r\nshedim\r\nsitri\r\nsthenno\r\nstolas\r\nsolas\r\nsuanggi\r\nsuccubus\r\nsurgat\r\ntannin\r\ntoyol\r\ntuchulcha\r\nukobach\r\nvalac\r\nvalefar\r\nmalaphar\r\nmalephar\r\nvanth\r\nvapula\r\nvassago\r\nvepar\r\nvine\r\nwendigo\r\nxaphan\r\nxezbeth\r\nyeqon\r\nyeterel\r\nzagan\r\nzepar\r\nziminiar".split("\n"));
	window.onload = $bind(this,this.onWindowLoaded);
};
Main.__name__ = true;
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	onWindowLoaded: function() {
		var _g = this;
		this.trainingDataElement = window.document.getElementById("trainingdatalist");
		this.orderElement = window.document.getElementById("order");
		this.priorElement = window.document.getElementById("prior");
		this.maxProcessingTimeElement = window.document.getElementById("maxtime");
		var addSliderTooltips = function(slider) {
			var handles = slider.getElementsByClassName("noUi-handle");
			var tooltips = [];
			var _g1 = 0;
			var _g2 = handles.length;
			while(_g1 < _g2) {
				var i = _g1++;
				var tooltip = window.document.createElement("div");
				tooltip.className = "tooltip";
				tooltip.innerHTML = "<strong>Value: </strong><span></span>";
				tooltips.push(tooltip);
				handles[i].appendChild(tooltip);
			}
		};
		noUiSlider.create(this.orderElement,{ start : [3], connect : "lower", range : { 'min' : [1,1], 'max' : [9]}, pips : { mode : "range", density : 10}});
		this.orderElement.noUiSlider.on("change",function(values,handle,rawValues) {
			_g.order = values[handle] | 0;
		});
		noUiSlider.create(this.priorElement,{ start : [0.01], connect : "lower", range : { 'min' : 0.001, '50%' : 0.15, 'max' : 0.3}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 2})}});
		this.priorElement.noUiSlider.on("change",function(values1,handle1,rawValues1) {
			_g.prior = parseFloat(values1[handle1]);
		});
		noUiSlider.create(this.maxProcessingTimeElement,{ start : [500], connect : "lower", range : { 'min' : 50, 'max' : 5000}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 0})}});
		this.maxProcessingTimeElement.noUiSlider.on("change",function(values2,handle2,rawValues2) {
			_g.maxProcessingTime = parseFloat(values2[handle2]);
		});
		this.currentNamesElement = window.document.getElementById("currentnames");
		this.generateElement = window.document.getElementById("generate");
		this.lengthElement = window.document.getElementById("minmaxlength");
		noUiSlider.create(this.lengthElement,{ start : [4,11], connect : true, range : { 'min' : [3,1], 'max' : 18}, pips : { mode : "range", density : 10}});
		this.lengthElement.noUiSlider.on("change",function(values3,handle3,rawValues3) {
			if(handle3 == 0) _g.minLength = values3[handle3]; else if(handle3 == 1) _g.maxLength = values3[handle3];
		});
		this.startsWithElement = window.document.getElementById("startswith");
		this.endsWithElement = window.document.getElementById("endswith");
		this.includesElement = window.document.getElementById("includes");
		this.excludesElement = window.document.getElementById("excludes");
		this.similarElement = window.document.getElementById("similar");
		this.setDefaults();
		this.trainingDataElement.addEventListener("change",function() {
			if(_g.trainingDataElement.value != null) _g.trainingDataKey = _g.trainingDataElement.value;
			console.log(_g.trainingData.get(_g.trainingDataKey));
		},false);
		this.generateElement.addEventListener("click",function() {
			var data = _g.trainingData.get(_g.trainingDataKey);
			if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
			_g.generate(data);
		},false);
		this.startsWithElement.addEventListener("change",function() {
			if(_g.startsWithElement.value != null) _g.startsWith = _g.startsWithElement.value;
		},false);
		this.endsWithElement.addEventListener("change",function() {
			if(_g.endsWithElement.value != null) _g.endsWith = _g.endsWithElement.value;
		},false);
		this.includesElement.addEventListener("change",function() {
			if(_g.includesElement.value != null) _g.includes = _g.includesElement.value;
		},false);
		this.excludesElement.addEventListener("change",function() {
			if(_g.excludesElement.value != null) _g.excludes = _g.excludesElement.value;
		},false);
		this.similarElement.addEventListener("change",function() {
			if(_g.similarElement.value != null) _g.similar = _g.similarElement.value;
		},false);
		this.d3trie = new TrieForceGraph();
		d3.select("#triegraph").append("svg:svg").text(function() {
			return "d3 select thing seemed to work";
		}).style("background-color","black");
		window.setInterval(function() {
			console.log("Updating");
		},250);
	}
	,generate: function(data) {
		this.duplicateTrie = new lycan_util_PrefixTrie();
		var _g = 0;
		while(_g < data.length) {
			var name = data[_g];
			++_g;
			this.duplicateTrie.insert(name);
		}
		console.log(this.prior);
		this.generator = new lycan_util_namegen_NameGenerator(data,this.order,this.prior);
		var names = [];
		var startTime = new Date().getTime();
		var currentTime = new Date().getTime();
		while(names.length < this.numToGenerate && currentTime < startTime + 2000) {
			var name1 = this.generator.generateName(this.minLength,this.maxLength,this.startsWith,this.endsWith,this.includes,this.excludes);
			if(name1 != null && !this.duplicateTrie.find(name1)) {
				names.push(name1);
				this.duplicateTrie.insert(name1);
			}
			currentTime = new Date().getTime();
		}
		this.appendNames(names);
	}
	,appendNames: function(names) {
		var _g = this;
		if(this.similar.length > 0) names.sort(function(x,y) {
			var xSimilarity = lycan_util_EditDistanceMetrics.damerauLevenshtein(x,_g.similar,null);
			var ySimilarity = lycan_util_EditDistanceMetrics.damerauLevenshtein(y,_g.similar,null);
			if(xSimilarity > ySimilarity) return 1; else if(xSimilarity < ySimilarity) return -1; else return 0;
		});
		this.currentNamesElement.innerHTML = "";
		if(names.length == 0) {
			var li;
			var _this = window.document;
			li = _this.createElement("li");
			li.textContent = "No names found, check your filters or try again.";
			this.currentNamesElement.appendChild(li);
		}
		var _g1 = 0;
		while(_g1 < names.length) {
			var name = names[_g1];
			++_g1;
			var li1;
			var _this1 = window.document;
			li1 = _this1.createElement("li");
			li1.textContent = name;
			this.currentNamesElement.appendChild(li1);
		}
	}
	,setDefaults: function() {
		this.numToGenerate = 100;
		this.minLength = 7;
		this.maxLength = 10;
		this.order = 3;
		this.prior = 0.01;
		this.startsWith = "a";
		this.startsWithElement.value = this.startsWith;
		this.endsWith = "";
		this.endsWithElement.value = this.endsWith;
		this.includes = "l";
		this.includesElement.value = this.includes;
		this.excludes = "z";
		this.excludesElement.value = this.excludes;
		this.similar = "alina";
		this.similarElement.value = this.similar;
	}
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && HxOverrides.substr(s,slen - elen,elen) == end;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var TrieForceGraph = function() {
	this.height = 500;
	this.width = 960;
	this.force = d3.layout.force().size([this.width,this.height]).on("tick",$bind(this,this.tick));
	this.svg = d3.select("body").append("svg").attr("width",this.width).attr("height",this.height);
	this.link = this.svg.selectAll(".link");
	this.node = this.svg.selectAll(".node");
};
TrieForceGraph.__name__ = true;
TrieForceGraph.prototype = {
	update: function() {
		var nodes = this.flatten(this.root);
		var links = d3.layout.tree().links(nodes);
		this.force.nodes(nodes).links(links).start();
		this.link = this.link.data(links,function(d) {
			return d.target.id;
		});
		this.link.exit().remove();
		this.link.enter().insert("line",".node").attr("class","link").attr("x1",function(d1) {
			return d1.source.x;
		}).attr("y1",function(d2) {
			return d2.source.y;
		}).attr("x2",function(d3) {
			return d3.target.x;
		}).attr("y2",function(d4) {
			return d4.target.y;
		});
		this.node = this.node.data(nodes,function(d5) {
			return d5.id;
		}).style("fill",$bind(this,this.color));
		this.node.exit().remove();
		this.node.enter().append("circle").attr("class","node").attr("cx",function(d6) {
			return d6.x;
		}).attr("cy",function(d7) {
			return d7.y;
		}).attr("r",function(d8) {
			return Math.sqrt(d8.size) / 10 || 4.5;
		}).style("fill",$bind(this,this.color)).on("click",$bind(this,this.click)).call(($_=this.force,$bind($_,$_.drag)));
	}
	,flatten: function(root) {
		var nodes = [];
		var i = 0;
		var recurse = function(node) {
			if(node.children != null) {
				var _g = 0;
				var _g1 = node.children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					recurse(child);
				}
			}
			if(node.id != 0) {
				node.id = ++i;
				nodes.push(node);
			}
			return nodes;
		};
		return recurse(root);
	}
	,tick: function() {
		this.link.attr("x1",function(d) {
			return d.source.x;
		}).attr("y1",function(d1) {
			return d1.source.y;
		}).attr("x2",function(d2) {
			return d2.target.x;
		}).attr("y2",function(d3) {
			return d3.target.y;
		});
		this.node.attr("cx",function(d4) {
			return d4.x;
		}).attr("cy",function(d5) {
			return d5.y;
		});
	}
	,color: function(d) {
		if(d._children) return "#3182bd"; else if(d.children) return "#c6dbef"; else return "#fd8d3c";
	}
	,click: function() {
	}
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var js_d3__$D3_InitPriority = function() { };
js_d3__$D3_InitPriority.__name__ = true;
var lycan_util_ArrayExtensions = function() { };
lycan_util_ArrayExtensions.__name__ = true;
lycan_util_ArrayExtensions.randomElementFromArrays = function(arrays) {
	if(!(arrays != null && arrays.length != 0)) throw new js__$Boot_HaxeError("FAIL: arrays != null && arrays.length != 0");
	var totalLength = 0;
	var lengths = [];
	var _g = 0;
	while(_g < arrays.length) {
		var array = arrays[_g];
		++_g;
		if(!(array != null && array.length != 0)) throw new js__$Boot_HaxeError("FAIL: array != null && array.length != 0");
		totalLength += array.length;
		lengths.push(totalLength);
	}
	var n = Math.random() * totalLength;
	var i = 0;
	while(i < lengths.length) {
		if(n < lengths[i]) return lycan_util_ArrayExtensions.randomElement(arrays[i]);
		i++;
	}
	throw new js__$Boot_HaxeError("Failed to get random element");
};
lycan_util_ArrayExtensions.randomElement = function(array) {
	if(!(array != null && array.length != 0)) throw new js__$Boot_HaxeError("FAIL: array != null && array.length != 0");
	return array[Std.random(array.length)];
};
lycan_util_ArrayExtensions.noNulls = function(array) {
	if(!(array != null)) throw new js__$Boot_HaxeError("FAIL: array != null");
	var _g = 0;
	while(_g < array.length) {
		var e = array[_g];
		++_g;
		if(e == null) return false;
	}
	return true;
};
lycan_util_ArrayExtensions.binarySearchCmp = function(a,x,min,max,comparator) {
	if(!(a != null)) throw new js__$Boot_HaxeError("FAIL: a != null");
	if(!(min >= 0 && min < a.length)) throw new js__$Boot_HaxeError("FAIL: min >= 0 && min < a.length");
	if(!(max >= 0 && max < a.length)) throw new js__$Boot_HaxeError("FAIL: max >= 0 && max < a.length");
	if(!(comparator != null)) throw new js__$Boot_HaxeError("FAIL: comparator != null");
	var low = min;
	var high = max + 1;
	var middle;
	while(low < high) {
		middle = low + (high - low >> 1);
		if(comparator(a[middle],x) < 0) low = middle + 1; else high = middle;
	}
	if(low <= max && comparator(a[low],x) == 0) return low; else return ~low;
};
lycan_util_ArrayExtensions.binarySearch = function(a,x,min,max) {
	if(!(a != null)) throw new js__$Boot_HaxeError("FAIL: a != null");
	if(!(min >= 0 && min < a.length)) throw new js__$Boot_HaxeError("FAIL: min >= 0 && min < a.length");
	if(!(max >= 0 && max < a.length)) throw new js__$Boot_HaxeError("FAIL: max >= 0 && max < a.length");
	var low = min;
	var high = max + 1;
	var middle;
	while(low < high) {
		middle = low + (high - low >> 1);
		if(a[middle] < x) low = middle + 1; else high = middle;
	}
	if(low <= max && a[low] == x) return low; else return ~low;
};
var lycan_util__$ArraySet_ArraySet_$Impl_$ = {};
lycan_util__$ArraySet_ArraySet_$Impl_$.__name__ = true;
lycan_util__$ArraySet_ArraySet_$Impl_$._new = function(array) {
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.create = function(array) {
	if(array == null) return [];
	return lycan_util__$ArraySet_ArraySet_$Impl_$.toSet(array);
};
lycan_util__$ArraySet_ArraySet_$Impl_$.intersection = function(this1,set) {
	var result = [];
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(lycan_util__$ArraySet_ArraySet_$Impl_$.contains(set,item)) result.push(item);
	}
	return result;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.union = function(this1,set) {
	return lycan_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(lycan_util__$ArraySet_ArraySet_$Impl_$.toArray(set)));
};
lycan_util__$ArraySet_ArraySet_$Impl_$.unionArray = function(this1,set) {
	return lycan_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(set));
};
lycan_util__$ArraySet_ArraySet_$Impl_$.difference = function(this1,set) {
	var result;
	var array = this1.slice();
	result = array;
	var $it0 = HxOverrides.iter(set);
	while( $it0.hasNext() ) {
		var item = $it0.next();
		HxOverrides.remove(result,item);
	}
	var array1 = lycan_util__$ArraySet_ArraySet_$Impl_$.toArray(result);
	return array1;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.add = function(this1,v) {
	if(lycan_util__$ArraySet_ArraySet_$Impl_$.contains(this1,v)) return false;
	this1.push(v);
	return true;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.copy = function(this1) {
	var array = this1.slice();
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.contains = function(this1,v) {
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(item == v) return true;
	}
	return false;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.slice = function(this1,pos,end) {
	var array = this1.slice(pos,end);
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.splice = function(this1,pos,len) {
	var array = this1.splice(pos,len);
	return array;
};
lycan_util__$ArraySet_ArraySet_$Impl_$.toArray = function(this1) {
	return this1.slice();
};
lycan_util__$ArraySet_ArraySet_$Impl_$.toSet = function(array) {
	var set = [];
	var _g = 0;
	while(_g < array.length) {
		var v = array[_g];
		++_g;
		lycan_util__$ArraySet_ArraySet_$Impl_$.add(set,v);
	}
	return set;
};
var lycan_util_EditDistanceMetrics = function() { };
lycan_util_EditDistanceMetrics.__name__ = true;
lycan_util_EditDistanceMetrics.levenshtein = function(source,target) {
	if(!(source != null && target != null)) throw new js__$Boot_HaxeError("FAIL: source != null && target != null");
	var slen = source.length;
	var tlen = target.length;
	if(slen == 0) return tlen;
	if(tlen == 0) return slen;
	var costs;
	var this1;
	this1 = new Array(tlen + 1);
	costs = this1;
	var _g1 = 0;
	var _g = costs.length;
	while(_g1 < _g) {
		var i = _g1++;
		costs[i] = i;
	}
	var s = 0;
	while(s < source.length) {
		costs[0] = s + 1;
		var corner = s;
		var t = 0;
		while(t < target.length) {
			var upper = costs[t + 1];
			if(source.charAt(s) == target.charAt(t)) costs[t + 1] = corner; else {
				var tc;
				if(upper < corner) tc = upper; else tc = corner;
				costs[t + 1] = (costs[t] < tc?costs[t]:tc) + 1;
			}
			corner = upper;
			t++;
		}
		s++;
	}
	return costs[costs.length - 1];
};
lycan_util_EditDistanceMetrics.damerauLevenshteinMatrix = function(source,target,enableTransposition) {
	if(enableTransposition == null) enableTransposition = true;
	if(!(source != null && target != null)) throw new js__$Boot_HaxeError("FAIL: source != null && target != null");
	var w = source.length;
	var h = target.length;
	if(w == 0 || h == 0) {
		var this1;
		this1 = new Array(0);
		return this1;
	}
	w += 1;
	h += 1;
	var costs;
	var this2;
	this2 = new Array(w * h);
	costs = this2;
	var _g = 0;
	while(_g < w) {
		var i = _g++;
		costs[i] = i;
	}
	var _g1 = 1;
	while(_g1 < h) {
		var j = _g1++;
		costs[j * w] = j;
	}
	var cost = 0;
	var _g2 = 1;
	while(_g2 < w) {
		var x = _g2++;
		var _g11 = 1;
		while(_g11 < h) {
			var y = _g11++;
			if(source.charAt(x - 1) == target.charAt(y - 1)) cost = 0; else cost = 1;
			var val = lycan_util_IntExtensions.min(costs[x - 1 + y * w] + 1,lycan_util_IntExtensions.min(costs[x + (y - 1) * w] + 1,costs[x - 1 + (y - 1) * w] + cost));
			costs[x + y * w] = val;
			if(enableTransposition && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
				var val1 = lycan_util_IntExtensions.min(costs[x + y * w],costs[x - 2 + (y - 2) * w] + cost);
				costs[x + y * w] = val1;
			}
		}
	}
	return costs;
};
lycan_util_EditDistanceMetrics.damerauLevenshtein = function(source,target,enableTransposition) {
	if(enableTransposition == null) enableTransposition = true;
	if(source.length == 0) return target.length;
	if(target.length == 0) return source.length;
	var table = lycan_util_EditDistanceMetrics.damerauLevenshteinMatrix(source,target,enableTransposition);
	return table[table.length - 1];
};
var lycan_util_FileReader = function() { };
lycan_util_FileReader.__name__ = true;
var lycan_util_IntExtensions = function() { };
lycan_util_IntExtensions.__name__ = true;
lycan_util_IntExtensions.abs = function(v) {
	if(v < 0) return -v;
	return v;
};
lycan_util_IntExtensions.clamp = function(v,min,max) {
	if(v < min) return min;
	if(v > max) return max;
	return v;
};
lycan_util_IntExtensions.clampSym = function(v,bound) {
	if(v < bound) return bound; else if(v > bound) return bound; else return v;
};
lycan_util_IntExtensions.even = function(v) {
	return v % 2 == 0;
};
lycan_util_IntExtensions.odd = function(v) {
	return v % 2 != 0;
};
lycan_util_IntExtensions.max = function(a,b) {
	if(a > b) return a;
	return b;
};
lycan_util_IntExtensions.min = function(a,b) {
	if(a < b) return a;
	return b;
};
lycan_util_IntExtensions.toBool = function(v) {
	return v != 0;
};
lycan_util_IntExtensions.isPow2 = function(v) {
	return v > 0 && (v & v - 1) == 0;
};
lycan_util_IntExtensions.sign = function(x) {
	if(x > 0) return 1; else if(x < 0) return -1; else return 0;
};
var lycan_util_PrefixTrie = function() {
	this.root = new lycan_util_PrefixNode(" ",null);
};
lycan_util_PrefixTrie.__name__ = true;
lycan_util_PrefixTrie.findChild = function(node,letter) {
	var ret = null;
	var _g = 0;
	var _g1 = node.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		if(child.letter == letter) {
			ret = child;
			break;
		}
	}
	return ret;
};
lycan_util_PrefixTrie.prototype = {
	insert: function(word) {
		var current = this.root;
		var _g1 = 0;
		var _g = word.length;
		while(_g1 < _g) {
			var i = _g1++;
			var child = lycan_util_PrefixTrie.findChild(current,word.charAt(i));
			if(child == null) {
				child = new lycan_util_PrefixNode(word.charAt(i),current);
				current.children.push(child);
			} else child.frequency++;
			current = child;
		}
		current.word = true;
	}
	,find: function(word) {
		var current = this.root;
		var _g1 = 0;
		var _g = word.length;
		while(_g1 < _g) {
			var i = _g1++;
			current = lycan_util_PrefixTrie.findChild(current,word.charAt(i));
			if(current == null) return false;
		}
		if(!current.word) return false;
		return true;
	}
	,getWords: function() {
		var queue = new List();
		queue.add(this.root);
		var words = [];
		while(!queue.isEmpty()) {
			var node = queue.pop();
			if(node.word) {
				var word = node.letter;
				var parent = node.parent;
				while(parent != null) {
					word += parent.letter;
					parent = parent.parent;
				}
				words.push(lycan_util_StringExtensions.reverse(word));
			}
			var _g = 0;
			var _g1 = node.children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				queue.add(child);
			}
		}
		return words;
	}
};
var lycan_util_PrefixNode = function(letter,parent) {
	var actual = letter.length;
	var expected = 1;
	if(actual != expected) throw new js__$Boot_HaxeError("FAIL: values are not equal (expected: " + expected + ", actual: " + actual + ")");
	this.parent = parent;
	this.children = [];
	this.letter = letter;
	this.frequency = 1;
	this.word = false;
};
lycan_util_PrefixNode.__name__ = true;
var lycan_util_StringExtensions = function() { };
lycan_util_StringExtensions.__name__ = true;
lycan_util_StringExtensions.reverse = function(s) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
lycan_util_StringExtensions.repeat = function(s,times) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	if(!(times >= 1)) throw new js__$Boot_HaxeError("FAIL: times >= 1");
	var output = "";
	var _g = 0;
	while(_g < times) {
		var i = _g++;
		output += s;
	}
	return output;
};
lycan_util_StringExtensions.contains = function(s,substr) {
	return s.indexOf(substr) >= 0;
};
var lycan_util_namegen_Generator = function(data,order,smoothing) {
	if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
	if(!(order >= 1)) throw new js__$Boot_HaxeError("FAIL: order >= 1");
	this.order = order;
	this.smoothing = smoothing;
	this.models = [];
	var letters = lycan_util__$ArraySet_ArraySet_$Impl_$.create();
	var _g = 0;
	while(_g < data.length) {
		var d = data[_g];
		++_g;
		var _g2 = 0;
		var _g1 = d.length;
		while(_g2 < _g1) {
			var i = _g2++;
			lycan_util__$ArraySet_ArraySet_$Impl_$.add(letters,d.charAt(i));
		}
	}
	letters.sort(function(a,b) {
		if(a < b) return -1;
		if(a > b) return 1;
		return 0;
	});
	var domain = lycan_util__$ArraySet_ArraySet_$Impl_$.toArray(letters);
	domain.splice(0,0,"#");
	var _g3 = 0;
	while(_g3 < order) {
		var i1 = _g3++;
		this.models.push(new lycan_util_namegen_Model(data.slice(),order - i1,smoothing,domain));
	}
};
lycan_util_namegen_Generator.__name__ = true;
lycan_util_namegen_Generator.prototype = {
	generate: function() {
		var name = lycan_util_StringExtensions.repeat("#",this.order);
		var letter = this.getLetter(name);
		while(letter != "#") {
			if(letter != null) name += letter;
			letter = this.getLetter(name);
		}
		return name;
	}
	,getLetter: function(name) {
		var letter = null;
		var context = name.substring(name.length - this.order,name.length);
		var _g = 0;
		var _g1 = this.models;
		while(_g < _g1.length) {
			var model = _g1[_g];
			++_g;
			letter = model.generate(context);
			if(letter == null) context = context.substring(1); else break;
		}
		return letter;
	}
};
var lycan_util_namegen_Model = function(data,order,smoothing,domain) {
	if(!(domain != null && data != null)) throw new js__$Boot_HaxeError("FAIL: domain != null && data != null");
	if(!(domain.length > 0 && data.length > 0)) throw new js__$Boot_HaxeError("FAIL: domain.length > 0 && data.length > 0");
	if(!(smoothing >= 0 && smoothing <= 1)) throw new js__$Boot_HaxeError("FAIL: smoothing >= 0 && smoothing <= 1");
	if(!(order > 0)) throw new js__$Boot_HaxeError("FAIL: order > 0");
	this.order = order;
	this.smoothing = smoothing;
	this.domain = domain;
	this.observations = new haxe_ds_StringMap();
	this.train(data);
	this.rebuildChains();
};
lycan_util_namegen_Model.__name__ = true;
lycan_util_namegen_Model.prototype = {
	retrain: function(data) {
		if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
		this.train(data);
		this.rebuildChains();
	}
	,train: function(data) {
		while(data.length != 0) {
			var d = data.pop();
			d = lycan_util_StringExtensions.repeat("#",this.order) + d + "#";
			var _g1 = 0;
			var _g = d.length - this.order;
			while(_g1 < _g) {
				var i = _g1++;
				var key = d.substring(i,i + this.order);
				var value = this.observations.get(key);
				if(value == null) {
					value = [];
					this.observations.set(key,value);
				}
				value.push(d.charAt(i + this.order));
			}
		}
	}
	,rebuildChains: function() {
		this.chains = new haxe_ds_StringMap();
		var $it0 = this.observations.keys();
		while( $it0.hasNext() ) {
			var context = $it0.next();
			var _g = 0;
			var _g1 = this.domain;
			while(_g < _g1.length) {
				var prediction = _g1[_g];
				++_g;
				var value = this.chains.get(context);
				if(value == null) {
					value = [];
					this.chains.set(context,value);
				}
				value.push(this.smoothing + this.countMatches(this.observations.get(context),prediction));
			}
		}
	}
	,generate: function(context) {
		if(!(context != null)) throw new js__$Boot_HaxeError("FAIL: context != null");
		var chain = this.chains.get(context);
		if(chain == null) return null; else {
			if(!(chain.length > 0)) throw new js__$Boot_HaxeError("FAIL: chain.length > 0");
			return this.domain[this.selectIndex(chain)];
		}
	}
	,countMatches: function(arr,v) {
		if(arr == null) return 0;
		var i = 0;
		var _g = 0;
		while(_g < arr.length) {
			var s = arr[_g];
			++_g;
			if(s == v) i++;
		}
		return i;
	}
	,selectIndex: function(chain) {
		var totals = [];
		var accumulator = 0;
		var _g = 0;
		while(_g < chain.length) {
			var weight = chain[_g];
			++_g;
			accumulator += weight;
			totals.push(accumulator);
		}
		var rand = Math.random() * accumulator;
		var _g1 = 0;
		var _g2 = totals.length;
		while(_g1 < _g2) {
			var i = _g1++;
			if(rand < totals[i]) return i;
		}
		return 0;
	}
};
var lycan_util_namegen_NameGenerator = function(data,order,smoothing) {
	lycan_util_namegen_Generator.call(this,data,order,smoothing);
};
lycan_util_namegen_NameGenerator.__name__ = true;
lycan_util_namegen_NameGenerator.__super__ = lycan_util_namegen_Generator;
lycan_util_namegen_NameGenerator.prototype = $extend(lycan_util_namegen_Generator.prototype,{
	generateName: function(minLength,maxLength,startsWith,endsWith,includes,excludes) {
		var name = "";
		name = this.generate();
		name = StringTools.replace(name,"#","");
		if(name.length >= minLength && name.length <= maxLength && StringTools.startsWith(name,startsWith) && StringTools.endsWith(name,endsWith) && (includes.length == 0 || name.indexOf(includes) >= 0) && (excludes.length == 0 || !(name.indexOf(excludes) >= 0))) return name;
		return null;
	}
	,generateNames: function(n,minLength,maxLength,startsWith,endsWith,includes,excludes,maxTimePerName) {
		if(maxTimePerName == null) maxTimePerName = 0.02;
		var names = [];
		var startTime = new Date().getTime();
		var currentTime = new Date().getTime();
		while(names.length < n && currentTime > startTime + maxTimePerName * n) {
			var name = this.generateName(minLength,maxLength,startsWith,endsWith,includes,excludes);
			if(name != null) names.push(name);
			currentTime = new Date().getTime();
		}
		return names;
	}
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
var __map_reserved = {}
js_d3__$D3_InitPriority.important = "important";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=game.js.map
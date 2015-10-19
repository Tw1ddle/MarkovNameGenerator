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
	this.trainingData.set("scottish_surnames","aileanach\r\nailpeanach\r\nallanach\r\nambarsan\r\nandarsan\r\nanndrasdan\r\narasgain\r\nbànach\r\nbaran\r\nbarrach\r\nbeitean\r\nbhàsa\r\nbhodhsa\r\nblacach\r\nblàr\r\nblàrach\r\nbochanan\r\nboid\r\nbòideach\r\nbràigheach\r\nbreac\r\nbreathnach\r\nbrothaigh\r\nbruis\r\nbrùn\r\nbrus\r\nbuideach\r\nbuidheach\r\nbuids\r\nbuiseid\r\ncailbhin\r\ncaileanach\r\ncaimbeul\r\ncaimbeulach\r\ncamran\r\ncamshron\r\ncamshronach\r\ncananach\r\ncanonach\r\ncaoidheach\r\ncaolaisdean\r\ncatach\r\ncatan\r\ncatanach\r\nceallach\r\nceanadach\r\nceannaideach\r\ncearrach\r\nceiteach\r\nciar\r\nciarach\r\nciogach\r\ncoineagan\r\ncrannach\r\ncriatharach\r\ncuimeanach\r\ncuimein\r\ncuimeineach\r\ncàidh\r\ncèamp\r\ncèampach\r\ncòmhan\r\ncreag\r\ndalais\r\ndeòir\r\ndeòireach\r\ndòmhnallach\r\ndruimeanach\r\ndruimein\r\ndruimeineach\r\ndruiminn\r\ndubh\r\ndubhach\r\ndùbhghlas\r\ndùghallach\r\ndùghlas\r\ndùghlasach\r\ndunaid\r\ndunaidh\r\neabarcrombaigh\r\nfearghasdan\r\nfionnlasdan\r\nflimean\r\nfoirbeis\r\nfoirbeiseach\r\nforsàidh\r\nfòlais\r\nfriseal\r\nfrisealach\r\ngall\r\ngallach\r\ngeadais\r\ngeadasach\r\ngearailteach\r\ngilios\r\ngillandrais\r\ngilleasbaig\r\ngilleasbuig\r\ngillechriosd\r\ngillechrìost\r\ngiobsan\r\nglas\r\ngobha\r\ngrannd\r\ngrannda\r\ngranndach\r\ngreum\r\ngreumach\r\ngriogal\r\ngriogalach\r\ngriogarach\r\nguaire\r\nguinne\r\ngunnach\r\ngutraidh\r\ngòrdan\r\ngòrdanach\r\nìomharach\r\nlatharnach\r\nlathurna\r\nleamhanach\r\nleamhnach\r\nleòideach\r\nlobhdain\r\nloganach\r\nloudain\r\nlìos\r\nlìosach\r\nlùtair\r\nscottish\r\nmacillanndrais\r\nmacillebhreac\r\nmacilleathainn\r\nmacillfhinnein\r\nmacillfhinntain\r\nmacillfhionndaig\r\nmacilliosa\r\nmacilloig\r\nmacille\r\nmacillebhàin\r\nmacillebhuidh\r\nmacillechiar\r\nmacilledhuibh\r\nmacillemhìcheil\r\nmacillemhòire\r\nmacillenaoimh\r\nmacilleriabhaich\r\nmacilleruaidh\r\nmacuirigh\r\nmacabhra\r\nmacabhsalain\r\nmacadaidh\r\nmacadhaimh\r\nmacàidh\r\nmacaididh\r\nmacailein\r\nmacailpein\r\nmacalasdair\r\nmacambrais\r\nmacamhalghaidh\r\nmacamhlaidh\r\nmacamhlaigh\r\nmacanndaidh\r\nmacanndra\r\nmacanndrais\r\nmacaodhagain\r\nmacaoidh\r\nmacaoidhein\r\nmacaomalain\r\nmacaonghais\r\nmacara\r\nmacartain\r\nmacartair\r\nmacasgaidh\r\nmacasgaill\r\nmacasgain\r\nmacbeatha\r\nmacbeathag\r\nmacbhàididh\r\nmacbharrais\r\nmacbhàtair\r\nmacbheatha\r\nmacbheathaig\r\nmacbheathain\r\nmacbhigein\r\nmacbhiocair\r\nmacbhlàthain\r\nmacbhradain\r\nmacbhraonaigh\r\nmacbhrìghdeinn\r\nmaccàba\r\nmaccaibe\r\nmaccailein\r\nmaccain\r\nmaccaisgein\r\nmaccalmain\r\nmaccaluim\r\nmaccaog\r\nmaccaoig\r\nmaccardaidh\r\nmaccarmaig\r\nmaccathachaidh\r\nmaccathail\r\nmaccathbhaidh\r\nmaccathain\r\nmaccathasaigh\r\nmaccathbharra\r\nmacceallaig\r\nmacceallaigh\r\nmacceallair\r\nmaccearnaigh\r\nmaccearraich\r\nmacceasain\r\nmacchoinnich\r\nmaccianain\r\nmacciarain\r\nmacciomalain\r\nmaccionadha\r\nmaccinidh\r\nmacclambroch\r\nmaccnaimhin\r\nmaccnusachainn\r\nmaccodrum\r\nmaccoinnich\r\nmaccoinnigh\r\nmaccolla\r\nmaccomhainn\r\nmacconaill\r\nmacconnain\r\nmaccosgraigh\r\nmaccorcadail\r\nmaccormaig\r\nmaccrain\r\nmaccreamhain\r\nmaccriomain\r\nmaccrithein\r\nmaccrosain\r\nmaccruimein\r\nmaccrìsdein\r\nmaccròin\r\nmaccuaig\r\nmaccuidhein\r\nmaccuilcein\r\nmaccuinn\r\nmaccuinnleis\r\nmaccuirc\r\nmaccuithein\r\nmaccullach\r\nmaccullaich\r\nmaccumasgaigh\r\nmaccumhais\r\nmaccuthais\r\nmaccòiseam\r\nmaccòmhain\r\nmaccòmhghan\r\nmaccùga\r\nmacdheòrsa\r\nmacdhiarmaid\r\nmacdhonnchaidh\r\nmacdhrostain\r\nmacdhubhaich\r\nmacdhubhaig\r\nmacdhubhshìth\r\nmacdhubhthaich\r\nmacdhuibh\r\nmacdhunlèibhe\r\nmacdiarmaid\r\nmacdhàibhidh\r\nmacdhòmhnaill\r\nmacdhùghaill\r\nmacdhùnshléibhe\r\nmaceachaidh\r\nmaceachainn\r\nmaceachairn\r\nmaceacharna\r\nmacealair\r\nmacealar\r\nmaceamailinn\r\nmaceanain\r\nmaceanraig\r\nmaceòghainn\r\nmacfhearchair\r\nmacfhearghail\r\nmacfhearghais\r\nmacfhilib\r\nmacfhiongain\r\nmacfhionghain\r\nmacfhionnlaigh\r\nmacfhitheachain\r\nmacfhlaithbheartaich\r\nmacfhraing\r\nmacfhraingein\r\nmacfigeinn\r\nmacfrìdeinn\r\nmacfuirigh\r\nmacgairbheith\r\nmacgaradh\r\nmacghearailt\r\nmacgilleain\r\nmacghille\r\nmacgillearnain\r\nmacgilleasbaig\r\nmacgilleòin\r\nmacgillfhaolagain\r\nmacgillfhiontag\r\nmacgilloig\r\nmacgillonaidh\r\nmacgille\r\nmacgillebhàin\r\nmacgillebhràth\r\nmacgillebhreac\r\nmacgillebhrìghde\r\nmacgillechaluim\r\nmacgillechrìosd\r\nmacgilledhonaghart\r\nmacgilleathain\r\nmacgilledhuibh\r\nmacgillefhialain\r\nmacgilleghlais\r\nmacgilliosa\r\nmacgillemhartainn\r\nmacgilleriabhaich\r\nmacgilleseathanaich\r\nmacgiobain\r\nmacglaisein\r\nmacgoraidh\r\nmacgobhainn\r\nmacgoraidh\r\nmacgriogair\r\nmacguaire\r\nmacgumaraid\r\nmaciain\r\nmacillanndrais\r\nmacillaodhagain\r\nmacilldheòra\r\nmacillearnain\r\nmacilleasbaig\r\nmacilleathain\r\nmacillebhàin\r\nmacillebheathain\r\nmacillebhlàthain\r\nmacillebhràth\r\nmacillebhrìghde\r\nmacillebhris\r\nmacillebhuidhe\r\nmacillechaluim\r\nmacillechatain\r\nmacillechathbhaidh\r\nmacillechiar\r\nmacillechiarain\r\nmacillechomhghain\r\nmacillechonaill\r\nmacillechrìosd\r\nmacillechruim\r\nmacilledhòmhnaich\r\nmacilledhonaghart\r\nmacilledhubhthaich\r\nmacilledhuibh\r\nmacilledhuinn\r\nmacilleghlais\r\nmacilleghuinnein\r\nmacilleghuirm\r\nmacilléidich\r\nmacilleòin\r\nmacillemhaoil\r\nmacillemhàrtainn\r\nmacillemhearnaig\r\nmacillemhìcheil\r\nmacillemhoire\r\nmacillenaoimh\r\nmacillephàdraig\r\nmacillepheadair\r\nmacilleriabhaich\r\nmacilleruaidh\r\nmacillesheathain\r\nmacillesheathanaich\r\nmacillesheathnaich\r\nmacillethòmhais\r\nmacillfhaolagain\r\nmacillfhaolain\r\nmacillfheargain\r\nmacillfhialain\r\nmacillfhinnein\r\nmacillfhionndaig\r\nmacillfhionndain\r\nmacillianain\r\nmacillìmheir\r\nmacilliomchadha\r\nmacillìosa\r\nmacillonchon\r\nmacillonfhaidh\r\nmacillosa\r\nmacilluidhir\r\nmaciomhair\r\nmacionmhainn\r\nmaciosaig\r\nmaclabhrainn\r\nmaclabhruinn\r\nmaclachlainn\r\nmaclagain\r\nmaclamraich\r\nmaclaomainn\r\nmaclathagain\r\nmacleòid\r\nmacleòir\r\nmaclianain\r\nmaclothaidh\r\nmacliuthar\r\nmaclughaidh\r\nmacluinge\r\nmacluirg\r\nmaclulaich\r\nmaclùcaidh\r\nmaclùcais\r\nmacmhaighstir\r\nmacmhanachain\r\nmacmhannain\r\nmacmhaoilein\r\nmacmhaoirn\r\nmacmhaolagain\r\nmacmhaolain\r\nmacmhaolbheatha\r\nmacmhaolchaluim\r\nmacmhaoldòmhnaich\r\nmacmhaolìosa\r\nmacmharais\r\nmacmharcais\r\nmacmhata\r\nmacmhatha\r\nmacmhathain\r\nmacmhàrtainn\r\nmacmhànais\r\nmacmhèinn\r\nmacmhiadhchain\r\nmacmhìcheil\r\nmacmhoirein\r\nmacmhòrdha\r\nmacmhorgain\r\nmacmhuircheartaich\r\nmacmhuirich\r\nmacmhunna\r\nmacmhurardaich\r\nmacmhurchaidh\r\nmacnaois\r\nmacnaomhain\r\nmacneacail\r\nmacneachdain\r\nmacneis\r\nmacnèill\r\nmacnia\r\nmacniallghais\r\nmacniallghuis\r\nmacnìll\r\nmacniocail\r\nmacnobaill\r\nmacphaid\r\nmacphaidein\r\nmacphail\r\nmacphairce\r\nmacphàdraig\r\nmacphàic\r\nmacphàidein\r\nmacphàil\r\nmacphàrlain\r\nmacpheadair\r\nmacpheadarain\r\nmacpheadrais\r\nmacpheidearain\r\nmacphilip\r\nmacphòil\r\nmacrabaidh\r\nmacraghnaill\r\nmacraibeirt\r\nmacraoimhin\r\nmacraoiridh\r\nmacraonaill\r\nmacrath\r\nmacràild\r\nmacriada\r\nmacriocaird\r\nmacrisnidh\r\nmacrìdeinn\r\nmacrìgh\r\nmacrob\r\nmacrobaidh\r\nmacroibeirt\r\nmacroithridh\r\nmacruairidh\r\nmacrusachainn\r\nmacshanndaidh\r\nmacshealbhaigh\r\nmacsheòrais\r\nmacsheòrsa\r\nmacshimidh\r\nmacshithich\r\nmacshitrig\r\nmacshìm\r\nmacshomhairle\r\nmacshuibhne\r\nmacsiridh\r\nmacsporain\r\nmacsuain\r\nmacsual\r\nmacthaidhg\r\nmactheàrlaich\r\nmacthom\r\nmacthomaidh\r\nmacthorcadail\r\nmacthorcaill\r\nmacthàmhais\r\nmacthòmais\r\nmactiridh\r\nmactuirc\r\nmacualraig\r\nmacuaraig\r\nmacuchtraigh\r\nmacuilleim\r\nmacuirigh\r\nmacuisdein\r\nmacurardaidh\r\nmacurardaigh\r\nmacurchadain\r\nmacurchaidh\r\nmacusbaig\r\nmacùisdein\r\nscottish\r\nmaoileanach\r\nmaoliosa\r\nmatasan\r\nmathanach\r\nmatharnach\r\nmawr\r\nmoireach\r\nmoireasdan\r\nmoireasdanach\r\nmorgan\r\nmorganach\r\nmunna\r\nmàrnach\r\nmàrr\r\nmàrtainn\r\nmèinn\r\nmèinnearach\r\nniocalsan\r\npadarsan\r\npaorach\r\npeadarsan\r\npeucag\r\npeutan\r\npreas\r\npuidreach\r\nrathais\r\nrobasan\r\nrobasdan\r\nroid\r\nroideach\r\nros\r\nròs\r\nrosach\r\nròsach\r\nrothach\r\nruadh\r\nruiseal\r\nsailcirc\r\nsalmond\r\nseadh\r\nseadhg\r\nseagha\r\nseaghach\r\nseathanach\r\nsgèin\r\nsginnearach\r\nsgot\r\nsingleir\r\nsiosal\r\nsiosalach\r\nsmios\r\nstiùbhart\r\nstiùbhartach\r\nsùdrach\r\nsutharlainn\r\nsutharlan\r\nsuthurlanach\r\ntod\r\ntodt\r\ntalmhach\r\ntolmach\r\ntuairnear\r\ntàileach\r\ntàillear\r\ntulach\r\nualas\r\numphraidh\r\nurchadainn\r\nurchardan".split("\n"));
	this.trainingData.set("irish_forenames","ainm\r\naibhilín\r\neibhlín\r\naffraic\r\naifric\r\naíbhinn\r\naoibhin\r\nailbhe\r\náine\r\nanne\r\naisling\r\naislin\r\naislinn\r\naithche\r\naodhamair\r\naodhnait\r\naoibheann\r\naoibhinn\r\naoibhe\r\naoife\r\nathracht\r\nbarrdhubh\r\nbébhinn\r\nvivian\r\nbláth\r\nbláthnaid\r\nflora\r\nblinne\r\nblanche\r\nbríd\r\nbrighid\r\nbrídín\r\nbrighdín\r\nbrónach\r\nbuadhnait\r\ncacht\r\ncaoimhe\r\ncaoilfhionn\r\nciamhnait\r\nciannait\r\nciara\r\nclíona\r\ncliodhna\r\nclodagh\r\ncobhlaith\r\ncobhfhlaith\r\ndamhnait\r\ndymphna\r\ndearbháil\r\ndervilia\r\ndearbhfhorgaill\r\ndearbhfhorghaill\r\ndearbhla\r\ndeirdre\r\ndianaimh\r\ndoireann\r\ndorothy\r\ndubhchobhlaigh\r\ndubhóg\r\nearnait\r\neasnadh\r\neithne\r\néimhear\r\neimhear\r\neimear\r\neimer\r\némer\r\néadaoin\r\nétaín\r\nedwina\r\nfaoiltighearna\r\nfeidhelm\r\nféthnaid\r\nféthnat\r\nfiadhnait\r\nfíona\r\nfionnuala\r\nfionnghuala\r\nflann\r\nflannait\r\nfodhla\r\nforbhlaith\r\nfíneamhain\r\ngeiléis\r\ngobnait\r\ngormlaith\r\ngormfhlaith\r\ngráinne\r\ngranya\r\ngrace\r\niodhnait\r\níde\r\nlann\r\nlasairfhíona\r\nmeabh\r\nmeadhbh\r\nmeibhín\r\nmeidhbhín\r\nmeaveen\r\nmealla\r\nmíde\r\nmór\r\nsarah\r\nmóirín\r\nmiodhnait\r\nmuadhnait\r\nmuireann\r\nmuirinn\r\nmarion\r\nmuirgheal\r\nmuirne\r\nniamh\r\nnuala\r\nnóra\r\nnóirín\r\nodharnait\r\nonóra\r\nhonora\r\nórla\r\nórlaith\r\nórfhlaith\r\npeig\r\npeigi\r\npeigín\r\nrathnait\r\nríona\r\nríonach\r\nríoghnach\r\nsadhbh\r\nsaev\r\nsaoirse\r\nsaorla\r\nsaorlaith\r\nsaorfhlaith\r\nsíthmaith\r\nsláine\r\nsorcha\r\ntuathflaith\r\nuallach\r\nuasal\r\núna\r\nabbán\r\naibhne\r\nailín\r\nainníleas\r\namhalgaidh\r\nanluan\r\nanmchadh\r\naodh\r\naodhán\r\naogán\r\naodhagán\r\naonghus\r\nárdghal\r\nardghal\r\nardghar\r\nart\r\nbarra\r\nbairre\r\nbearach\r\nbaothghalach\r\nbeacán\r\nbearchán\r\nbran\r\nbreasal\r\nbasil\r\nbreandán\r\nbreanndán\r\nbréanainn\r\nbrian\r\nbrochadh\r\nbuadhach\r\ncailean\r\ncoilean\r\ncoileán\r\ncoilín\r\ncuileán\r\ncairbre\r\ncalbhach\r\ncaoimhín\r\ncaoimhghín\r\ncaolán\r\nkyle\r\ncaomhán\r\ncarraig\r\ncárthach\r\ncathal\r\ncharles\r\ncathaoir\r\ncharles\r\ncathbharr\r\nceallach\r\nceallachán\r\ncearbhall\r\ncharles\r\ncian\r\ncianán\r\nciarán\r\ncinnéididh\r\ncinnéidigh\r\ncionaodh\r\nciothruadh\r\ncillian\r\ncoinneach\r\ncainneach\r\ncanice\r\ncoireall\r\ncyril\r\ncolla\r\ncolm\r\ncolum\r\ncolmán\r\ncomán\r\ncomhghall\r\ncomhghan\r\nconall\r\nconán\r\nconaire\r\nconchúr\r\nconchobhar\r\nconchubhar\r\nconghalach\r\nconmhac\r\nconn\r\nconnla\r\nconnlaodh\r\ncormac\r\ncosnamhach\r\ncriomthann\r\ncróchán\r\ncrónán\r\ncuan\r\ncúchonnacht\r\ncuimín\r\ncúmhaighe\r\ncúmheadha\r\ndabhag\r\ndabhóg\r\ndáithí\r\ndavid\r\ndamháin\r\ndara\r\ndaire\r\ndéaglán\r\ndeaglán\r\ndeclan\r\ndeasmhumhnach\r\ndiarmaid\r\ndiarmait\r\njeremiah\r\ndónall\r\ndomhnall\r\ndaniel\r\ndonn\r\ndonnán\r\ndonnchadh\r\ndonnchadha\r\ndenis\r\ndubhaltach\r\ndubhán\r\ndubhghall\r\ndubhghlas\r\ndúnlang\r\neachaidh\r\neachann\r\neachdhonn\r\neachthighearn\r\néanán\r\néanna\r\néinde\r\nearcán\r\nearnán\r\neirnín\r\néibhear\r\néignach\r\neignach\r\néigneachán\r\neigneachán\r\néimhín\r\néireamhón\r\neireamhón\r\neireamhán\r\neochaidh\r\neoghan\r\neoghainín\r\nfachtna\r\nfáilbhe\r\nfaolán\r\nfearadhach\r\nfearchar\r\nfearganainm\r\nfearghal\r\nfeichín\r\nféilim\r\nfeidhlim\r\nfelix\r\nfergus\r\nfeargus\r\nfearghus\r\nfiach\r\nfiacha\r\nfiachra\r\nfeary\r\nfinghin\r\nfionghuine\r\nfionn\r\nfionntán\r\nfinnian\r\nfintan\r\nfinian\r\nfionnbharr\r\nfitheal\r\nflann\r\nflannán\r\ngarbhán\r\nglaisne\r\niarlaith\r\niarfhlaith\r\nirial\r\nlachtna\r\nlaoiseach\r\nlaoighseach\r\nlewis\r\nlasairian\r\nlochlann\r\nlochlainn\r\nlomán\r\nlonán\r\nlorcán\r\nlaurence\r\nlughaidh\r\nlewis\r\nmaeleachlainn\r\nmaelsheachlainn\r\nmalachy\r\nmaelíosa\r\nmainchín\r\nmaodhóg\r\nmaoilín\r\nmaoilir\r\nmaolcholm\r\nmaolcholuim\r\nmaolmórdha\r\nmaolmhuire\r\nmaolruadháin\r\nmathghamhain\r\nmuircheartach\r\nmortimer\r\nmuireadhach\r\nmuireach\r\nmuirgheas\r\nmuiris\r\nmurchadh\r\nnaomhán\r\nnaos\r\nneachtan\r\nneasán\r\nniall\r\nniallán\r\nodhrán\r\noireachtach\r\noisín\r\noscar\r\nriain\r\nroibhilín\r\nraibhilín\r\nruibhilín\r\nrónán\r\nros\r\nruadhán\r\nruairi\r\nruari\r\nruairí\r\nruarí\r\nruaidhri\r\nruaridh\r\nroger\r\nsaerbhreathach\r\nseachnasach\r\nséadna\r\nsenán\r\nsiadhal\r\nsiaghal\r\nsioda\r\nsuibhne\r\ntadhg\r\ntimothy\r\ntaichleach\r\ntighernach\r\ntighearnán\r\ntiarnach\r\ntiarnán\r\ntiernan\r\ntoirdhealbhach\r\ntoirleach\r\nterry\r\ntorna\r\ntreabhair\r\ntuathal\r\nuaitéar\r\nuaithne\r\nualgharg\r\nultán\r\ncaitlín\r\ncatraoine\r\ncaitríona\r\ncaitrín\r\néabha\r\neibhlín\r\neilín\r\neilís\r\náilís\r\nmáire\r\nmairéad\r\nmairghréad\r\nmáirín\r\nráichéal\r\nraghnailt\r\nrós\r\nróis\r\nróisín\r\nsíle\r\nsinéad\r\nsiobhán\r\nambrós\r\namhlaoibh\r\nárón\r\nailin\r\naindriú\r\naindréas\r\nartúr\r\nagaistín\r\nágastas\r\nantóin\r\nbearnárd\r\nbeinidict\r\ncríostóir\r\ndainéal\r\néadbhárd\r\neamon\r\néamon\r\neoin\r\neóin\r\njohn\r\ngearóid\r\ngréagóir\r\ngreagoir\r\niúdás\r\nlabhrás\r\nlubhrás\r\nliam\r\nuilliam\r\nmáirtín\r\nmaitiú\r\nmícheál\r\nnioclás\r\noilibhéar\r\npádraig\r\npeadar\r\npilib\r\nproinsias\r\nfroinsias\r\npól\r\npóil\r\nristeárd\r\nristéard\r\nréamann\r\nréamonn\r\nroibéard\r\nroibeárd\r\nroibeard\r\nseán\r\nséan\r\nseathan\r\nséaonin\r\nséafra\r\nséamus\r\nséamas\r\nseárlas\r\nseoirse\r\nseosamh\r\niósaf\r\nióseph\r\nsíomón\r\nstíofán\r\ntéodóir\r\ntiobóid\r\ntomás\r\nuinseann".split("\n"));
	this.trainingData.set("icelandic_forenames","aagot\nabela\nabigael\nada\nadda\naddú\naddý\nadela\nadelía\nadríana\naðalbjörg\naðalbjört\naðalborg\naðaldís\naðalfríður\naðalheiður\naðalrós\naðalsteina\naðalsteinunn\naðalveig\nagata\nagatha\nagða\nagla\nagnea\nagnes\nagneta\nágústa\nágústína\nakira\nalanta\nalba\nalberta\nalbína\nalda\naldís\naldný\nalena\naleta\naletta\nalexa\nalexandra\nalexandría\nalexis\nalexía\nalexstrasa\nalfa\nálfdís\nálfey\nálfgerður\nálfheiður\nálfhildur\nalfífa\nálfrós\nálfrún\nálfsól\nalice\nalida\nalída\nalína\nalís\nalísa\nalla\nallý\nalma\nalrún\nalva\nalvilda\namadea\namal\namalía\namanda\namelía\namilía\namíra\namy\namý\nanalía\nanastasía\nandra\nandrá\nandrea\nandríana\nanetta\nangela\nangelía\nangelíka\nanika\naníka\nanína\nanita\naníta\nanja\nann\nanna\nannabella\nannalísa\nanne\nannelí\nannetta\nanney\nannika\nannía\nanný\nantonía\napríl\nara\nárbjörg\nárbjört\nardís\nárdís\nárelía\narey\naría\naríaðna\naríana\naríanna\naríela\naríella\narín\narína\narinbjörg\naris\narís\narisa\narja\nárlaug\narmenía\nármey\narna\nárna\narnbjörg\narnborg\narndís\nárndís\narney\nárney\narnfinna\narnfríður\narngerður\narngunnur\narnheiður\nárnheiður\narnhildur\narnika\nárnína\narnkatla\narnlaug\narnleif\narnlín\narnljót\narnóra\narnrós\narnrún\nárný\narnþóra\narnþrúður\náróra\nársól\nársæl\nárún\nárveig\nárvök\nárþóra\nása\násbjörg\násborg\násdís\násfríður\násgerður\náshildur\nasía\nasírí\náskatla\naskja\násla\náslaug\násleif\násný\násrós\násrún\nassa\nást\násta\nástbjörg\nástbjört\nástdís\nástfríður\nástgerður\nástheiður\násthildur\nastrid\nástríður\nástrós\nástrún\nástveig\nástþóra\nástþrúður\násvör\natalía\natena\nathena\natla\natlanta\nauðbjörg\nauðbjört\nauðdís\nauðlín\nauðna\nauðný\nauðrún\nauður\naurora\naxelía\naxelma\naþena\r\nbaldey\nbaldrún\nbaldvina\nbarbara\nbarbára\nbassí\nbára\nbebba\nbegga\nbelinda\nbella\nbenedikta\nbengta\nbenidikta\nbenía\nbeníta\nbenna\nbenney\nbenný\nbenta\nbentey\nbentína\nbera\nbergdís\nbergey\nbergfríður\nbergheiður\nberghildur\nberglaug\nberglind\nberglín\nbergljót\nbergmannía\nbergný\nbergrán\nbergrín\nbergrós\nbergrún\nbergsveina\nbergþóra\nberit\nbernódía\nberta\nbertha\nbessí\nbestla\nbeta\nbetanía\nbetsý\nbettý\nbíbí\nbil\nbína\nbirgit\nbirgitta\nbirna\nbirta\nbirtna\nbjargdís\nbjargey\nbjargheiður\nbjarghildur\nbjarglind\nbjarkey\nbjarklind\nbjarma\nbjarndís\nbjarney\nbjarnfríður\nbjarngerður\nbjarnheiður\nbjarnhildur\nbjarnlaug\nbjarnrún\nbjarnveig\nbjarný\nbjarnþóra\nbjarnþrúður\nbjartey\nbjartmey\nbjörg\nbjörgey\nbjörgheiður\nbjörghildur\nbjörk\nbjörney\nbjörnfríður\nbjört\nbláey\nbláklukka\nblíða\nblín\nblómey\nblædís\nblær\nbobba\nbóel\nboga\nbogdís\nbogey\nbogga\nboghildur\nborg\nborgdís\nborghildur\nborgný\nborgrún\nborgþóra\nbót\nbóthildur\nbotnía\nbrá\nbraga\nbraghildur\nbrák\nbranddís\nbrandís\nbríana\nbríanna\nbriet\nbríet\nbrigitta\nbrimdís\nbrimhildur\nbrimrún\nbrit\nbritt\nbritta\nbryndís\nbrynfríður\nbryngerður\nbrynheiður\nbrynhildur\nbrynja\nbrynný\nburkney\nbylgja\r\ncamilla\ncaritas\ncarla\ncarmen\ncathinca\ncecilia\ncecilía\ncharlotta\ncharlotte\nchrista\nchristel\nchristina\nchristine\nclara\r\ndaðey\ndaðína\ndagbjörg\ndagbjört\ndagfríður\ndaggrós\ndagheiður\ndagmar\ndagmey\ndagný\ndagrún\ndaldís\ndaley\ndalía\ndalla\ndallilja\ndalrós\ndana\ndaney\ndanfríður\ndanheiður\ndanhildur\ndanía\ndaníela\ndaníella\ndara\ndaría\ndebora\ndebóra\ndendý\ndía\ndíana\ndíanna\ndidda\ndilja\ndiljá\ndíma\ndimma\ndimmblá\ndimmey\ndís\ndísa\ndísella\ndóa\ndómhildur\ndonna\ndóra\ndórey\ndoris\ndóris\ndórótea\ndorothea\ndórothea\ndóróthea\ndrauma\ndraumey\ndrífa\ndroplaug\ndrótt\ndröfn\ndúa\ndúfa\ndúna\ndúnna\ndýrborg\ndýrfinna\ndýrleif\ndýrley\ndýrunn\ndæja\ndögg\ndögun\r\nebba\nebonney\nedda\nedel\nedil\nedit\nedith\neðna\nefemía\negedía\neggrún\negla\neiðný\neiðunn\neik\neileiþía\neinbjörg\neindís\neiney\neinfríður\neinhildur\neinína\neinrún\neir\neirdís\neirfinna\neiríka\neirný\neirún\neivör\nelba\neldbjörg\neldey\neldlilja\neldrún\neldþóra\neleina\nelektra\nelena\nelenborg\nelfa\nelfur\nelía\nelíana\nelín\nelina\nelína\nelíná\nelínbet\nelínbjörg\nelínbjört\nelinborg\nelínborg\nelíndís\nelíngunnur\nelínheiður\nelínrós\nelírós\nelísa\nelísabet\nelisabeth\nelísabeth\nelíza\nelka\nella\nellen\nelley\nellisif\nellín\nelly\nellý\nelma\nelna\nelsa\nelsabet\nelsie\nelsí\nelsý\nelva\nelvi\nelvira\nelvíra\nelvý\nembla\nemelía\nemelíana\nemelína\nemeralda\nemilía\nemilíana\nemilíanna\nemilý\nemma\nemmý\nemý\nenea\neneka\nengilbjört\nengilráð\nengilrós\nengla\nenika\neníta\nenja\nenóla\neres\nerika\nerin\nerla\nerlen\nerlín\nerna\nesja\neskja\nesmeralda\nester\nesther\nestiva\nethel\netna\neufemía\neva\nevelyn\nevey\nevfemía\nevgenía\nevíta\nevlalía\ney\neybjörg\neybjört\neyborg\neydís\neyfríður\neygerður\neygló\neyhildur\neyja\neyjalín\neyleif\neylín\neyrós\neyrún\neyveig\neyvör\neyþóra\neyþrúður\r\nfanndís\nfanney\nfannlaug\nfanny\nfanný\nfebrún\nfema\nfía\nfídes\nfífa\nfilipía\nfilippa\nfilippía\nfinna\nfinnbjörg\nfinnbjörk\nfinnboga\nfinnborg\nfinndís\nfinney\nfinnfríður\nfinnlaug\nfinnrós\nfjalldís\nfjóla\nflóra\nfolda\nfrán\nfransiska\nfranziska\nfregn\nfreydís\nfreygerður\nfreyja\nfreylaug\nfreyleif\nfríða\nfriðbjörg\nfriðbjört\nfriðborg\nfriðdís\nfriðdóra\nfriðey\nfriðfinna\nfriðgerður\nfriðjóna\nfriðlaug\nfriðleif\nfriðlín\nfriðmey\nfriðný\nfriðrika\nfriðrikka\nfriðrós\nfriðrún\nfriðsemd\nfríður\nfriðveig\nfriðþóra\nfrigg\nfróðný\nfrostrós\nfura\nfönn\r\ngabríela\ngabríella\ngauja\ngauthildur\ngefjun\ngefn\ngeira\ngeirbjörg\ngeirdís\ngeirfinna\ngeirfríður\ngeirhildur\ngeirlaug\ngeirlöð\ngeirný\ngeirríður\ngeirrún\ngeirþrúður\ngeorgía\ngerða\ngerður\ngestheiður\ngestný\ngestrún\ngía\ngígja\ngillý\ngilslaug\ngísela\ngísla\ngísley\ngíslína\ngíslný\ngíslrún\ngíslunn\ngissunn\ngíta\ngjaflaug\ngló\nglóa\nglóbjört\nglóð\nglódís\nglóey\ngloría\ngná\ngóa\ngógó\ngrein\ngrélöð\ngret\ngrét\ngreta\ngréta\ngrethe\ngríma\ngrímey\ngrímheiður\ngrímhildur\ngróa\ngúa\nguðbjörg\nguðbjört\nguðborg\nguðdís\nguðfinna\nguðfríður\nguðjóna\nguðlaug\nguðleif\nguðlín\nguðmey\nguðmunda\nguðmundína\nguðný\nguðríður\nguðrún\nguðsteina\nguðveig\ngullbrá\ngullveig\ngullý\ngumma\ngunnbjörg\ngunnbjört\ngunnborg\ngunndís\ngunndóra\ngunnella\ngunnfinna\ngunnfríður\ngunnharða\ngunnheiður\ngunnhildur\ngunnjóna\ngunnlaug\ngunnleif\ngunnlöð\ngunnrún\ngunnur\ngunnveig\ngunnvör\ngunný\ngunnþóra\ngunnþórunn\ngurrý\ngyða\ngyðja\ngyðríður\ngytta\ngæfa\ngæflaug\r\nhadda\nhaddý\nhafbjörg\nhafborg\nhafdís\nhafey\nhafliða\nhaflína\nhafný\nhafrós\nhafrún\nhafsteina\nhafþóra\nhákonía\nhalla\nhallbera\nhallbjörg\nhallborg\nhalldís\nhalldóra\nhalley\nhallfríður\nhallgerður\nhallgunnur\nhallkatla\nhallný\nhallrún\nhallveig\nhallvör\nhanna\nhanney\nhansa\nhansína\nharpa\nhauður\nheba\nhebba\nhedda\nhedí\nheida\nheiða\nheiðbjörg\nheiðbjörk\nheiðbjört\nheiðbrá\nheiðdís\nheiðlaug\nheiðlóa\nheiðný\nheiðrós\nheiðrún\nheiður\nheiðveig\nhekla\nhelen\nhelena\nhelga\nhella\nhelma\nhendrikka\nhenný\nhenrietta\nhenrika\nhenríetta\nhera\nherbjörg\nherbjört\nherborg\nherdís\nherfríður\nhergerður\nherlaug\nhermína\nhersilía\nherta\nhertha\nhervör\nherþrúður\nhilda\nhildegard\nhildibjörg\nhildigerður\nhildigunnur\nhildiríður\nhildisif\nhildur\nhilma\nhiminbjörg\nhind\nhinrika\nhinrikka\nhjalta\nhjaltey\nhjálmdís\nhjálmey\nhjálmfríður\nhjálmgerður\nhjálmrós\nhjálmrún\nhjálmveig\nhjördís\nhjörfríður\nhjörleif\nhjörný\nhjörtfríður\nhlaðgerður\nhlédís\nhleiður\nhlíf\nhlín\nhlökk\nhólmbjörg\nhólmdís\nhólmfríður\nhrafna\nhrafnborg\nhrafndís\nhrafney\nhrafnfífa\nhrafngerður\nhrafnheiður\nhrafnhildur\nhrafnkatla\nhrafnlaug\nhrafntinna\nhraundís\nhrefna\nhreindís\nhróðný\nhrólfdís\nhrund\nhrönn\nhugbjörg\nhugbjört\nhugborg\nhugdís\nhugljúf\nhugrún\nhuld\nhulda\nhuldís\nhuldrún\nhúna\nhúnbjörg\nhúndís\nhúngerður\nhvönn\nhödd\nhögna\nhörn\r\nida\nída\nidda\niða\niðunn\nilmur\nilse\níma\nimmý\nina\nína\ninda\nindí\nindia\nindía\nindiana\nindíana\nindíra\nindra\ninga\ningdís\ningeborg\ninger\ningey\ningheiður\ninghildur\ningibjörg\ningibjört\ningiborg\ningifinna\ningifríður\ningigerður\ningilaug\ningileif\ningilín\ningimaría\ningimunda\ningiríður\ningirós\ningisól\ningiveig\ningrid\ningrún\ningunn\ningveldur\ninna\nír\níren\nirena\nírena\nirene\níris\nirja\nirma\nirmelín\nirmý\nirpa\nírunn\nisabel\nísabel\nisabella\nísabella\nísadóra\nísafold\nísalind\nísbjörg\nísdís\nísey\nísfold\nísgerður\níshildur\nísidóra\nísis\níslaug\nísleif\níslilja\nísmey\nísold\nísól\nísrún\níssól\nísveig\níunn\níva\r\njakobína\njana\njane\njanetta\njannika\njara\njarla\njárnbrá\njárngerður\njarún\njarþrúður\njasmín\njenetta\njenna\njenny\njenný\njensína\njessý\njóa\njóanna\njódís\njófríður\njóhanna\njólín\njóna\njónanna\njónasína\njónbjörg\njónbjört\njóndís\njóndóra\njóney\njónfríður\njóngerð\njónheiður\njónhildur\njónída\njónína\njóninna\njónný\njóný\njóra\njóríður\njórlaug\njórunn\njósebína\njósefín\njósefína\njovina\njúdea\njúdit\njudith\njúlía\njúlíana\njúlíanna\njúlíetta\njúlíhuld\njúlína\njúlírós\njúní\njúnía\njúníana\njökla\njökulrós\njörgína\r\nkaðlín\nkaja\nkala\nkalla\nkamí\nkamilla\nkamma\nkapitola\nkapítóla\nkara\nkára\nkaren\nkarí\nkarin\nkarín\nkarína\nkaritas\nkarítas\nkarla\nkarlína\nkarlinna\nkarlotta\nkarmen\nkaró\nkarol\nkarólín\nkarolína\nkarólína\nkarún\nkassandra\nkata\nkatarína\nkaterína\nkatharina\nkathinka\nkatinka\nkatla\nkatrín\nkatrína\nkatý\nkellý\nkendra\nketilbjörg\nketilfríður\nketilríður\nkiddý\nkira\nkirsten\nkirstín\nkittý\nkjalvör\nkládía\nklara\nklementína\nkleópatra\nkókó\nkolbjörg\nkolbrá\nkolbrún\nkoldís\nkolfinna\nkolfreyja\nkolgríma\nkolka\nkonkordía\nkonný\nkorka\nkormlöð\nkornelía\nkría\nkrista\nkristbjörg\nkristborg\nkristel\nkristensa\nkristey\nkristfríður\nkristgerður\nkristíana\nkristíanna\nkristin\nkristín\nkristína\nkristine\nkristjana\nkristjóna\nkristlaug\nkristlín\nkristlind\nkristný\nkristólína\nkristrós\nkristrún\nkristveig\nkristvina\nkristý\nkristþóra\nkrumma\nkæja\r\nlaila\nlaíla\nlana\nlara\nlára\nlárensína\nláretta\nlárey\nlaufey\nlaufheiður\nlaufhildur\nlauga\nlaugey\nlaugheiður\nlea\nleikný\nleila\nlena\nleóna\nleonóra\nleónóra\nlexí\nleyla\nlíba\nlíf\nlífdís\nlilja\nliljá\nliljurós\nlill\nlilla\nlillian\nlilly\nlillý\nlily\nlilý\nlílý\nlín\nlína\nlínbjörg\nlind\nlinda\nlinddís\nlíndís\nlíneik\nlíney\nlingný\nlínhildur\nlísa\nlísabet\nlísandra\nlísbet\nlisbeth\nlísebet\nlistalín\nliv\nlív\nljósbjörg\nljósbrá\nljótunn\nlóa\nlofn\nloftveig\nlogey\nlokbrá\nlóreley\nlotta\nlouisa\nlouise\nlovísa\nlúcía\nlúðvíka\nlúísa\nlukka\nlúna\nlúsinda\nlúsía\nlúvísa\nlydia\nlýdía\nlydía\nlyngheiður\nlýra\nlæla\r\nmábil\nmaddý\nmagda\nmagdalena\nmagðalena\nmagga\nmaggey\nmaggý\nmagna\nmagndís\nmagnea\nmagnes\nmagney\nmagnfríður\nmagnheiður\nmagnhildur\nmagnúsína\nmagný\nmagnþóra\nmaía\nmaídís\nmaísól\nmaj\nmaja\nmalen\nmalena\nmálfríður\nmálhildur\nmalía\nmalika\nmalín\nmalína\nmalla\nmálmfríður\nmánadís\nmanda\nmáney\nmanúela\nmanúella\nmara\nmára\nmardís\nmarela\nmarella\nmaren\nmarey\nmarfríður\nmargit\nmargot\nmargret\nmargrét\nmargrjet\nmargunnur\nmarheiður\nmarí\nmaria\nmaría\nmaríam\nmarían\nmaríana\nmaríanna\nmarie\nmarikó\nmarín\nmarína\nmarinella\nmarínella\nmaríon\nmarísa\nmarísól\nmarit\nmarít\nmaríuerla\nmarja\nmarkrún\nmarlaug\nmarlena\nmarlín\nmarlís\nmarólína\nmarsa\nmarselía\nmarselína\nmarsibil\nmarsilía\nmarsý\nmarzibil\nmarta\nmartha\nmartína\nmary\nmarý\nmathilda\nmatta\nmattea\nmatthea\nmatthía\nmattíana\nmatthilda\nmatthildur\nmattína\nmattý\nmaxima\nmeda\nmekkin\nmekkín\nmelinda\nmelissa\nmelkorka\nmelrós\nmessíana\nmetta\nmey\nmía\nmikaela\nmikaelína\nmikkalína\nmíla\nmilda\nmildríður\nmilla\nmillý\nmímósa\nminerva\nmínerva\nminna\nminney\nminný\nmíra\nmíranda\nmiriam\nmíríel\nmirja\nmirjam\nmirra\nmist\nmítra\nmjaðveig\nmjalldís\nmjallhvít\nmjöll\nmóa\nmódís\nmóeiður\nmóey\nmóheiður\nmona\nmóna\nmonika\nmónika\nmóníka\nmorgunsól\nmunda\nmundheiður\nmundhildur\nmundína\nmyrra\nmýr\nmýra\nmyrk\nmýrún\nmörk\r\nnáð\nnadia\nnadía\nnadja\nnana\nnanna\nnanný\nnansý\nnaomí\nnaómí\nnatalía\nnatalie\nnáttsól\nnella\nnellý\nnenna\nnicole\nniðbjörg\nnikíta\nnikoletta\nnikólína\nnína\nníní\nninja\nninna\nnjála\nnjóla\nnóa\nnóra\nnorma\nnótt\nnýbjörg\r\nobba\nóda\nodda\noddbjörg\noddfreyja\noddfríður\noddgerður\noddhildur\noddlaug\noddleif\noddný\noddrún\noddveig\noddvör\nóðný\nófelía\noktavía\noktóvía\nóla\nólafía\nólafína\nólavía\nolga\nólína\nolivia\nólivía\nollý\nólöf\nora\norka\normheiður\normhildur\nósa\nósk\nósklín\notkatla\notta\nótta\r\npála\npáldís\npáley\npálfríður\npálhanna\npálheiður\npálhildur\npálín\npálína\npálmey\npálmfríður\npálrún\npamela\nparís\npatricia\npatrisía\nperla\npeta\npetra\npetrea\npetrína\npétrína\npetronella\npetrónella\npetrós\npetrún\npétrún\npetrúnella\npía\npolly\npollý\npría\r\nráðhildur\nrafney\nrafnhildur\nragna\nragnbjörg\nragney\nragnfríður\nragnheiður\nragnhildur\nrakel\nramóna\nrán\nrandalín\nrandíður\nrandý\nranka\nrannva\nrannveig\nrea\nrebekka\nreginbjörg\nregína\nrein\nrenata\nreyn\nreyndís\nreynheiður\nreynhildur\nríkey\nrikka\nrín\nripley\nrita\nríta\nróberta\nróbjörg\nronja\nrorí\nrós\nrósa\nrósalía\nrósalind\nrósanna\nrósbjörg\nrósborg\nróselía\nrósey\nrósfríður\nróshildur\nrósinkara\nrósinkransa\nróska\nróslaug\nróslind\nróslinda\nróslín\nrósmary\nrósmarý\nrósmunda\nrósný\nroxanna\nrúbý\nrún\nrúna\nrúndís\nrúnhildur\nrunný\nrúrí\nrut\nruth\nröfn\nrögn\nröskva\r\nsabína\nsabrína\nsaga\nsalbjörg\nsaldís\nsalgerður\nsalín\nsalína\nsalka\nsalma\nsalný\nsalome\nsalóme\nsalvör\nsandra\nsanna\nsantía\nsara\nsarína\nsefanía\nselena\nselja\nselka\nselma\nsenía\nseptíma\nsera\nserena\nseselía\nsesilía\nsesselía\nsesselja\nsessilía\nsía\nsif\nsigdís\nsigdóra\nsigfríð\nsigfríður\nsigga\nsiggerður\nsigmunda\nsigna\nsignhildur\nsigný\nsigrid\nsigríður\nsigrún\nsigurást\nsigurásta\nsigurbára\nsigurbirna\nsigurbjörg\nsigurbjört\nsigurborg\nsigurdís\nsigurdóra\nsigurdríf\nsigurdrífa\nsigurða\nsigurey\nsigurfinna\nsigurfljóð\nsigurgeira\nsigurhanna\nsigurhelga\nsigurhildur\nsigurjóna\nsigurlaug\nsigurleif\nsigurlilja\nsigurlinn\nsigurlín\nsigurlína\nsigurmunda\nsigurnanna\nsigurósk\nsigurrós\nsigursteina\nsigurunn\nsigurveig\nsigurvina\nsigurþóra\nsigvalda\nsigyn\nsigþóra\nsigþrúður\nsilfa\nsilfá\nsilfrún\nsilja\nsilka\nsilla\nsilva\nsilvana\nsilvía\nsímona\nsímonía\nsirra\nsirrí\nsirrý\nsísí\nsíta\nsiv\nsivía\nsjana\nsjöfn\nskarpheiður\nskugga\nskúla\nskuld\nskúlína\nsnjáfríður\nsnjáka\nsnjófríður\nsnjólaug\nsnorra\nsnót\nsnæbjörg\nsnæbjört\nsnæborg\nsnæbrá\nsnædís\nsnæfríður\nsnælaug\nsnærós\nsnærún\nsoffía\nsofía\nsofie\nsól\nsóla\nsólbjörg\nsólbjört\nsólborg\nsólbrá\nsólbrún\nsóldís\nsóldögg\nsóley\nsólfríður\nsólgerður\nsólhildur\nsólín\nsólkatla\nsóllilja\nsólný\nsólrós\nsólrún\nsolveig\nsólveig\nsólvör\nsónata\nsonja\nsonný\nsophia\nsophie\nstasía\nstefana\nstefanía\nstefánný\nsteina\nsteinbjörg\nsteinborg\nsteindís\nsteindóra\nsteiney\nsteinfríður\nsteingerður\nsteinhildur\nsteinlaug\nsteinrós\nsteinrún\nsteinunn\nsteinvör\nsteinþóra\nstella\nstígheiður\nstígrún\nstína\nstjarna\nstjarney\nstyrgerður\nsúla\nsúlamít\nsumarlína\nsumarrós\nsunna\nsunnefa\nsunneva\nsunniva\nsunníva\nsusan\nsúsan\nsúsanna\nsvafa\nsvala\nsvalrún\nsvana\nsvanbjörg\nsvanbjört\nsvanborg\nsvandís\nsvaney\nsvanfríður\nsvanheiður\nsvanhildur\nsvanhvít\nsvanlaug\nsvanrós\nsvanþrúður\nsvava\nsvea\nsveina\nsveinbjörg\nsveinborg\nsveindís\nsveiney\nsveinfríður\nsveingerður\nsveinhildur\nsveinlaug\nsveinrós\nsveinrún\nsveinsína\nsveinveig\nsylgja\nsylva\nsylvia\nsylvía\nsæbjörg\nsæbjört\nsæborg\nsæbrá\nsædís\nsæfinna\nsæfríður\nsæhildur\nsæla\nsælaug\nsæmunda\nsæný\nsærós\nsærún\nsæsól\nsæunn\nsævör\nsölva\nsölvey\nsölvína\r\ntala\ntalía\ntamar\ntamara\ntanía\ntanja\ntanya\ntanya\ntara\ntea\nteitný\ntekla\ntelma\ntera\nteresa\nteresía\nthea\nthelma\ntheodóra\ntheódóra\ntheresa\ntía\ntíalilja\ntíbrá\ntína\ntindra\ntinna\ntirsa\ntóbý\ntodda\ntóka\ntorbjörg\ntorfey\ntorfheiður\ntorfhildur\ntóta\ntristana\ntrú\ntryggva\ntryggvína\ntýra\r\núa\nugla\núlfa\núlfdís\núlfey\núlfheiður\núlfhildur\núlfrún\núlla\nuna\núna\nundína\núndína\nunna\nunnbjörg\nunndís\nunnur\núranía\nurður\núrsúla\r\nvagna\nvagnbjörg\nvagnfríður\nvaka\nvala\nvalbjörg\nvalbjörk\nvalbjört\nvalborg\nvaldheiður\nvaldís\nvalentína\nvalería\nvaley\nvalfríður\nvalgerða\nvalgerður\nvalgý\nvalhildur\nvalka\nvalkyrja\nvallý\nvalný\nvalrós\nvalrún\nvalva\nvalý\nvalþrúður\nvanda\nvár\nvarða\nvébjörg\nvédís\nvégerður\nveig\nveiga\nvélaug\nvenný\nvenus\nvéný\nvera\nveronika\nverónika\nveróníka\nvetrarrós\nvibeka\nvíbekka\nvictoría\nviðja\nvíf\nvigdís\nvígdögg\nvíggunnur\nviglín\nvigný\nviktoria\nviktoría\nvilborg\nvildís\nvilfríður\nvilgerður\nvilhelmína\nvilla\nvillimey\nvilma\nvilný\nvinbjörg\nvinný\nvinsý\nvíóla\nvíóletta\nvirginía\nvísa\nvon\nvoney\nvordís\r\nýja\nylfa\nylfur\nylja\nylva\nýma\nynja\nýr\nyrja\nýrr\nyrsa\r\nþalía\nþeba\nþeódís\nþeódóra\nþingey\nþjóðbjörg\nþjóðhildur\nþoka\nþollý\nþóra\nþóranna\nþórarna\nþorbjörg\nþórbjörg\nþórða\nþórdís\nþórelfa\nþórelfur\nþórey\nþorfinna\nþórfríður\nþorgerður\nþorgríma\nþórgunna\nþórgunnur\nþórhalla\nþórhanna\nþórheiður\nþórhildur\nþorkatla\nþórkatla\nþorlaug\nþórlaug\nþorleif\nþórleif\nþórný\nþórodda\nþorsteina\nþórsteina\nþórsteinunn\nþorstína\nþórstína\nþórunn\nþórveig\nþórvör\nþrá\nþrúða\nþrúður\nþúfa\nþula\nþura\nþurí\nþuríður\nþurý\nþyri\nþyrí\nþyrnirós\nþöll\r\nægileif\næsa\næsgerður\nævör\r\nögmunda\nögn\nölrún\nölveig\nörbrún\nörk\nösp\r\naage\naaron\nabel\nabraham\naðalberg\naðalbergur\naðalbert\naðalbjörn\naðalborgar\naðalgeir\naðalmundur\naðalráður\naðalsteinn\naðalvíkingur\nadam\naddi\nadel\nadíel\nadólf\naðólf\nadrían\nadríel\nagnar\nagni\nágúst\náki\nalbert\naldar\nalex\nalexander\nalexíus\nálfar\nálfgeir\nálfgrímur\nalfons\nalfred\nalfreð\nálfur\nálfþór\nali\nallan\nalli\nalmar\nalrekur\nalvar\nalvin\namil\namír\namos\námundi\nanders\nandreas\nandré\nandrés\nandri\nanes\nanfinn\nangantýr\nangi\nannar\nannarr\nannas\nannel\nannes\nanthony\nanton\nantoníus\nantóníus\naran\nárbjartur\nárbjörn\nárelíus\narent\nares\nárgeir\nárgils\nari\narilíus\narinbjörn\naríel\naríus\nármann\narnald\narnaldur\narnar\narnberg\narnbergur\narnbjörn\narndór\narnes\narnfinnur\narnfreyr\narngarður\narngeir\narngils\narngrímur\nárni\narnkell\narnlaugur\narnleifur\narnljótur\narnmóður\narnmundur\narnoddur\narnold\narnór\narnsteinn\narnúlfur\narnviður\narnþór\naron\nársæll\narthur\narthúr\nartúr\nás\nasael\násberg\násbergur\násbjörn\násdór\násgautur\násgeir\násgils\násgrímur\nási\náskell\naskur\náslaugur\náslákur\násmar\násmundur\násólfur\naspar\násröður\nástbjörn\nástgeir\nástmar\nástmundur\nástráður\nástríkur\nástvald\nástvaldur\nástvar\nástvin\nástþór\násvaldur\násvarður\násþór\natlas\natli\nauðberg\nauðbergur\nauðbert\nauðbjörn\nauðgeir\nauðkell\nauðmundur\nauðólfur\nauðun\nauðunn\nauður\naustar\naustmann\naustmar\naustri\naxel\r\nbaldur\nbaldvin\nbaldwin\nbaltasar\nbambi\nbarði\nbarri\nbassi\nbastían\nbaugur\nbárður\nbeinir\nbeinteinn\nbeitir\nbekan\nbenedikt\nbenidikt\nbenjamín\nbenoný\nbenóní\nbenóný\nbent\nbenvý\nberent\nberg\nbergfinnur\nberghreinn\nbergjón\nbergmann\nbergmar\nbergmundur\nbergsteinn\nbergsveinn\nbergur\nbergvin\nbergþór\nbernhard\nbernharð\nbernharður\nberni\nbernódus\nbersi\nbertel\nbertram\nbessi\nbetúel\nbill\nbirgir\nbirkir\nbirnir\nbirtingur\nbirtir\nbjargar\nbjargmundur\nbjargþór\nbjarkan\nbjarkar\nbjarki\nbjarmar\nbjarmi\nbjarnar\nbjarnfinnur\nbjarnfreður\nbjarnharður\nbjarnhéðinn\nbjarni\nbjarnlaugur\nbjarnleifur\nbjarnólfur\nbjarnsteinn\nbjarnþór\nbjartmann\nbjartmar\nbjartur\nbjartþór\nbjólan\nbjólfur\nbjörgmundur\nbjörgólfur\nbjörgúlfur\nbjörgvin\nbjörn\nbjörnólfur\nblængur\nblær\nblævar\nboði\nbogi\nbolli\nborgar\nborgúlfur\nborgþór\nbóas\nbói\nbótólfur\nbragi\nbrandur\nbreki\nbresi\nbrestir\nbrimar\nbrimi\nbrími\nbrimir\nbrímir\nbrjánn\nbroddi\nbruno\nbryngeir\nbrynjar\nbrynjólfur\nbrynjúlfur\nbrynleifur\nbrynmar\nbrynsteinn\nbryntýr\nbrynþór\nburkni\nbúi\nbúri\nbæring\nbæringur\nbæron\nböðvar\nbörkur\r\ncarl\ncecil\ncesar\nchristian\nchristopher\ncýrus\ncæsar\r\ndaði\ndagbjartur\ndagfari\ndagfinnur\ndaggeir\ndagmann\ndagnýr\ndagur\ndagþór\ndalbert\ndalli\ndalmann\ndalmar\ndalvin\ndamjan\ndamon\ndan\ndanelíus\ndaniel\ndaníel\ndanival\ndaníval\ndante\ndaríus\ndarri\ndavíð\ndemus\ndeníel\ndennis\ndiðrik\ndíómedes\ndofri\ndolli\ndómald\ndómaldi\ndómaldur\ndominik\ndónald\ndónaldur\ndór\ndóri\ndósóþeus\ndraupnir\ndreki\ndrengur\ndufgus\ndufþakur\ndugfús\ndúi\ndúnn\ndvalinn\ndynþór\ndýri\ndýrmundur\r\nebbi\nebeneser\nebenezer\neberg\neddi\nedgar\nedilon\nedílon\nedvard\nedvin\nedward\neðvald\neðvar\neðvarð\nefraím\neggert\neggþór\negill\neiðar\neiður\neikar\neilífur\neinar\neinir\neinvarður\neinþór\neiríkur\neivin\nelberg\nelbert\neldar\neldgrímur\neldjárn\neldmar\neldon\neldór\neldur\nelentínus\nelfar\nelfráður\nelí\nelía\nelías\nelíeser\nelimar\nelímar\nelínbergur\nelínmundur\nelinór\nelínór\nelis\nelís\nellert\nelli\nelliði\nellís\nelmar\nelvar\nelvin\nelvis\nemanúel\nembrek\nemerald\nemil\nemmanúel\nengilbert\nengilbjartur\nengiljón\nengill\nenok\neric\nerik\nerlar\nerlendur\nerling\nerlingur\nermenrekur\nernestó\nernir\nernst\neron\nerpur\nesekíel\nesjar\nesra\nestefan\nevald\nevan\nevert\nevían\neyberg\neyjólfur\neylaugur\neyleifur\neymar\neymundur\neyríkur\neysteinn\neyvar\neyvindur\neyþór\r\nfabrisíus\nfáfnir\nfalgeir\nfálki\nfalur\nfannar\nfannberg\nfanngeir\nfelix\nfengur\nfenrir\nferdinand\nferdínand\nfertram\nfeykir\nfífill\nfilip\nfilippus\nfinn\nfinnbjörn\nfinnbogi\nfinngeir\nfinnjón\nfinnlaugur\nfinnur\nfinnvarður\nfjalar\nfjarki\nfjólar\nfjólmundur\nfjölnir\nfjölvar\nfjörnir\nflemming\nflóki\nflórent\nflosi\nflóvent\nfólki\nforni\nfossmar\nfrancis\nfrank\nfranklín\nfránn\nfrans\nfranz\nfrár\nfreybjörn\nfreygarður\nfreymar\nfreymóður\nfreymundur\nfreyr\nfreysteinn\nfreyviður\nfreyþór\nfriðberg\nfriðbergur\nfriðbert\nfriðbjörn\nfriðfinnur\nfriðgeir\nfriðjón\nfriðlaugur\nfriðleifur\nfriðmann\nfriðmar\nfriðmundur\nfriðrik\nfriðsteinn\nfríðsteinn\nfriður\nfriðvin\nfriðþjófur\nfriðþór\nfriedrich\nfrímann\nfritz\nfróði\nfróðmar\nfrosti\nfuni\nfúsi\nfylkir\r\ngabriel\ngabríel\ngael\ngaldur\ngamalíel\ngarðar\ngaribaldi\ngarpur\ngarri\ngaui\ngaukur\ngauti\ngautrekur\ngautur\ngautviður\ngeir\ngeirarður\ngeirfinnur\ngeirharður\ngeirhjörtur\ngeirhvatur\ngeiri\ngeirlaugur\ngeirleifur\ngeirmundur\ngeirólfur\ngeirröður\ngeirtryggur\ngeirvaldur\ngeirþjófur\ngeisli\ngellir\ngeorg\ngerald\ngerðar\ngeri\ngestur\ngígur\ngilbert\ngill\ngilmar\ngils\ngissur\ngizur\ngídeon\ngígjar\ngísli\ngjúki\nglói\nglúmur\ngneisti\ngnúpur\ngnýr\ngoði\ngóði\ngoðmundur\ngói\ngottskálk\ngottsveinn\ngrani\ngrankell\ngregor\ngreipur\ngreppur\ngretar\ngrettir\ngrétar\ngrímar\ngrímkell\ngrímlaugur\ngrímnir\ngrímólfur\ngrímur\ngrímúlfur\nguðberg\nguðbergur\nguðbjarni\nguðbjartur\nguðbjörn\nguðbrandur\nguðfinnur\nguðfreður\nguðgeir\nguðjón\nguðlaugur\nguðleifur\nguðleikur\nguðmann\nguðmar\nguðmon\nguðmundur\nguðni\nguðráður\nguðröður\nguðsteinn\nguðvarður\nguðveigur\nguðvin\nguðþór\ngulli\ngumi\ngunnar\ngunnberg\ngunnbjörn\ngunndór\ngunngeir\ngunnhallur\ngunnlaugur\ngunnleifur\ngunnólfur\ngunnóli\ngunnröður\ngunnsteinn\ngunnvaldur\ngunnþór\ngustav\ngutti\nguttormur\ngústaf\ngústav\ngýgjar\ngylfi\ngýmir\ngyrðir\r\nhaddi\nhaddur\nhafberg\nhafgrímur\nhafliði\nhafnar\nhafni\nhafsteinn\nhafþór\nhagalín\nhagbarður\nhagbert\nhaki\nhallberg\nhallbjörn\nhalldór\nhallfreður\nhallgarður\nhallgeir\nhallgils\nhallgrímur\nhallkell\nhallmann\nhallmar\nhallmundur\nhallsteinn\nhallur\nhallvarður\nhallþór\nhamar\nhannes\nhannibal\nhans\nharald\nharaldur\nharri\nharry\nharrý\nhartmann\nhartvig\nhauksteinn\nhaukur\nhaukvaldur\nhákon\nháleygur\nhálfdan\nhálfdán\nhámundur\nhárekur\nhárlaugur\nhásteinn\nhávar\nhávarður\nhávarr\nheiðar\nheiðarr\nheiðberg\nheiðbert\nheiðlindur\nheiðmann\nheiðmar\nheiðmundur\nheiðrekur\nheikir\nheilmóður\nheimir\nheinrekur\nheisi\nhektor\nhelgi\nhelmút\nhemmert\nhendrik\nhenning\nhenrik\nhenry\nhenrý\nherbert\nherbjörn\nherfinnur\nhergeir\nhergill\nhergils\nherjólfur\nherlaugur\nherleifur\nherluf\nhermann\nhermóður\nhermundur\nhersir\nhersteinn\nhersveinn\nhervar\nhervarður\nhervin\nhéðinn\nhilaríus\nhilbert\nhildar\nhildibergur\nhildibrandur\nhildigeir\nhildiglúmur\nhildimar\nhildimundur\nhildingur\nhildir\nhildiþór\nhilmar\nhilmir\nhimri\nhinrik\nhíram\nhjallkár\nhjalti\nhjarnar\nhjálmar\nhjálmgeir\nhjálmtýr\nhjálmur\nhjálmþór\nhjaltalín\nhjörleifur\nhjörtur\nhjörtþór\nhjörvar\nhleiðar\nhlégestur\nhlér\nhlini\nhlíðar\nhlíðberg\nhlífar\nhljómur\nhlynur\nhlöðmundur\nhlöður\nhlöðvarður\nhlöðver\nhnefill\nhnikar\nhnikarr\nholgeir\nholger\nholti\nhólm\nhólmar\nhólmbert\nhólmfastur\nhólmgeir\nhólmgrímur\nhólmkell\nhólmsteinn\nhólmþór\nhóseas\nhrafn\nhrafnar\nhrafnbergur\nhrafnkell\nhrafntýr\nhrannar\nhrappur\nhraunar\nhreggviður\nhreiðar\nhreiðmar\nhreimur\nhreinn\nhringur\nhrímnir\nhrollaugur\nhrolleifur\nhróaldur\nhróar\nhróbjartur\nhróðgeir\nhróðmar\nhróðólfur\nhróðvar\nhrói\nhrólfur\nhrómundur\nhrútur\nhrærekur\nhúbert\nhugberg\nhugi\nhuginn\nhugleikur\nhugo\nhugó\nhúgó\nhuldar\nhúmi\nhúnbogi\nhúni\nhúnn\nhúnröður\nhuxley\nhvannar\nhyltir\nhylur\nhængur\nhænir\nhöður\nhögni\nhörður\nhöskuldur\r\nían\nígor\nilías\nillugi\ními\nimmanúel\nindriði\ningberg\ningi\ningiberg\ningibergur\ningibert\ningibjartur\ningibjörn\ningileifur\ningimagn\ningimar\ningimundur\ningivaldur\ningiþór\ningjaldur\ningmar\ningólfur\ningvaldur\ningvar\ningvi\ningþór\nísak\nísar\nísarr\nísbjörn\níseldur\nísgeir\nísidór\nísleifur\nismael\nísmael\nísmar\nísólfur\nísrael\nissi\nívan\nívar\r\njack\njafet\njagger\njaki\njakob\njakop\njamil\njan\njanus\njarfi\njarl\njárngrímur\njason\njátgeir\njátmundur\njátvarður\njenni\njens\njeremías\njes\njesper\njóakim\njóann\njochum\njóel\njohan\njóhann\njóhannes\njohn\njói\njómar\njómundur\njón\njónar\njónas\njónatan\njónbjörn\njóndór\njóngeir\njónmundur\njónsteinn\njónþór\njósafat\njósavin\njósef\njoshua\njósep\njósteinn\njósúa\njóvin\njúlí\njulian\njúlían\njúlíus\njúní\njúníus\njúrek\njökull\njörfi\njörgen\njörmundur\njörri\njörundur\njörvar\njörvi\r\nkai\nkaj\nkakali\nkaktus\nkaldi\nkaleb\nkali\nkalman\nkalmann\nkalmar\nkamal\nkaprasíus\nkarel\nkarim\nkarkur\nkarl\nkarles\nkarli\nkarvel\nkaspar\nkasper\nkastíel\nkatarínus\nkató\nkár\nkári\nkeran\nketilbjörn\nketill\nkilían\nkiljan\nkjalar\nkjallakur\nkjaran\nkjartan\nkjarval\nkjárr\nkjói\nklemens\nklemenz\nklængur\nknútur\nknörr\nkoðrán\nkoggi\nkolbeinn\nkolbjörn\nkolfinnur\nkolgrímur\nkolmar\nkolskeggur\nkolur\nkolviður\nkonráð\nkonstantínus\nkópur\nkórekur\nkormákur\nkornelíus\nkort\nkraki\nkris\nkristall\nkristberg\nkristbergur\nkristbjörn\nkristdór\nkristens\nkrister\nkristfinnur\nkristgeir\nkristian\nkristinn\nkristján\nkristjón\nkristlaugur\nkristleifur\nkristmann\nkristmar\nkristmundur\nkristofer\nkristófer\nkristvaldur\nkristvarður\nkristvin\nkristþór\nkrummi\nkvasir\nkveldúlfur\r\nlambert\nlár\nlárent\nlárentíus\nlars\nlárus\nlaufar\nlaugi\nlauritz\nleiðólfur\nleif\nleifur\nleiknir\nleo\nleó\nleon\nleonard\nleonhard\nleópold\nlér\nleví\nlíam\nliljar\nlínberg\nlindar\nlindberg\nlíni\nljósálfur\nljótur\nljúfur\nloðmundur\nloftur\nlogi\nloki\nlórens\nlórenz\nlótus\nludvig\nlúðvíg\nlúðvík\nlúkas\nlundi\nlúter\nlúther\nlýður\nlyngar\nlýtingur\r\nmaggi\nmagngeir\nmagni\nmagnús\nmagnþór\nmakan\nmanfred\nmanfreð\nmáni\nmanúel\nmar\nmár\nmarbjörn\nmarel\nmargeir\nmargrímur\nmari\nmarijón\nmarinó\nmarías\nmarínó\nmarís\nmaríus\nmarjón\nmark\nmarkó\nmarkús\nmarkþór\nmaron\nmarri\nmars\nmarsellíus\nmarteinn\nmarten\nmarthen\nmartin\nmárus\nmarvin\nmarzilíus\nmathías\nmatthías\nmatti\nmattías\nmax\nmaximus\nmekkinó\nmelkíor\nmelkólmur\nmelrakki\nmensalder\nmerkúr\nmethúsalem\nmetúsalem\nmeyvant\nmías\nmichael\nmikael\nmikjáll\nmikkael\nmikkel\nmildinberg\nmímir\nmíó\nmír\nmjöllnir\nmjölnir\nmóði\nmói\nmoli\nmorgan\nmóri\nmórits\nmoritz\nmóses\nmosi\nmuggur\nmúli\nmuni\nmuninn\nmýrkjartan\nmyrkvi\nmörður\r\nnarfi\nnatan\nnatanael\nnataníel\nnathan\nnáttmörður\nnáttúlfur\nneisti\nnenni\nneptúnus\nnicolas\nníels\nnikanor\nnikolai\nnikolas\nnikulás\nnils\nníls\nnjáll\nnjörður\nnóam\nnóel\nnói\nnóni\nnonni\nnorbert\nnorðmann\nnóri\nnormann\nnóvember\nnúmi\nnývarð\nnökkvi\r\noddbergur\noddbjörn\noddfreyr\noddgeir\noddi\noddkell\noddleifur\noddmar\noddsteinn\noddur\noddvar\noddþór\nóðinn\nófeigur\noktavíus\noktó\noktóvíus\nolaf\nólaf\nólafur\nolav\nolgeir\nóli\noliver\nóliver\nólíver\nolivert\nómar\nómi\norfeus\normar\normur\norri\norvar\nóskar\nósvald\nósvaldur\nósvífur\notkell\notri\nóttar\nóttarr\notti\nottó\notur\r\nparmes\npatrek\npatrekur\npatrick\npatrik\npáll\npálmar\npálmi\npedró\nper\npeter\npétur\npjetur\npríor\r\nrafael\nrafn\nrafnar\nrafnkell\nragnar\nragúel\nrandver\nrannver\nrasmus\nráðgeir\nráðvarður\nrefur\nreginbaldur\nreginn\nreidar\nreifnir\nreimar\nreinar\nreinhart\nreinhold\nremek\nrex\nreykdal\nreynald\nreynar\nreynir\nreyr\nrichard\nríkarður\nrikharð\nríkharð\nrikharður\nríkharður\nríó\nrobert\nróbert\nrólant\nrolf\nróman\nrómeó\nronald\nrósant\nrósar\nrósberg\nrósenberg\nrósi\nrósinberg\nrósinkar\nrósinkrans\nrósmann\nrósmundur\nrúbar\nrúben\nrudolf\nrúdólf\nrúnar\nruni\nrunólfur\nrúrik\nrútur\nröðull\nrögnvald\nrögnvaldur\nrögnvar\nrökkvi\r\nsafír\nsakarías\nsalmann\nsalmar\nsalómon\nsalvar\nsamson\nsamúel\nsandel\nsandri\nsandur\nsaxi\nsebastian\nsebastían\nseifur\nseimur\nsesar\nsesil\nsigbergur\nsigbert\nsigbjartur\nsigbjörn\nsigdór\nsigfastur\nsigfinnur\nsigfreður\nsigfús\nsiggeir\nsighvatur\nsigjón\nsiglaugur\nsigmann\nsigmar\nsigmundur\nsignar\nsigri\nsigríkur\nsigsteinn\nsigtryggur\nsigtýr\nsigur\nsigurbaldur\nsigurberg\nsigurbergur\nsigurbjarni\nsigurbjartur\nsigurbjörn\nsigurbrandur\nsigurdór\nsigurður\nsigurfinnur\nsigurgeir\nsigurgestur\nsigurgísli\nsigurgrímur\nsigurhans\nsigurhjörtur\nsigurjón\nsigurkarl\nsigurlaugur\nsigurlás\nsigurleifur\nsigurliði\nsigurlinni\nsigurlogi\nsigurmann\nsigurmar\nsigurmon\nsigurmundur\nsigurnýas\nsigurnýjas\nsiguroddur\nsiguróli\nsigurpáll\nsigursteinn\nsigursveinn\nsigurvaldi\nsigurvin\nsigurþór\nsigurörn\nsigvaldi\nsigvarður\nsigþór\nsilli\nsímon\nsindri\nsírnir\nsírus\nsívar\nsjafnar\nskafti\nskapti\nskarphéðinn\nskefill\nskeggi\nskellir\nskíði\nskírnir\nskjöldur\nskorri\nskröggur\nskuggi\nskúli\nskúta\nskær\nskæringur\nsmári\nsmiður\nsmyrill\nsnjóki\nsnjólaugur\nsnjólfur\nsnorri\nsnæbjartur\nsnæbjörn\nsnæhólm\nsnælaugur\nsnær\nsnæringur\nsnævar\nsnævarr\nsnæþór\nsoffanías\nsophanías\nsophus\nsófónías\nsófus\nsókrates\nsólberg\nsólbergur\nsólbjartur\nsólbjörn\nsólimann\nsólmar\nsólmundur\nsólon\nsólver\nsólvin\nspartakus\nspói\nsporði\nstanley\nstapi\nstarkaður\nstarri\nstefan\nstefán\nstefnir\nsteinar\nsteinarr\nsteinberg\nsteinbergur\nsteinbjörn\nsteindór\nsteinfinnur\nsteingrímur\nsteini\nsteinkell\nsteinmann\nsteinmar\nsteinmóður\nsteinn\nsteinólfur\nsteinröður\nsteinvarður\nsteinþór\nstirnir\nstígur\nstormur\nstórólfur\nsturla\nsturlaugur\nsturri\nstyr\nstyrbjörn\nstyrkár\nstyrmir\nstyrr\nsumarliði\nsvafar\nsvali\nsvan\nsvanberg\nsvanbergur\nsvanbjörn\nsvangeir\nsvanhólm\nsvani\nsvanlaugur\nsvanmundur\nsvanur\nsvanþór\nsvavar\nsváfnir\nsveinar\nsveinberg\nsveinbjartur\nsveinbjörn\nsveinjón\nsveinlaugur\nsveinmar\nsveinn\nsveinungi\nsveinþór\nsvend\nsverre\nsverrir\nsvölnir\nsvörfuður\nsýrus\nsæberg\nsæbergur\nsæbjartur\nsæbjörn\nsæi\nsælaugur\nsæmann\nsæmi\nsæmundur\nsær\nsævald\nsævaldur\nsævar\nsævarr\nsævin\nsæþór\nsölmundur\nsölvar\nsölvi\nsören\nsörli\r\ntandri\ntarfur\nteitur\ntheodór\ntheódór\nthomas\nthor\nthorberg\nthór\ntíbor\ntindar\ntindri\ntindur\ntinni\ntími\ntímon\ntímoteus\ntímóteus\ntístran\ntjaldur\ntjörfi\ntjörvi\ntobías\ntóbías\ntói\ntóki\ntolli\ntómas\ntonni\ntór\ntorfi\ntrausti\ntristan\ntrostan\ntrúmann\ntryggvi\ntumas\ntumi\ntýr\ntyrfingur\r\nubbi\núddi\nuggi\núlfar\núlfgeir\núlfhéðinn\núlfkell\núlfljótur\núlftýr\núlfur\nulrich\núlrik\nuni\nunnar\nunnbjörn\nunndór\nunnsteinn\nunnþór\núranus\nurðar\nuxi\r\nvagn\nvakur\nvalberg\nvalbergur\nvalbjörn\nvalbrandur\nvaldemar\nvaldi\nvaldimar\nvaldór\nvalentín\nvalentínus\nvalgarð\nvalgarður\nvalgeir\nváli\nvalíant\nvallaður\nvalmar\nvalmundur\nvalsteinn\nvalter\nwalter\nvaltýr\nvalur\nvalves\nvalþór\nvápni\nvarmar\nvatnar\nvébjörn\nvégeir\nveigar\nveigur\nvékell\nvélaugur\nvémundur\nver\nvermundur\nwerner\nvernharð\nvernharður\nvestar\nvésteinn\nvestmar\nveturliði\nvictor\nviðar\nvíðar\nvíðir\nviðjar\nvífill\nvígberg\nvigfús\nviggó\nvíglundur\nvígmar\nvígmundur\nvignir\nvigri\nvígsteinn\nvigtýr\nvigur\nvígþór\nvikar\nvíkingur\nviktor\nvilberg\nvilbergur\nvilbert\nvilbjörn\nvilbogi\nvilbrandur\nvilgeir\nvilhelm\nwilhelm\nvilhjálmur\nvili\nviljar\nvilji\nwillard\nvilli\nwilliam\nwillum\nwilly\nvilmar\nvilmundur\nvincent\nvindar\nvinjar\nvirgill\nvopni\nvorm\nvöggur\nvölundur\nvörður\nvöttur\r\nylur\nymir\nýmir\nyngvar\nyngvi\nýrar\nyrkill\r\nzakaría\nzakarías\nzophanías\nzóphanías\nzophonías\nzóphonías\r\nþangbrandur\nþengill\nþeyr\nþiðrandi\nþiðrik\nþinur\nþjálfi\nþjóðann\nþjóðar\nþjóðbjörn\nþjóðgeir\nþjóðleifur\nþjóðmar\nþjóðólfur\nþjóðrekur\nþjóðvarður\nþjóstar\nþjóstólfur\nþór\nþórar\nþórarinn\nþorberg\nþorbergur\nþórbergur\nþórbjarni\nþorbjörn\nþórbjörn\nþorbrandur\nþórður\nþorfinnur\nþorgarður\nþorgautur\nþorgeir\nþorgestur\nþorgils\nþorgísl\nþorgnýr\nþórgnýr\nþorgrímur\nþórgrímur\nþórhaddur\nþórhalli\nþórhallur\nþóri\nþórinn\nþórir\nþorkell\nþorlákur\nþorlaugur\nþórlaugur\nþorleifur\nþórleifur\nþorleikur\nþórlindur\nþormar\nþórmar\nþormóður\nþormundur\nþórmundur\nþóroddur\nþórormur\nþórólfur\nþorri\nþorsteinn\nþórsteinn\nþorvaldur\nþorvar\nþorvarður\nþórörn\nþráinn\nþrándur\nþrastar\nþróttur\nþrúðmar\nþrymur\nþröstur\nþyrill\nþyrnir\r\nægir\næsir\nævar\nævarr\r\nögmundur\nögri\nölnir\nölver\nölvir\nöndólfur\nönundur\nörlaugur\nörlygur\nörn\nörnólfur\nörvar\nössur\nöxar".split("\n"));
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
		this.generator = new lycan_namegen_NameGenerator(data,this.order,this.prior);
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
		console.log(this.duplicateTrie.getWords());
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
var lycan_namegen_Generator = function(data,order,smoothing) {
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
		this.models.push(new lycan_namegen_Model(data.slice(),order - i1,smoothing,domain));
	}
};
lycan_namegen_Generator.__name__ = true;
lycan_namegen_Generator.prototype = {
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
var lycan_namegen_Model = function(data,order,smoothing,domain) {
	if(!(domain != null && data != null)) throw new js__$Boot_HaxeError("FAIL: domain != null && data != null");
	if(!(domain.length > 0 && data.length > 0)) throw new js__$Boot_HaxeError("FAIL: domain.length > 0 && data.length > 0");
	if(!(smoothing >= 0 && smoothing <= 1)) throw new js__$Boot_HaxeError("FAIL: smoothing >= 0 && smoothing <= 1");
	if(!(order > 0)) throw new js__$Boot_HaxeError("FAIL: order > 0");
	this.order = order;
	this.smoothing = smoothing;
	this.domain = domain;
	this.observations = new haxe_ds_StringMap();
	this.train(data);
	this.buildChains();
};
lycan_namegen_Model.__name__ = true;
lycan_namegen_Model.prototype = {
	retrain: function(data) {
		if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
		this.train(data);
		this.buildChains();
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
	,buildChains: function() {
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
var lycan_namegen_NameGenerator = function(data,order,smoothing) {
	lycan_namegen_Generator.call(this,data,order,smoothing);
};
lycan_namegen_NameGenerator.__name__ = true;
lycan_namegen_NameGenerator.__super__ = lycan_namegen_Generator;
lycan_namegen_NameGenerator.prototype = $extend(lycan_namegen_Generator.prototype,{
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
	this.root = new lycan_util_PrefixNode("",null);
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
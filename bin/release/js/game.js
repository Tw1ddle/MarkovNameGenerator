(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
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
var ID = function() { };
ID.__name__ = true;
var Main = function() {
	this.lastNames = [];
	this.trainingData = [];
	this.addTrainingData("us_forenames","American Forenames","aaron\nada\nadam\nadrian\nadrienne\nagnes\nalan\nalbert\nalberta\nalberto\nalex\nalexander\nalexandra\nalexis\nalfred\nalfredo\nalice\nalicia\nalison\nallan\nallen\nallison\nalma\nalvin\nalyssa\namanda\namber\namelia\namy\nana\nandre\nandrea\nandrew\nandy\nangel\nangel\nangela\nangelica\nangelina\nangie\nanita\nann\nanna\nanne\nannette\nannie\nanthony\nantoinette\nantonia\nantonio\napril\narlene\narmando\narnold\narthur\nashley\naudrey\nbarbara\nbarry\nbeatrice\nbecky\nbelinda\nben\nbenjamin\nbernadette\nbernard\nbernice\nbertha\nbessie\nbeth\nbethany\nbetsy\nbetty\nbeulah\nbeverly\nbill\nbillie\nbilly\nblanca\nblanche\nbob\nbobbie\nbobby\nbonnie\nbrad\nbradley\nbrandi\nbrandon\nbrandy\nbrenda\nbrent\nbrett\nbrian\nbridget\nbrittany\nbrooke\nbruce\nbryan\nbyron\ncalvin\ncamille\ncandace\ncandice\ncarl\ncarla\ncarlos\ncarmen\ncarol\ncarole\ncaroline\ncarolyn\ncarrie\ncasey\ncasey\ncassandra\ncatherine\ncathy\ncecelia\ncecil\ncecilia\ncelia\nchad\ncharlene\ncharles\ncharlie\ncharlotte\nchelsea\ncheryl\nchester\nchris\nchristian\nchristie\nchristina\nchristine\nchristopher\nchristy\ncindy\nclaire\nclara\nclarence\nclaude\nclaudia\nclayton\nclifford\nclifton\nclinton\nclyde\ncody\ncolleen\nconnie\nconstance\ncora\ncorey\ncory\ncourtney\ncraig\ncristina\ncrystal\ncurtis\ncynthia\ndaisy\ndale\ndan\ndana\ndaniel\ndanielle\ndanny\ndarla\ndarlene\ndarrell\ndarren\ndarryl\ndaryl\ndave\ndavid\ndawn\ndean\ndeanna\ndebbie\ndeborah\ndebra\ndelia\ndella\ndelores\ndenise\ndennis\nderek\nderrick\ndesiree\ndiana\ndiane\ndianna\ndianne\ndixie\ndolores\ndon\ndonald\ndonna\ndora\ndoreen\ndoris\ndorothy\ndouglas\nduane\ndustin\ndwayne\ndwight\nearl\nebony\neddie\nedgar\nedith\nedna\neduardo\nedward\nedwin\neileen\nelaine\neleanor\nelena\nelisa\nelizabeth\nella\nellen\nelmer\neloise\nelsa\nelsie\nelvira\nemily\nemma\nenrique\neric\nerica\nerik\nerika\nerin\nerma\nernest\nernestine\nessie\nestelle\nesther\nethel\neugene\neula\neunice\neva\nevelyn\neverett\nfaith\nfannie\nfaye\nfelicia\nfelix\nfernando\nflora\nflorence\nfloyd\nfrances\nfrancis\nfrancis\nfrancisco\nfrank\nfranklin\nfred\nfreda\nfreddie\nfrederick\ngabriel\ngail\ngary\ngayle\ngene\ngeneva\ngenevieve\ngeorge\ngeorgia\ngerald\ngeraldine\ngertrude\ngilbert\ngina\nginger\ngladys\nglen\nglenda\nglenn\ngloria\ngordon\ngrace\ngreg\ngregory\ngretchen\nguadalupe\nguy\ngwen\ngwendolyn\nhannah\nharold\nharriet\nharry\nharvey\nhattie\nhazel\nheather\nhector\nheidi\nhelen\nhenrietta\nhenry\nherbert\nherman\nhilda\nholly\nhope\nhoward\nhugh\nian\nida\ninez\nirene\niris\nirma\nisaac\nisabel\nivan\njack\njackie\njacob\njacqueline\njacquelyn\njaime\njaime\njames\njamie\njamie\njan\njana\njane\njanet\njanice\njanie\njanis\njared\njasmine\njason\njavier\njay\njean\njeanette\njeanne\njeannette\njeannie\njeff\njeffery\njeffrey\njenna\njennie\njennifer\njenny\njeremy\njerome\njerry\njesse\njessica\njessie\njessie\njesus\njill\njim\njimmie\njimmy\njo\njoan\njoann\njoanna\njoanne\njodi\njody\njoe\njoel\njohanna\njohn\njohnnie\njohnnie\njohnny\njon\njonathan\njordan\njorge\njose\njosefina\njoseph\njosephine\njoshua\njoy\njoyce\njuan\njuana\njuanita\njudith\njudy\njulia\njulian\njulie\njulio\njune\njustin\nkara\nkaren\nkari\nkarl\nkarla\nkate\nkatherine\nkathleen\nkathryn\nkathy\nkatie\nkatrina\nkay\nkayla\nkeith\nkelley\nkelli\nkellie\nkelly\nkelly\nken\nkendra\nkenneth\nkent\nkerry\nkevin\nkim\nkimberly\nkirk\nkrista\nkristen\nkristi\nkristie\nkristin\nkristina\nkristine\nkristy\nkrystal\nkurt\nkyle\nlana\nlance\nlarry\nlatoya\nlaura\nlauren\nlaurie\nlaverne\nlawrence\nleah\nlee\nlee\nleigh\nlela\nlena\nleo\nleon\nleona\nleonard\nleroy\nleslie\nleslie\nlester\nleticia\nlewis\nlila\nlillian\nlillie\nlinda\nlindsay\nlindsey\nlisa\nlloyd\nlois\nlola\nlonnie\nlora\nlorena\nlorene\nloretta\nlori\nlorraine\nlouis\nlouise\nlucia\nlucille\nlucy\nluis\nlula\nluz\nlydia\nlynda\nlynette\nlynn\nlynne\nmabel\nmable\nmadeline\nmae\nmaggie\nmamie\nmandy\nmanuel\nmarc\nmarcella\nmarcia\nmarcus\nmargaret\nmargarita\nmargie\nmarguerite\nmaria\nmarian\nmarianne\nmarie\nmarilyn\nmario\nmarion\nmarion\nmarjorie\nmark\nmarlene\nmarsha\nmarshall\nmarta\nmartha\nmartin\nmarvin\nmary\nmaryann\nmathew\nmatthew\nmattie\nmaureen\nmaurice\nmax\nmaxine\nmay\nmegan\nmeghan\nmelanie\nmelba\nmelinda\nmelissa\nmelody\nmelvin\nmercedes\nmeredith\nmichael\nmicheal\nmichele\nmichelle\nmiguel\nmike\nmildred\nmilton\nmindy\nminnie\nmiranda\nmiriam\nmisty\nmitchell\nmolly\nmona\nmonica\nmonique\nmorris\nmuriel\nmyra\nmyrtle\nnadine\nnancy\nnaomi\nnatalie\nnatasha\nnathan\nnathaniel\nneil\nnellie\nnelson\nnettie\nnicholas\nnichole\nnicole\nnina\nnora\nnorma\nnorman\nolga\nolive\nolivia\nollie\nopal\nora\noscar\npam\npamela\npat\npatricia\npatrick\npatsy\npatti\npatty\npaul\npaula\npaulette\npauline\npearl\npedro\npeggy\npenny\nperry\npeter\nphilip\nphillip\nphyllis\npriscilla\nrachael\nrachel\nrafael\nralph\nramon\nramona\nrandall\nrandy\nraquel\nraul\nray\nraymond\nrebecca\nregina\nreginald\nrene\nrenee\nrhonda\nricardo\nrichard\nrick\nricky\nrita\nrobert\nroberta\nroberto\nrobin\nrobyn\nrochelle\nrodney\nroger\nroland\nron\nronald\nronnie\nrosa\nrosalie\nrose\nrosemarie\nrosemary\nrosie\nross\nroxanne\nroy\nruben\nruby\nrussell\nruth\nryan\nsabrina\nsadie\nsally\nsalvador\nsam\nsamantha\nsamuel\nsandra\nsandy\nsara\nsarah\nscott\nsean\nsergio\nseth\nshane\nshannon\nshari\nsharon\nshawn\nshawna\nsheila\nshelia\nshelley\nshelly\nsheri\nsherri\nsherry\nsheryl\nshirley\nsidney\nsilvia\nsonia\nsonja\nsonya\nsophia\nsophie\nstacey\nstacy\nstanley\nstella\nstephanie\nstephen\nsteve\nsteven\nsue\nsusan\nsusie\nsuzanne\nsylvia\ntabitha\ntamara\ntami\ntammy\ntanya\ntara\ntasha\nted\nteresa\nteri\nterrance\nterrence\nterri\nterry\nterry\nthelma\ntheodore\ntheresa\nthomas\ntiffany\ntim\ntimothy\ntina\ntodd\ntom\ntommy\ntoni\ntony\ntonya\ntracey\ntraci\ntracy\ntracy\ntravis\ntricia\ntroy\ntyler\ntyrone\nvalerie\nvanessa\nvelma\nvera\nverna\nvernon\nveronica\nvicki\nvickie\nvicky\nvictor\nvictoria\nvincent\nviola\nviolet\nvirgil\nvirginia\nvivian\nwade\nwallace\nwalter\nwanda\nwarren\nwayne\nwendy\nwesley\nwhitney\nwillard\nwilliam\nwillie\nwillie\nwilma\nwinifred\nyolanda\nyvette\nyvonne\nzachary".split("\n"));
	this.addTrainingData("tolkienesque_forenames","Tolkienesque Forenames","abattârik\nadalgrim\nadanedhel\nadanel\nadrahil\nadûnakhôr\naegnor\naerin\nagarwaen\naikanáro\naiwendil\nalatar\nalatáriel\nalcarin\naldamir\naldarion\naldaron\naldor\nalfwine\namandil\namandil\namdír\namlaith\namras\namrod\namroth\namrothos\nanairë\nanardil\nanborn\nancalagon\nancalimon\nancalimë\nandrast\nandreth\nandróg\nanducal\nanfauglir\nangbor\nangrod\nannatar\nanárion\narador\naraglas\naragorn\naragost\narahad\narahael\naranarth\narantar\naranuir\naraphant\naraphor\narassuil\naratan\naratar\narathorn\naraval\naravir\naravorn\naredhel\nargeleb\nargon\nargonui\narien\naros\narthedain\narthedain\narvedui\narvegil\narveleg\narwen\nasfaloth\natanamir\natanatar\naulë\nausir\navranc\nazaghâl\nazog\nbaldor\nbalin\nbaragund\nbarahir\nbarahir\nbaran\nbard\nbarliman\nbauglir\nbelecthor\nbeleg\nbelegorn\nbelegund\nbelemir\nbelladonna\nbeorn\nbereg\nberegond\nberen\nbergil\nbert\nberylla\nberúthiel\nberúthiel\nbifur\nbofur\nboldog\nbolg\nbolger\nbombadil\nbombur\nborin\nboromir\nboron\nborondir\nbrand\nbrandir\nbrego\nbregolas\nbregor\nbrodda\nbrytta\nbucca\nbëor\nbór\ncalembel\ncalimehtar\ncalion\ncalmacil\ncalmacil\ncaranthir\ncarcharoth\ncastamir\nceleborn\ncelebrimbor\ncelebrindor\ncelebrían\ncelegorm\ncelepharn\ncemendur\nceorl\ncirion\nciryaher\nciryandil\nciryatan\nciryon\ncotton\ncurufin\ncurunír\ncírdan\ndaeron\ndenethor\ndernhelm\ndeórwine\ndior\ndori\ndorlas\ndraugluin\nduilin\ndurin\ndwalin\ndáin\ndéagol\ndéor\ndís\necthelion\negalmoth\neilinel\nelanor\nelbereth\neldacar\neldarion\nelemmakil\nelendil\nelendor\nelendur\nelenna\nelenwë\nelessar\nelfhelm\nelfhild\nelfwine\nelladan\nelmar\nelmo\nelrohir\nelrond\nelros\nelu\nelven\nelwing\nelwë\nemeldir\nemerië\nenel\nenelyë\neorl\neradan\nerendis\nerestor\nerkenbrand\nestel\nestelmo\nestë\neärendil\neärendur\neärnil\neärnur\neärwen\neöl\neönwë\nfalassion\nfaniel\nfaramir\nfastred\nfelaróf\nfengel\nferumbras\nfinarfin\nfindis\nfinduilas\nfinduilas\nfingolfin\nfingon\nfinrod\nfinvain\nfinwë\nfolcwine\nfortinbras\nfreca\nfrerin\nfréa\nfréaláf\nfréawine\nfrór\nfuinur\nfundin\nfëanor\nfíli\nfíriel\ngalador\ngaladriel\ngaldor\ngamil\ngamling\ngandalf\ngerontius\nghânburi\ngildor\ngilgalad\ngilrain\ngimilkhâd\ngimilzôr\ngimli\nginglith\ngirion\nglanhír\nglaurung\nglorfindel\nglóin\nglóredhel\ngoldberry\ngoldwine\ngolfimbul\ngollum\ngorbag\ngorlim\ngormadoc\ngorthaur\ngothmog\ngram\ngrimbold\ngrishnákh\ngríma\ngrór\ngwaihir\ngwathir\ngwindor\nhador\nhalbarad\nhaldad\nhaldan\nhaldar\nhaldir\nhaleth\nhallas\nhalmir\nhandir\nhardang\nhareth\nhelm\nherion\nherucalmo\nherumor\nherunúmen\nhirgon\nhiril\nhostamir\nhuan\nhundar\nhuor\nhyarmendacil\nháma\nhúrin\nibûn\nidril\nilmarë\nilúvatar\nilúvatar\nimbar\nimin\niminyë\nimrahil\nindis\ninglor\ningwë\ninziladûn\ninzilbêth\nirimë\nirmo\nisildur\nisilmo\nisilmë\nisumbras\nivriniel\nkhamûl\nkhîm\nking\nkíli\nkúvion\nlagduf\nlalaith\nlegolas\nlenwë\nlindir\nlobelia\nlotho\nlugdush\nlurtz\nléod\nlúthien\nmablung\nmaedhros\nmaeglin\nmaglor\nmagor\nmahtan\nmaiar\nmalach\nmallor\nmalvegil\nmanthor\nmanwë\nmarach\nmauhúr\nmeleth\nmelian\nmeneldil\nmeneldur\nmeriadoc\nminalcar\nminardil\nminastir\nminyatur\nmithrandir\nmorgoth\nmorwen\nmorwen\nmuzgash\nmírielar\nmírielserindë\nmîm\nnahar\nnarmacil\nnarvi\nnerdanel\nnessa\nnienna\nnienor\nnimloth\nnimrodel\nnori\nnáin\nnámo\nníniel\nnólimon\nnóm\nohtar\nolwë\nolórin\nondoher\nori\nornendil\norodreth\noromë\noropher\norophin\nossë\nostoher\npaladin\npalantir\npallando\npelendur\npengolodh\nperegrin\npervinca\npharazôn\nprimula\nradagast\nrían\nrómendacil\nrúmil\nsador\nsaeros\nsakalthôr\nsalgant\nsalmar\nsaruman\nsauron\nscatha\nshadowfax\nshagrat\nshelob\nsilmariën\nsingollo\nsiriondil\nsmaug\nsméagol\nsnowmane\nsoronto\nstrider\nsúrion\ntarannon\ntarcil\ntarondor\ntata\ntatië\ntelchar\ntelemmaitë\ntelemnar\ntelperiën\ntelumehtar\nthengel\nthingol\nthorin\nthorondir\nthorondor\nthranduil\nthráin\nthrór\nthéoden\nthéodred\nthéodwyn\ntilion\ntindomiel\ntinúviel\ntulkas\ntuor\nturambar\nturgon\ntúrin\nufthak\nuglúk\nuinen\nuldor\nulfang\nulfast\nulmo\nulwarth\numbardacil\nundómiel\nungoliant\nuolë\nurwen\nvairë\nvalacar\nvalandil\nvalandur\nvanimeldë\nvarda\nvardamir\nvidugavia\nvidumavi\nvinyarion\nvorondil\nvoronwë\nvoronwë\nvána\nwalda\nwormtongue\nyavanna\nyávien\nzimraphel\nzimraphel\nzimrathôn\néomer\néomund\néothain\néothéod\néowyn\nírildë\nóin".split("\n"));
	this.addTrainingData("werewolf_forenames","Werewolf Forenames","accalia\nadalwolf\nadalwolfa\nadolpha\nadolphus\namaguk\namarog\namoux\namwolf\nardolf\nardwolf\naudolf\nbardalph\nbardolf\nbeowulf\nbiryuk\nbleddyn\nbledig\nbleidd\nbodolf\nbotewolf\nbotolf\nbotwolf\ncana\ncanagan\nchann\nchanteloup\nconall\nconan\ncuan\ndolph\ndolphus\nethelwulf\neyolf\nfaolan\nfarkas\nfelan\nfenris\nfreki\nfridolf\nfriduwulf\ngeirolf\nguadalupe\ngunnolf\nhoniahaka\nhrolf\nhrolleif\ningolf\nivaylo\nlandga\nleidolf\nleloo\nlobo\nloup\nlowell\nlupe\nluperca\nlupo\nlupu\nlupus\nlyall\nlykaios\nmaccon\nmaengun\nmaheegan\nmahigan\nmaicoh\nmaiyun\nmakoce\nmingan\nmohegan\nnashoba\nnuntis\nodolf\nodwolfe\nolcan\nonai\nphelan\nradolf\nraff\nralph\nrand\nrandale\nrandall\nrandi\nrandolph\nranulfo\nraoul\nraul\nrendall\nreule\nrezso\nrodolfo\nrolf\nrudi\nrudolph\nsandalio\nseff\nshunkaha\nsingarti\nsirhaan\nsköll\nsusi\ntala\ntasha\ntate\ntchono\ntoralu\nudolf\nudolph\nujku\nulf\nulfred\nulger\nullok\nulmar\nulmer\nulric\nulvelaik\nuwais\nvarg\nvelvel\nvilkas\nvilks\nvuk\nvukasin\nweylyn\nwolfgang\nwolfram\nwolfrik\nwoolsey\nwulfgar\nylva".split("\n"));
	this.addTrainingData("romandeity_forenames","Roman Deity Forenames","abeona\nabudantia\nadeona\naequitas\naera\naeternitas\nafricus\nalemonia\nangerona\nangita\nanna\nantevorte\naphrodite\napollo\naquilo\nares\nartemis\nasclepius\nathena\nattis\naurora\nauster\nbacchus\nbellona\nbona\nbubona\ncamenaees\ncandelifera\ncardea\ncarmenta\ncarnea\nceres\ncinxia\nclementia\ncloacina\ncoelus\nconcordia\nconditor\nconsus\nconvector\ncopia\ncorus\ncunina\ncupid\ncybele\ndea\ndea\ndecima\ndemeter\ndevera\ndeverra\ndia\ndiana\ndis\ndisciplina\ndiscordia\ndius\negestes\nempanda\nendovelicus\neventus\nfabulinus\nfama\nfauna\nfaunus\nfaunus\nfaustitas\nfavonius\nfebris\nfelicitas\nferonia\nfides\nflora\nfontus\nfornax\nfortuna\nfulgora\nfuries\nfurina\nhephaestus\nhera\nhercules\nhermes\nhestia\nhonos\nindivia\nisis\njanus\njuno\njupiter\njuturna\njuventas\nlactans\nlares\nlaverna\nliber\nlibera\nliberalitas\nlibertas\nlibitina\nlima\nlucifer\nlucina\nluna\nmaia\nmaiesta\nmanes\nmania\nmars\nmatuta\nmeditrina\nmefitas\nmellona\nmena\nmenrva\nmens\nmercury\nmessor\nminerva\nmithras\nmoneta\nmors\nmorta\nmuta\nmutinus\nnaenia\nnecessitas\nnemestrinus\nneptune\nnona\nnox\nnundina\nobarator\noccator\nops\norbona\norcus\npales\nparcaes\npax\npenates\npicus\npietas\npoena\npomona\nportunes\nporus\nposeidon\npostverta\npotina\npriapus\nprorsa\nprovidentia\npudicitia\nputa\nquirinus\nquiritis\nrobigo\nrobigus\nroma\nrumina\nsalus\nsancus\nsaritor\nsaturn\nsecuritas\nsemonia\nserapis\nsilvanus\nsol\nsol\nsomnus\nsors\nspes\nstata\nstimula\nstrenua\nsuadela\nsubrincinator\nsummanus\ntellus\ntempestes\nterminus\nterra\ntrivia\nvacuna\nveiovis\nvenus\nveritas\nvertumnus\nvesta\nvictoria\nviduus\nviriplacaa\nvirtus\nvitumnus\nvolturnus\nvolumna\nvulcan\nvulturnus\nzeus".split("\n"));
	this.addTrainingData("norsedeity_forenames","Norse Deity Forenames","baduhenna\nbaldr\nbeyla\nbil\nbragi\nbrynhildr\ndellingr\neir\neir\nforseti\nfreyja\nfreyr\nfrigg\nfulla\ngefjun\ngeirahöð\ngeiravör\ngeirdriful\ngeirskögul\ngeirönul\ngersemi\ngerðr\ngná\ngullveig\ngunnr\nguðr\ngöll\ngöndul\nhariasa\nheimdallr\nherfjötur\nherja\nhermóðr\nhervör\nhildr\nhjalmþrimul\nhjörþrimul\nhlaðguðr\nhlín\nhlökk\nhnoss\nhretha\nhrist\nhrund\nhöðr\nhœnir\nilmr\nirpa\niðunn\nkára\nlofn\nloki\nlóðurr\nmeili\nmist\nmáni\nnanna\nnerthus\nnjörun\nnjörðr\nodin\nrandgríðr\nreginleif\nrindr\nrán\nráðgríðr\nróta\nsandraudiga\nsanngriðr\nsaxnōt\nsif\nsigrdrífa\nsigrún\nsigyn\nsinthgunt\nsjöfn\nskalmöld\nskaði\nskeggöld\nskuld\nskögul\nsnotra\nsveið\nsvipul\nsyn\nsága\nsól\ntanfana\nthor\ntýr\nullr\nvili\nviðarr\nváli\nvár\nvé\nvör\nzisa\nóðr\nölrún\nþorgerðr\nþrima\nþrúðr\nþrúðr\nþögn\nēostre".split("\n"));
	this.addTrainingData("swedish_forenames","Swedish Forenames","adam\nadrian\nagnes\nalbin\nalex\nalexander\nalfred\nali\nalice\nalicia\nalma\nalva\nalvin\namanda\namelia\nanna\nanton\naron\narvid\nastrid\naugust\naxel\nbenjamin\ncarl\ncasper\nceline\ncharlie\ncolin\ncornelia\ndaniel\ndante\ndavid\nebba\nebbe\neddie\nedith\nedvin\nedward\nelias\nelin\nelina\nelis\nelisa\nelise\nella\nellen\nellie\nellinor\nelliot\nelsa\nelton\nelvin\nelvira\nemelie\nemil\nemilia\nemma\nemmy\nerik\nester\nfelicia\nfelix\nfilip\nfilippa\nfrank\nfreja\ngabriel\ngreta\ngustav\nhampus\nhanna\nharry\nhedda\nhenry\nhilda\nhilma\nhjalmar\nhugo\nida\nines\ningrid\niris\nisabella\nisabelle\nisak\nivar\njack\njacob\njasmine\njoel\njohn\njoline\njonathan\njosef\njulia\njulian\njuni\nkevin\nklara\nleah\nleia\nleo\nleon\nliam\nlilly\nlinn\nlinnea\nlinus\nlisa\nliv\nlivia\nloke\nloui\nlova\nlove\nlovis\nlovisa\nlucas\nludvig\nluna\nlykke\nmaja\nmajken\nmalte\nmaria\nmatilda\nmatteo\nmax\nmaximilian\nmeja\nmelissa\nmelker\nmelvin\nmilo\nmilton\nminna\nmio\nmira\nmoa\nmohamed\nmolly\nmy\nmärta\nnathalie\nnellie\nneo\nnicole\nnils\nnoah\nnoel\nnora\nnova\nnovalie\noliver\nolivia\nolle\noscar\notto\nrasmus\nronja\nrut\nsaga\nsally\nsam\nsamuel\nsara\nsebastian\nselma\nsigge\nsigne\nsigrid\nsimon\nsiri\nsixten\nsofia\nstella\nstina\nsvante\nsvea\ntage\nthea\ntheo\ntheodor\ntilda\ntilde\ntindra\ntuva\ntyra\nvalter\nvera\nvictoria\nvidar\nviggo\nviktor\nvilgot\nville\nvincent\nwilhelm\nwilliam\nwilma\nwilmer".split("\n"));
	this.addTrainingData("english_towns","English Towns","abingdon\naccrington\nacle\nacton\nadlington\nalcester\naldeburgh\naldershot\nalford\nalfreton\nalnwick\nalsager\nalston\nalton\naltrincham\namble\nambleside\namersham\namesbury\nampthill\nandover\nappleby\narlesey\narundel\nashbourne\nashburton\nashby\nashford\nashington\nashton\naskern\naspatria\natherstone\nattleborough\naxbridge\naxminster\naylesbury\naylsham\nbacup\nbakewell\nbampton\nbanbury\nbarking\nbarnard\nbarnes\nbarnet\nbarnoldswick\nbarnsley\nbarnstaple\nbarrow\nbarton\nbasildon\nbasingstoke\nbatley\nbattle\nbawtry\nbeaconsfield\nbeaminster\nbebington\nbeccles\nbeckenham\nbedale\nbedford\nbedworth\nbelper\nbentham\nberkeley\nberkhamsted\nberwick\nbeverley\nbewdley\nbexhill\nbexley\nbicester\nbiddulph\nbideford\nbiggleswade\nbillericay\nbillingham\nbilston\nbingham\nbingley\nbirchwood\nbirkenhead\nbishop\nblackburn\nblackpool\nblackrod\nblackwater\nblandford\nbletchley\nblyth\nbodmin\nbognor\nbollington\nbolsover\nbolton\nbootle\nbordon\nboroughbridge\nboston\nbottesford\nbourne\nbournemouth\nbovey\nbrackley\nbracknell\nbradford\nbrading\nbradley\nbradninch\nbraintree\nbrampton\nbrandon\nbraunstone\nbrentford\nbrentwood\nbridgnorth\nbridgwater\nbridlington\nbridport\nbrierfield\nbrierley\nbrigg\nbrighouse\nbrightlingsea\nbrixham\nbroadstairs\nbromborough\nbromley\nbromsgrove\nbromyard\nbroseley\nbrough\nbroughton\nbruton\nbuckfastleigh\nbuckingham\nbude\nbudleigh\nbulwell\nbungay\nbuntingford\nburford\nburgess\nburgh\nburnham\nburnley\nburntwood\nburslem\nburton\nburton\nbury\nbury\nbushey\nbuxton\ncaistor\ncallington\ncalne\ncamborne\ncamelford\ncannock\ncanvey\ncarlton\ncarnforth\ncarshalton\ncarterton\ncastle\ncastleford\nchagford\nchapel\nchard\ncharlbury\nchatham\nchatteris\ncheadle\ncheltenham\nchertsey\nchesham\ncheshunt\nchester\nchesterfield\nchickerell\nchilton\nchingford\nchippenham\nchipping\nchipping\nchipping\nchorley\nchorleywood\nchristchurch\nchudleigh\nchulmleigh\nchurch\ncinderford\ncirencester\nclare\nclay\ncleator\ncleethorpes\ncleobury\nclevedon\nclitheroe\nclun\ncockermouth\ncoggeshall\ncolburn\ncolchester\ncoleford\ncoleshill\ncolne\ncolyton\ncongleton\nconisbrough\ncorbridge\ncorby\ncorringham\ncorsham\ncotgrave\ncoulsdon\ncowes\ncramlington\ncranbrook\ncraven\ncrawley\ncrediton\ncrewe\ncrewkerne\ncricklade\ncromer\ncrook\ncrosby\ncrowborough\ncrowland\ncrowle\ncroydon\ncullompton\ndagenham\ndalton\ndarley\ndarlington\ndartford\ndartmouth\ndarwen\ndaventry\ndawley\ndawlish\ndeal\ndenholme\ndereham\ndesborough\ndevizes\ndewsbury\ndidcot\ndinnington\ndiss\ndoncaster\ndorchester\ndorking\ndover\ndovercourt\ndownham\ndriffield\ndroitwich\ndronfield\ndudley\ndukinfield\ndulverton\ndunstable\ndunwich\ndursley\nealing\nearby\nearl\nearley\neasingwold\neast\neast\neast\neast\neastbourne\neastleigh\neastwood\neccles\neccleshall\nedenbridge\nedgware\nedmonton\negremont\nelland\nellesmere\nellesmere\nelstree\nemsworth\nenfield\nepping\nepworth\nerith\neton\nevesham\nexmouth\neye\nfairford\nfakenham\nfalmouth\nfareham\nfaringdon\nfarnham\nfaversham\nfazeley\nfeatherstone\nfelixstowe\nferndown\nferryhill\nfiley\nfilton\nfinchley\nfleet\nfleetwood\nflitwick\nfolkestone\nfordbridge\nfordingbridge\nfordwich\nfowey\nframlingham\nfrinton\nfrodsham\nfrome\ngainsborough\ngarstang\ngateshead\ngillingham\ngillingham\nglastonbury\nglossop\ngodalming\ngodmanchester\ngoole\ngorleston\ngosport\ngrange\ngrantham\ngrassington\ngravesend\ngrays\ngreat\ngreat\ngreat\ngreater\ngrimsby\nguildford\nguisborough\nhadleigh\nhailsham\nhalesowen\nhalesworth\nhalewood\nhalifax\nhalstead\nhaltwhistle\nharlow\nharpenden\nharrogate\nharrow\nhartland\nhartlepool\nharwich\nharworth\nhaslemere\nhaslingden\nhastings\nhatfield\nhatfield\nhatherleigh\nhavant\nhaverhill\nhawes\nhawkinge\nhaxby\nhayle\nhaywards\nheanor\nheathfield\nhebden\nhedge\nhednesford\nhedon\nhelmsley\nhelston\nhemel\nhemsworth\nhendon\nhenley\nhertford\nhessle\nhetton\nhexham\nheywood\nhigh\nhigham\nhighbridge\nhighworth\nhinckley\nhingham\nhitchin\nhoddesdon\nholbeach\nholsworthy\nholt\nhoniton\nhorley\nhorncastle\nhornsea\nhornsey\nhorsforth\nhorsham\nhorwich\nhoughton\nhounslow\nhowden\nhuddersfield\nhungerford\nhunstanton\nhuntingdon\nhyde\nhythe\nilford\nilfracombe\nilkeston\nilkley\nilminster\nimmingham\ningleby\nipswich\nirthlingborough\nivybridge\njarrow\nkeighley\nkempston\nkendal\nkenilworth\nkesgrave\nkeswick\nkettering\nkeynsham\nkidderminster\nkidsgrove\nkimberley\nkingsbridge\nkingsteignton\nkingston\nkington\nkirkby\nkirkbymoorside\nkirkham\nkirton\nknaresborough\nknutsford\nlangport\nlaunceston\nleatherhead\nlechlade\nledbury\nleek\nleigh\nleighton\nleiston\nleominster\nletchworth\nlewes\nleyburn\nleyton\nliskeard\nlittlehampton\nloddon\nloftus\nlong\nlongridge\nlongtown\nlooe\nlostwithiel\nloughborough\nloughton\nlouth\nlowestoft\nludgershall\nludlow\nluton\nlutterworth\nlydd\nlydney\nlyme\nlymington\nlynton\nlytchett\nlytham\nmablethorpe\nmacclesfield\nmadeley\nmaghull\nmaidenhead\nmaidstone\nmaldon\nmalmesbury\nmaltby\nmalton\nmalvern\nmanningtree\nmansfield\nmarazion\nmarch\nmargate\nmarlborough\nmarlow\nmaryport\nmasham\nmatlock\nmedlar\nmelksham\nmeltham\nmelton\nmere\nmexborough\nmiddleham\nmiddlesbrough\nmiddleton\nmiddlewich\nmidhurst\nmidsomer\nmildenhall\nmillom\nmilton\nminchinhampton\nminehead\nminster\nmirfield\nmitcham\nmitcheldean\nmodbury\nmorecambe\nmoreton\nmoretonhampstead\nmorley\nmorpeth\nmossley\nmuch\nnailsea\nnailsworth\nnantwich\nneedham\nnelson\nneston\nnewark\nnewbiggin\nnewbury\nnewcastle\nnewent\nnewhaven\nnewlyn\nnewmarket\nnewport\nnewquay\nnewton\nnormanton\nnorth\nnorthallerton\nnortham\nnorthampton\nnorthfleet\nnorthleach\nnorthwich\nnorton\nnuneaton\noakengates\noakham\nokehampton\noldbury\noldham\nollerton\nolney\nongar\norford\normskirk\nossett\noswestry\notley\nottery\noundle\npaddock\npadiham\npadstow\npaignton\npainswick\npartington\npatchway\npateley\npeacehaven\npenistone\npenkridge\npenrith\npenryn\npenwortham\npenzance\npershore\npeterlee\npetersfield\npetworth\npickering\nplympton\npocklington\npolegate\npontefract\nponteland\npoole\nporthleven\nportishead\nportland\npotton\npoynton\npreesall\nprescot\nprinces\nprudhoe\npudsey\nqueenborough\nradstock\nramsey\nramsgate\nraunds\nrawtenstall\nrayleigh\nreading\nredcar\nredditch\nredenhall\nredruth\nreepham\nreigate\nrichmond\nrichmond\nringwood\nripley\nrochdale\nrochester\nrochford\nromford\nromsey\nross\nrothbury\nrotherham\nrothwell\nrowley\nroyal\nroyston\nrugby\nrugeley\nrushden\nryde\nrye\nsaffron\nsalcombe\nsale\nsaltash\nsandbach\nsandhurst\nsandiacre\nsandown\nsandwich\nsandy\nsawbridgeworth\nsaxmundham\nscarborough\nscunthorpe\nseaford\nseaham\nseaton\nsedbergh\nsedgefield\nselby\nselsey\nsettle\nsevenoaks\nshaftesbury\nshanklin\nshefford\nshepshed\nshepton\nsherborne\nsheringham\nshifnal\nshildon\nshipston\nshirebrook\nshoreham\nshrewsbury\nsidmouth\nsilloth\nsilsden\nsittingbourne\nskegness\nskelmersdale\nskelton\nskipton\nsleaford\nslough\nsmethwick\nsnaith\nsnodland\nsoham\nsolihull\nsomerton\nsouthall\nsoutham\nsouthborough\nsouthend\nsouthgate\nsouthminster\nsouthport\nsouthsea\nsouthwell\nsouthwick\nsouthwold\nspalding\nspennymoor\nspilsby\nsprowston\nstafford\nstaines\nstainforth\nstalbridge\nstalham\nstalybridge\nstamford\nstanhope\nstanley\nstapleford\nstaveley\nstevenage\nsteyning\nstockport\nstocksbridge\nstockton\nstone\nstonehouse\nstony\nstotfold\nstourbridge\nstourport\nstow\nstowmarket\nstratford\nstretford\nstrood\nstroud\nsturminster\nsudbury\nsurbiton\nsutton\nsutton\nswaffham\nswanage\nswanley\nswanscombe\nswindon\nsyston\ntadcaster\ntadley\ntamworth\ntaunton\ntavistock\nteignmouth\ntelford\ntelscombe\ntenbury\ntenterden\ntetbury\ntewkesbury\nthame\nthatcham\nthaxted\nthetford\nthirsk\nthornaby\nthornbury\nthorne\nthorpe\nthrapston\ntickhill\ntidworth\ntipton\ntisbury\ntiverton\ntodmorden\ntonbridge\ntopsham\ntorpoint\ntorquay\ntotnes\ntottenham\ntotton\ntow\ntowcester\ntown\ntring\ntrowbridge\ntwickenham\ntynemouth\nuckfield\nulverston\nuppingham\nupton\nuttoxeter\nuxbridge\nventnor\nverwood\nwadebridge\nwadhurst\nwainfleet\nwallasey\nwallingford\nwallsend\nwalsall\nwaltham\nwaltham\nwalthamstow\nwalton\nwantage\nware\nwareham\nwarminster\nwarrington\nwarwick\nwashington\nwatchet\nwatford\nwath\nwatlington\nwatton\nwednesbury\nwellingborough\nwellington\nwells\nwelwyn\nwembley\nwendover\nwestbury\nwesterham\nwesthoughton\nweston\nwetherby\nweybridge\nweymouth\nwhaley\nwhitby\nwhitchurch\nwhitehaven\nwhitehill\nwhitnash\nwhittlesey\nwhitworth\nwickham\nwickwar\nwidnes\nwigan\nwigton\nwillenhall\nwillesden\nwilmslow\nwilton\nwimbledon\nwimborne\nwincanton\nwinchcombe\nwinchelsea\nwindermere\nwindsor\nwinsford\nwinslow\nwinterton\nwirksworth\nwisbech\nwitham\nwithernsea\nwitney\nwiveliscombe\nwivenhoe\nwoburn\nwoburn\nwoking\nwokingham\nwolsingham\nwolverton\nwood\nwoodbridge\nwoodley\nwoodstock\nwooler\nworkington\nworksop\nworthing\nwotton\nwragby\nwymondham\nyarm\nyarmouth\nyate\nyateley\nyeovil".split("\n"));
	this.addTrainingData("theological_demons","Theological Demons","abaddon\nabezethibou\nabraxas\nabyzou\nadramelech\naeshma\nagaliarept\nagares\nagiel\nagrat\nahriman\naim\naka\nala\nalal\nalastor\nallocer\nalloces\nallu\namaymon\namdusias\namy\nanamalech\nancitif\nandhaka\nandras\nandrealphus\nandromalius\nangra\nantichrist\nanzu\napollyon\narchon\narmaros\narunasura\nasag\nasakku\nasbel\nasmodai\nasmodeus\nastaroth\nasura\nazazel\nazi\nbaal\nbabi\nbael\nbakasura\nbalam\nbalberith\nbali\nbanshee\nbaphomet\nbarbas\nbarbatos\nbarong\nbathin\nbathym\nbeelzebub\nbehemoth\nbeherit\nbeleth\nbelial\nbelphegor\nberith\nbhūta\nbifrons\nboruta\nbotis\nbuer\nbukavac\nbune\nbushyasta\ncaacrinolaas\ncaassimolar\ncain\ncanio\ncerbere\ncharun\nchax\nchemosh\nchoronzon\ncimeies\ncimejes\nclassyalabolas\ncorson\ncrocell\nculsu\ndaeva\ndagon\ndajjal\ndanjal\ndantalion\ndavy\ndecarabia\ndemiurge\ndemogorgon\ndevil\ndrekavac\ndzoavits\neblis\neisheth\neligos\nflauros\nflavros\nfocalor\nforaii\nforas\nforcas\nforcas\nforneus\nfurcas\nfurfur\ngaap\ngaderel\ngaki\ngamigin\nghoul\nglasya\ngomory\ngorgon\ngremory\ngrigori\ngualichu\nguayota\ngusion\ngusoin\ngusoyn\nhaagenti\nhaborym\nhalphas\nhantu\nhauras\nhaures\nhavres\nifrit\nincubus\nipes\nipos\njikininki\njinn\nkabandha\nkabhanda\nkali\nkasadya\nkillakee\nkimaris\nkokabiel\nkrampus\nkroni\nkumbhakarna\nlechies\nlegion\nlempo\nleraie\nleraje\nleviathan\nleyak\nlili\nlilim\nlilin\nlilith\nlucifer\nlucifuge\nmalaphar\nmalephar\nmalphas\nmalthus\nmammon\nmara\nmarax\nmarchosias\nmaricha\nmarthim\nmasih\nmastema\nmathim\nmephistopheles\nmerihem\nmoloch\nmorax\nmorpheus\nmurmur\nnaamah\nnaberius\nnaberus\nnamtar\nninurta\nonoskelis\norcus\norias\noriax\nornias\norobas\nose\npaimon\npazuzu\npelesit\npenemue\nphenex\npithius\npocong\npontianak\nprocell\npruflas\npuloman\nrahab\nrakshasa\nrangda\nraum\nravan\nronove\nrusalka\nsabnock\nsaleos\nsamael\nsatan\nseir\nsemyaz\nshax\nshedim\nsitri\nsolas\nsthenno\nstolas\nsuanggi\nsuccubus\nsurgat\ntannin\ntoyol\ntuchulcha\nukobach\nvalac\nvalefar\nvanth\nvapula\nvassago\nvepar\nvine\nwendigo\nxaphan\nxezbeth\nyeqon\nyeterel\nzagan\nzepar\nziminiar\nördög".split("\n"));
	this.addTrainingData("scottish_surnames","Scottish Surnames","aileanach\nailpeanach\nallanach\nambarsan\nandarsan\nanndrasdan\narasgain\nbaran\nbarrach\nbeitean\nbhodhsa\nbhàsa\nblacach\nblàr\nblàrach\nbochanan\nboid\nbreac\nbreathnach\nbrothaigh\nbruis\nbrus\nbràigheach\nbrùn\nbuideach\nbuidheach\nbuids\nbuiseid\nbànach\nbòideach\ncailbhin\ncaileanach\ncaimbeul\ncaimbeulach\ncamran\ncamshron\ncamshronach\ncananach\ncanonach\ncaoidheach\ncaolaisdean\ncatach\ncatan\ncatanach\nceallach\nceanadach\nceannaideach\ncearrach\nceiteach\nciar\nciarach\nciogach\ncoineagan\ncrannach\ncreag\ncriatharach\ncuimeanach\ncuimein\ncuimeineach\ncàidh\ncèamp\ncèampach\ncòmhan\ndalais\ndeòir\ndeòireach\ndruimeanach\ndruimein\ndruimeineach\ndruiminn\ndubh\ndubhach\ndunaid\ndunaidh\ndòmhnallach\ndùbhghlas\ndùghallach\ndùghlas\ndùghlasach\neabarcrombaigh\nfearghasdan\nfionnlasdan\nflimean\nfoirbeis\nfoirbeiseach\nforsàidh\nfriseal\nfrisealach\nfòlais\ngall\ngallach\ngeadais\ngeadasach\ngearailteach\ngilios\ngillandrais\ngilleasbaig\ngilleasbuig\ngillechriosd\ngillechrìost\ngiobsan\nglas\ngobha\ngrannd\ngrannda\ngranndach\ngreum\ngreumach\ngriogal\ngriogalach\ngriogarach\nguaire\nguinne\ngunnach\ngutraidh\ngòrdan\ngòrdanach\nlatharnach\nlathurna\nleamhanach\nleamhnach\nleòideach\nlobhdain\nloganach\nloudain\nlìos\nlìosach\nlùtair\nmacabhra\nmacabhsalain\nmacadaidh\nmacadhaimh\nmacaididh\nmacailein\nmacailpein\nmacalasdair\nmacambrais\nmacamhalghaidh\nmacamhlaidh\nmacamhlaigh\nmacanndaidh\nmacanndra\nmacanndrais\nmacaodhagain\nmacaoidh\nmacaoidhein\nmacaomalain\nmacaonghais\nmacara\nmacartain\nmacartair\nmacasgaidh\nmacasgaill\nmacasgain\nmacbeatha\nmacbeathag\nmacbharrais\nmacbheatha\nmacbheathaig\nmacbheathain\nmacbhigein\nmacbhiocair\nmacbhlàthain\nmacbhradain\nmacbhraonaigh\nmacbhrìghdeinn\nmacbhàididh\nmacbhàtair\nmaccaibe\nmaccailein\nmaccain\nmaccaisgein\nmaccalmain\nmaccaluim\nmaccaog\nmaccaoig\nmaccardaidh\nmaccarmaig\nmaccathachaidh\nmaccathail\nmaccathain\nmaccathasaigh\nmaccathbhaidh\nmaccathbharra\nmacceallaig\nmacceallaigh\nmacceallair\nmaccearnaigh\nmaccearraich\nmacceasain\nmacchoinnich\nmaccianain\nmacciarain\nmaccinidh\nmacciomalain\nmaccionadha\nmacclambroch\nmaccnaimhin\nmaccnusachainn\nmaccodrum\nmaccoinnich\nmaccoinnigh\nmaccolla\nmaccomhainn\nmacconaill\nmacconnain\nmaccorcadail\nmaccormaig\nmaccosgraigh\nmaccrain\nmaccreamhain\nmaccriomain\nmaccrithein\nmaccrosain\nmaccruimein\nmaccrìsdein\nmaccròin\nmaccuaig\nmaccuidhein\nmaccuilcein\nmaccuinn\nmaccuinnleis\nmaccuirc\nmaccuithein\nmaccullach\nmaccullaich\nmaccumasgaigh\nmaccumhais\nmaccuthais\nmaccàba\nmaccòiseam\nmaccòmhain\nmaccòmhghan\nmaccùga\nmacdheòrsa\nmacdhiarmaid\nmacdhonnchaidh\nmacdhrostain\nmacdhubhaich\nmacdhubhaig\nmacdhubhshìth\nmacdhubhthaich\nmacdhuibh\nmacdhunlèibhe\nmacdhàibhidh\nmacdhòmhnaill\nmacdhùghaill\nmacdhùnshléibhe\nmacdiarmaid\nmaceachaidh\nmaceachainn\nmaceachairn\nmaceacharna\nmacealair\nmacealar\nmaceamailinn\nmaceanain\nmaceanraig\nmaceòghainn\nmacfhearchair\nmacfhearghail\nmacfhearghais\nmacfhilib\nmacfhiongain\nmacfhionghain\nmacfhionnlaigh\nmacfhitheachain\nmacfhlaithbheartaich\nmacfhraing\nmacfhraingein\nmacfigeinn\nmacfrìdeinn\nmacfuirigh\nmacgairbheith\nmacgaradh\nmacghearailt\nmacghille\nmacgille\nmacgilleain\nmacgillearnain\nmacgilleasbaig\nmacgilleathain\nmacgillebhreac\nmacgillebhràth\nmacgillebhrìghde\nmacgillebhàin\nmacgillechaluim\nmacgillechrìosd\nmacgilledhonaghart\nmacgilledhuibh\nmacgillefhialain\nmacgilleghlais\nmacgillemhartainn\nmacgilleriabhaich\nmacgilleseathanaich\nmacgilleòin\nmacgillfhaolagain\nmacgillfhiontag\nmacgilliosa\nmacgilloig\nmacgillonaidh\nmacgiobain\nmacglaisein\nmacgobhainn\nmacgoraidh\nmacgoraidh\nmacgriogair\nmacguaire\nmacgumaraid\nmaciain\nmacillanndrais\nmacillanndrais\nmacillaodhagain\nmacilldheòra\nmacille\nmacillearnain\nmacilleasbaig\nmacilleathain\nmacilleathainn\nmacillebheathain\nmacillebhlàthain\nmacillebhreac\nmacillebhris\nmacillebhràth\nmacillebhrìghde\nmacillebhuidh\nmacillebhuidhe\nmacillebhàin\nmacillebhàin\nmacillechaluim\nmacillechatain\nmacillechathbhaidh\nmacillechiar\nmacillechiar\nmacillechiarain\nmacillechomhghain\nmacillechonaill\nmacillechruim\nmacillechrìosd\nmacilledhonaghart\nmacilledhubhthaich\nmacilledhuibh\nmacilledhuibh\nmacilledhuinn\nmacilledhòmhnaich\nmacilleghlais\nmacilleghuinnein\nmacilleghuirm\nmacillemhaoil\nmacillemhearnaig\nmacillemhoire\nmacillemhàrtainn\nmacillemhìcheil\nmacillemhìcheil\nmacillemhòire\nmacillenaoimh\nmacillenaoimh\nmacillepheadair\nmacillephàdraig\nmacilleriabhaich\nmacilleriabhaich\nmacilleruaidh\nmacilleruaidh\nmacillesheathain\nmacillesheathanaich\nmacillesheathnaich\nmacillethòmhais\nmacilleòin\nmacillfhaolagain\nmacillfhaolain\nmacillfheargain\nmacillfhialain\nmacillfhinnein\nmacillfhinnein\nmacillfhinntain\nmacillfhionndaig\nmacillfhionndaig\nmacillfhionndain\nmacillianain\nmacilliomchadha\nmacilliosa\nmacilloig\nmacillonchon\nmacillonfhaidh\nmacillosa\nmacilluidhir\nmacilléidich\nmacillìmheir\nmacillìosa\nmaciomhair\nmacionmhainn\nmaciosaig\nmaclabhrainn\nmaclabhruinn\nmaclachlainn\nmaclagain\nmaclamraich\nmaclaomainn\nmaclathagain\nmacleòid\nmacleòir\nmaclianain\nmacliuthar\nmaclothaidh\nmaclughaidh\nmacluinge\nmacluirg\nmaclulaich\nmaclùcaidh\nmaclùcais\nmacmhaighstir\nmacmhanachain\nmacmhannain\nmacmhaoilein\nmacmhaoirn\nmacmhaolagain\nmacmhaolain\nmacmhaolbheatha\nmacmhaolchaluim\nmacmhaoldòmhnaich\nmacmhaolìosa\nmacmharais\nmacmharcais\nmacmhata\nmacmhatha\nmacmhathain\nmacmhiadhchain\nmacmhoirein\nmacmhorgain\nmacmhuircheartaich\nmacmhuirich\nmacmhunna\nmacmhurardaich\nmacmhurchaidh\nmacmhànais\nmacmhàrtainn\nmacmhèinn\nmacmhìcheil\nmacmhòrdha\nmacnaois\nmacnaomhain\nmacneacail\nmacneachdain\nmacneis\nmacnia\nmacniallghais\nmacniallghuis\nmacniocail\nmacnobaill\nmacnèill\nmacnìll\nmacphaid\nmacphaidein\nmacphail\nmacphairce\nmacpheadair\nmacpheadarain\nmacpheadrais\nmacpheidearain\nmacphilip\nmacphàdraig\nmacphàic\nmacphàidein\nmacphàil\nmacphàrlain\nmacphòil\nmacrabaidh\nmacraghnaill\nmacraibeirt\nmacraoimhin\nmacraoiridh\nmacraonaill\nmacrath\nmacriada\nmacriocaird\nmacrisnidh\nmacrob\nmacrobaidh\nmacroibeirt\nmacroithridh\nmacruairidh\nmacrusachainn\nmacràild\nmacrìdeinn\nmacrìgh\nmacshanndaidh\nmacshealbhaigh\nmacsheòrais\nmacsheòrsa\nmacshimidh\nmacshithich\nmacshitrig\nmacshomhairle\nmacshuibhne\nmacshìm\nmacsiridh\nmacsporain\nmacsuain\nmacsual\nmacthaidhg\nmactheàrlaich\nmacthom\nmacthomaidh\nmacthorcadail\nmacthorcaill\nmacthàmhais\nmacthòmais\nmactiridh\nmactuirc\nmacualraig\nmacuaraig\nmacuchtraigh\nmacuilleim\nmacuirigh\nmacuirigh\nmacuisdein\nmacurardaidh\nmacurardaigh\nmacurchadain\nmacurchaidh\nmacusbaig\nmacàidh\nmacùisdein\nmaoileanach\nmaoliosa\nmatasan\nmathanach\nmatharnach\nmawr\nmoireach\nmoireasdan\nmoireasdanach\nmorgan\nmorganach\nmunna\nmàrnach\nmàrr\nmàrtainn\nmèinn\nmèinnearach\nniocalsan\npadarsan\npaorach\npeadarsan\npeucag\npeutan\npreas\npuidreach\nrathais\nrobasan\nrobasdan\nroid\nroideach\nros\nrosach\nrothach\nruadh\nruiseal\nròs\nròsach\nsailcirc\nsalmond\nscottish\nscottish\nseadh\nseadhg\nseagha\nseaghach\nseathanach\nsginnearach\nsgot\nsgèin\nsingleir\nsiosal\nsiosalach\nsmios\nstiùbhart\nstiùbhartach\nsutharlainn\nsutharlan\nsuthurlanach\nsùdrach\ntalmhach\ntod\ntodt\ntolmach\ntuairnear\ntulach\ntàileach\ntàillear\nualas\numphraidh\nurchadainn\nurchardan\nìomharach".split("\n"));
	this.addTrainingData("irish_forenames","Irish Forenames","abbán\naffraic\nagaistín\naibhilín\naibhne\naifric\nailbhe\nailin\nailín\naindriú\naindréas\nainm\nainníleas\naislin\naisling\naislinn\naithche\nambrós\namhalgaidh\namhlaoibh\nanluan\nanmchadh\nanne\nantóin\naodh\naodhagán\naodhamair\naodhnait\naodhán\naogán\naoibhe\naoibheann\naoibhin\naoibhinn\naoife\naonghus\nardghal\nardghar\nart\nartúr\nathracht\naíbhinn\nbairre\nbaothghalach\nbarra\nbarrdhubh\nbasil\nbeacán\nbearach\nbearchán\nbearnárd\nbeinidict\nblanche\nblinne\nbláth\nbláthnaid\nbran\nbreandán\nbreanndán\nbreasal\nbrian\nbrighdín\nbrighid\nbrochadh\nbréanainn\nbríd\nbrídín\nbrónach\nbuadhach\nbuadhnait\nbébhinn\ncacht\ncailean\ncainneach\ncairbre\ncaitlín\ncaitrín\ncaitríona\ncalbhach\ncanice\ncaoilfhionn\ncaoimhe\ncaoimhghín\ncaoimhín\ncaolán\ncaomhán\ncarraig\ncathal\ncathaoir\ncathbharr\ncatraoine\nceallach\nceallachán\ncearbhall\ncharles\ncharles\ncharles\nciamhnait\ncian\nciannait\ncianán\nciara\nciarán\ncillian\ncinnéididh\ncinnéidigh\ncionaodh\nciothruadh\ncliodhna\nclodagh\nclíona\ncobhfhlaith\ncobhlaith\ncoilean\ncoileán\ncoilín\ncoinneach\ncoireall\ncolla\ncolm\ncolmán\ncolum\ncomhghall\ncomhghan\ncomán\nconaire\nconall\nconchobhar\nconchubhar\nconchúr\nconghalach\nconmhac\nconn\nconnla\nconnlaodh\nconán\ncormac\ncosnamhach\ncriomthann\ncríostóir\ncróchán\ncrónán\ncuan\ncuileán\ncuimín\ncyril\ncárthach\ncúchonnacht\ncúmhaighe\ncúmheadha\ndabhag\ndabhóg\ndainéal\ndaire\ndamhnait\ndamháin\ndaniel\ndara\ndavid\ndeaglán\ndearbhfhorgaill\ndearbhfhorghaill\ndearbhla\ndearbháil\ndeasmhumhnach\ndeclan\ndeirdre\ndenis\ndervilia\ndianaimh\ndiarmaid\ndiarmait\ndoireann\ndomhnall\ndonn\ndonnchadh\ndonnchadha\ndonnán\ndorothy\ndubhaltach\ndubhchobhlaigh\ndubhghall\ndubhghlas\ndubhán\ndubhóg\ndymphna\ndáithí\ndéaglán\ndónall\ndúnlang\neachaidh\neachann\neachdhonn\neachthighearn\neamon\nearcán\nearnait\nearnán\neasnadh\nedwina\neibhlín\neibhlín\neignach\neigneachán\neilín\neilís\neimear\neimer\neimhear\neireamhán\neireamhón\neirnín\neithne\neochaidh\neoghainín\neoghan\neoin\neóin\nfachtna\nfaoiltighearna\nfaolán\nfearadhach\nfearchar\nfearganainm\nfearghal\nfearghus\nfeargus\nfeary\nfeichín\nfeidhelm\nfeidhlim\nfelix\nfergus\nfiach\nfiacha\nfiachra\nfiadhnait\nfinghin\nfinian\nfinnian\nfintan\nfionghuine\nfionn\nfionnbharr\nfionnghuala\nfionntán\nfionnuala\nfitheal\nflann\nflann\nflannait\nflannán\nflora\nfodhla\nforbhlaith\nfroinsias\nfáilbhe\nféilim\nféthnaid\nféthnat\nfíneamhain\nfíona\ngarbhán\ngearóid\ngeiléis\nglaisne\ngobnait\ngormfhlaith\ngormlaith\ngrace\ngranya\ngreagoir\ngráinne\ngréagóir\nhonora\niarfhlaith\niarlaith\niodhnait\nirial\niósaf\nióseph\niúdás\njeremiah\njohn\nkyle\nlabhrás\nlachtna\nlann\nlaoighseach\nlaoiseach\nlasairfhíona\nlasairian\nlaurence\nlewis\nlewis\nliam\nlochlainn\nlochlann\nlomán\nlonán\nlorcán\nlubhrás\nlughaidh\nmaeleachlainn\nmaelsheachlainn\nmaelíosa\nmainchín\nmairghréad\nmairéad\nmaitiú\nmalachy\nmaodhóg\nmaoilir\nmaoilín\nmaolcholm\nmaolcholuim\nmaolmhuire\nmaolmórdha\nmaolruadháin\nmarion\nmathghamhain\nmeabh\nmeadhbh\nmealla\nmeaveen\nmeibhín\nmeidhbhín\nmiodhnait\nmortimer\nmuadhnait\nmuircheartach\nmuireach\nmuireadhach\nmuireann\nmuirgheal\nmuirgheas\nmuirinn\nmuiris\nmuirne\nmurchadh\nmáire\nmáirtín\nmáirín\nmícheál\nmíde\nmóirín\nmór\nnaomhán\nnaos\nneachtan\nneasán\nniall\nniallán\nniamh\nnioclás\nnuala\nnóirín\nnóra\nodharnait\nodhrán\noilibhéar\noireachtach\noisín\nonóra\noscar\npeadar\npeig\npeigi\npeigín\npilib\nproinsias\npádraig\npóil\npól\nraghnailt\nraibhilín\nrathnait\nriain\nristeárd\nristéard\nroger\nroibeard\nroibeárd\nroibhilín\nroibéard\nros\nruadhán\nruaidhri\nruairi\nruairí\nruari\nruaridh\nruarí\nruibhilín\nráichéal\nréamann\nréamonn\nríoghnach\nríona\nríonach\nróis\nróisín\nrónán\nrós\nsadhbh\nsaerbhreathach\nsaev\nsaoirse\nsaorfhlaith\nsaorla\nsaorlaith\nsarah\nseachnasach\nseathan\nsenán\nseoirse\nseosamh\nseán\nseárlas\nsiadhal\nsiaghal\nsinéad\nsiobhán\nsioda\nsláine\nsorcha\nstíofán\nsuibhne\nséadna\nséafra\nséamas\nséamus\nséan\nséaonin\nsíle\nsíomón\nsíthmaith\ntadhg\ntaichleach\nterry\ntiarnach\ntiarnán\ntiernan\ntighearnán\ntighernach\ntimothy\ntiobóid\ntoirdhealbhach\ntoirleach\ntomás\ntorna\ntreabhair\ntuathal\ntuathflaith\ntéodóir\nuaithne\nuaitéar\nualgharg\nuallach\nuasal\nuilliam\nuinseann\nultán\nvivian\nágastas\náilís\náine\nárdghal\nárón\néabha\néadaoin\néadbhárd\néamon\néanna\néanán\néibhear\néignach\néigneachán\néimhear\néimhín\néinde\néireamhón\némer\nétaín\níde\nórfhlaith\nórla\nórlaith\núna".split("\n"));
	this.addTrainingData("icelandic_forenames","Icelandic Forenames","aage\naagot\naaron\nabel\nabela\nabigael\nabraham\nada\nadam\nadda\naddi\naddú\naddý\nadel\nadela\nadelía\nadrían\nadríana\nadríel\nadíel\nadólf\nagata\nagatha\nagla\nagnar\nagnea\nagnes\nagneta\nagni\nagða\nakira\nalanta\nalba\nalbert\nalberta\nalbína\nalda\naldar\naldný\naldís\nalena\naleta\naletta\nalex\nalexa\nalexander\nalexandra\nalexandría\nalexis\nalexstrasa\nalexía\nalexíus\nalfa\nalfons\nalfred\nalfreð\nalfífa\nali\nalice\nalida\nalla\nallan\nalli\nallý\nalma\nalmar\nalrekur\nalrún\nalva\nalvar\nalvilda\nalvin\nalída\nalína\nalís\nalísa\namadea\namal\namalía\namanda\namelía\namil\namilía\namos\namy\namír\namíra\namý\nanalía\nanastasía\nanders\nandra\nandrea\nandreas\nandri\nandrá\nandré\nandrés\nandríana\nanes\nanetta\nanfinn\nangantýr\nangela\nangelía\nangelíka\nangi\nanika\nanita\nanja\nann\nanna\nannabella\nannalísa\nannar\nannarr\nannas\nanne\nannel\nannelí\nannes\nannetta\nanney\nannika\nannía\nanný\nanthony\nanton\nantonía\nantoníus\nantóníus\naníka\nanína\naníta\napríl\nara\naran\nardís\narent\nares\narey\nari\narilíus\narinbjörg\narinbjörn\naris\narisa\narja\narmenía\narna\narnald\narnaldur\narnar\narnberg\narnbergur\narnbjörg\narnbjörn\narnborg\narndís\narndór\narnes\narney\narnfinna\narnfinnur\narnfreyr\narnfríður\narngarður\narngeir\narngerður\narngils\narngrímur\narngunnur\narnheiður\narnhildur\narnika\narnkatla\narnkell\narnlaug\narnlaugur\narnleif\narnleifur\narnljót\narnljótur\narnlín\narnmundur\narnmóður\narnoddur\narnold\narnrós\narnrún\narnsteinn\narnviður\narnór\narnóra\narnúlfur\narnþrúður\narnþór\narnþóra\naron\narthur\narthúr\nartúr\naría\naríana\naríanna\naríaðna\naríel\naríela\naríella\narín\narína\narís\naríus\nasael\naskja\naskur\naspar\nassa\nastrid\nasía\nasírí\natalía\natena\nathena\natla\natlanta\natlas\natli\naurora\naustar\naustmann\naustmar\naustri\nauðberg\nauðbergur\nauðbert\nauðbjörg\nauðbjörn\nauðbjört\nauðdís\nauðgeir\nauðkell\nauðlín\nauðmundur\nauðna\nauðný\nauðrún\nauðun\nauðunn\nauður\nauður\nauðólfur\naxel\naxelma\naxelía\naðalberg\naðalbergur\naðalbert\naðalbjörg\naðalbjörn\naðalbjört\naðalborg\naðalborgar\naðaldís\naðalfríður\naðalgeir\naðalheiður\naðalmundur\naðalráður\naðalrós\naðalsteina\naðalsteinn\naðalsteinunn\naðalveig\naðalvíkingur\naðólf\naþena\nbaldey\nbaldrún\nbaldur\nbaldvin\nbaldvina\nbaldwin\nbaltasar\nbambi\nbarbara\nbarbára\nbarri\nbarði\nbassi\nbassí\nbastían\nbaugur\nbebba\nbegga\nbeinir\nbeinteinn\nbeitir\nbekan\nbelinda\nbella\nbenedikt\nbenedikta\nbengta\nbenidikt\nbenidikta\nbenjamín\nbenna\nbenney\nbenný\nbenoný\nbent\nbenta\nbentey\nbentína\nbenvý\nbenía\nbeníta\nbenóní\nbenóný\nbera\nberent\nberg\nbergdís\nbergey\nbergfinnur\nbergfríður\nbergheiður\nberghildur\nberghreinn\nbergjón\nberglaug\nberglind\nbergljót\nberglín\nbergmann\nbergmannía\nbergmar\nbergmundur\nbergný\nbergrán\nbergrín\nbergrós\nbergrún\nbergsteinn\nbergsveina\nbergsveinn\nbergur\nbergvin\nbergþór\nbergþóra\nberit\nbernhard\nbernharð\nbernharður\nberni\nbernódus\nbernódía\nbersi\nberta\nbertel\nbertha\nbertram\nbessi\nbessí\nbestla\nbeta\nbetanía\nbetsý\nbettý\nbetúel\nbil\nbill\nbirgir\nbirgit\nbirgitta\nbirkir\nbirna\nbirnir\nbirta\nbirtingur\nbirtir\nbirtna\nbjargar\nbjargdís\nbjargey\nbjargheiður\nbjarghildur\nbjarglind\nbjargmundur\nbjargþór\nbjarkan\nbjarkar\nbjarkey\nbjarki\nbjarklind\nbjarma\nbjarmar\nbjarmi\nbjarnar\nbjarndís\nbjarney\nbjarnfinnur\nbjarnfreður\nbjarnfríður\nbjarngerður\nbjarnharður\nbjarnheiður\nbjarnhildur\nbjarnhéðinn\nbjarni\nbjarnlaug\nbjarnlaugur\nbjarnleifur\nbjarnrún\nbjarnsteinn\nbjarnveig\nbjarnólfur\nbjarný\nbjarnþrúður\nbjarnþór\nbjarnþóra\nbjartey\nbjartmann\nbjartmar\nbjartmey\nbjartur\nbjartþór\nbjólan\nbjólfur\nbjörg\nbjörgey\nbjörgheiður\nbjörghildur\nbjörgmundur\nbjörgvin\nbjörgólfur\nbjörgúlfur\nbjörk\nbjörn\nbjörney\nbjörnfríður\nbjörnólfur\nbjört\nbláey\nbláklukka\nblædís\nblængur\nblær\nblær\nblævar\nblín\nblíða\nblómey\nbobba\nboga\nbogdís\nbogey\nbogga\nboghildur\nbogi\nbolli\nborg\nborgar\nborgdís\nborghildur\nborgný\nborgrún\nborgúlfur\nborgþór\nborgþóra\nbotnía\nboði\nbraga\nbraghildur\nbragi\nbranddís\nbrandur\nbrandís\nbreki\nbresi\nbrestir\nbriet\nbrigitta\nbrimar\nbrimdís\nbrimhildur\nbrimi\nbrimir\nbrimrún\nbrit\nbritt\nbritta\nbrjánn\nbroddi\nbruno\nbryndís\nbrynfríður\nbryngeir\nbryngerður\nbrynheiður\nbrynhildur\nbrynja\nbrynjar\nbrynjólfur\nbrynjúlfur\nbrynleifur\nbrynmar\nbrynný\nbrynsteinn\nbryntýr\nbrynþór\nbrá\nbrák\nbríana\nbríanna\nbríet\nbrími\nbrímir\nburkney\nburkni\nbylgja\nbára\nbárður\nbæring\nbæringur\nbæron\nbíbí\nbína\nbóas\nbóel\nbói\nbót\nbóthildur\nbótólfur\nbörkur\nböðvar\nbúi\nbúri\ncamilla\ncaritas\ncarl\ncarla\ncarmen\ncathinca\ncecil\ncecilia\ncecilía\ncesar\ncharlotta\ncharlotte\nchrista\nchristel\nchristian\nchristina\nchristine\nchristopher\nclara\ncæsar\ncýrus\ndagbjartur\ndagbjörg\ndagbjört\ndagfari\ndagfinnur\ndagfríður\ndaggeir\ndaggrós\ndagheiður\ndagmann\ndagmar\ndagmey\ndagný\ndagnýr\ndagrún\ndagur\ndagþór\ndalbert\ndaldís\ndaley\ndalla\ndalli\ndallilja\ndalmann\ndalmar\ndalrós\ndalvin\ndalía\ndamjan\ndamon\ndan\ndana\ndanelíus\ndaney\ndanfríður\ndanheiður\ndanhildur\ndaniel\ndanival\ndante\ndanía\ndaníel\ndaníela\ndaníella\ndaníval\ndara\ndarri\ndaría\ndaríus\ndavíð\ndaðey\ndaði\ndaðína\ndebora\ndebóra\ndemus\ndendý\ndennis\ndeníel\ndidda\ndilja\ndiljá\ndimma\ndimmblá\ndimmey\ndiðrik\ndofri\ndolli\ndominik\ndonna\ndoris\ndorothea\ndrauma\ndraumey\ndraupnir\ndreki\ndrengur\ndroplaug\ndrífa\ndrótt\ndröfn\ndufgus\ndufþakur\ndugfús\ndvalinn\ndynþór\ndæja\ndía\ndíana\ndíanna\ndíma\ndís\ndísa\ndísella\ndíómedes\ndóa\ndómald\ndómaldi\ndómaldur\ndómhildur\ndónald\ndónaldur\ndór\ndóra\ndórey\ndóri\ndóris\ndórothea\ndórótea\ndóróthea\ndósóþeus\ndögg\ndögun\ndúa\ndúfa\ndúi\ndúna\ndúnn\ndúnna\ndýrborg\ndýrfinna\ndýri\ndýrleif\ndýrley\ndýrmundur\ndýrunn\nebba\nebbi\nebeneser\nebenezer\neberg\nebonney\nedda\neddi\nedel\nedgar\nedil\nedilon\nedit\nedith\nedvard\nedvin\nedward\nedílon\nefemía\nefraím\negedía\neggert\neggrún\neggþór\negill\negla\neik\neikar\neileiþía\neilífur\neinar\neinbjörg\neindís\neiney\neinfríður\neinhildur\neinir\neinrún\neinvarður\neinína\neinþór\neir\neirdís\neirfinna\neirný\neiríka\neiríkur\neirún\neivin\neivör\neiðar\neiðný\neiðunn\neiður\nelba\nelberg\nelbert\neldar\neldbjörg\neldey\neldgrímur\neldjárn\neldlilja\neldmar\neldon\neldrún\neldur\neldór\neldþóra\neleina\nelektra\nelena\nelenborg\nelentínus\nelfa\nelfar\nelfráður\nelfur\nelimar\nelina\nelinborg\nelinór\nelis\nelisabeth\nelka\nella\nellen\nellert\nelley\nelli\nellisif\nelliði\nelly\nellín\nellís\nellý\nelma\nelmar\nelna\nelsa\nelsabet\nelsie\nelsí\nelsý\nelva\nelvar\nelvi\nelvin\nelvira\nelvis\nelvíra\nelvý\nelí\nelía\nelía\nelíana\nelías\nelíeser\nelímar\nelín\nelína\nelínbergur\nelínbet\nelínbjörg\nelínbjört\nelínborg\nelíndís\nelíngunnur\nelínheiður\nelínmundur\nelínrós\nelíná\nelínór\nelírós\nelís\nelísa\nelísabet\nelísabeth\nelíza\nemanúel\nembla\nembrek\nemelía\nemelíana\nemelína\nemerald\nemeralda\nemil\nemilía\nemilíana\nemilíanna\nemilý\nemma\nemmanúel\nemmý\nemý\nenea\neneka\nengilbert\nengilbjartur\nengilbjört\nengiljón\nengill\nengilráð\nengilrós\nengla\nenika\nenja\nenok\neníta\nenóla\neres\neric\nerik\nerika\nerin\nerla\nerlar\nerlen\nerlendur\nerling\nerlingur\nerlín\nermenrekur\nerna\nernestó\nernir\nernst\neron\nerpur\nesekíel\nesja\nesjar\neskja\nesmeralda\nesra\nestefan\nester\nesther\nestiva\nethel\netna\neufemía\neva\nevald\nevan\nevelyn\nevert\nevey\nevfemía\nevgenía\nevlalía\nevían\nevíta\ney\neyberg\neybjörg\neybjört\neyborg\neydís\neyfríður\neygerður\neygló\neyhildur\neyja\neyjalín\neyjólfur\neylaugur\neyleif\neyleifur\neylín\neymar\neymundur\neyríkur\neyrós\neyrún\neysteinn\neyvar\neyveig\neyvindur\neyvör\neyþrúður\neyþór\neyþóra\neðna\neðvald\neðvar\neðvarð\nfabrisíus\nfalgeir\nfalur\nfannar\nfannberg\nfanndís\nfanney\nfanngeir\nfannlaug\nfanny\nfanný\nfebrún\nfelix\nfema\nfengur\nfenrir\nferdinand\nferdínand\nfertram\nfeykir\nfilip\nfilippa\nfilippus\nfilippía\nfilipía\nfinn\nfinna\nfinnbjörg\nfinnbjörk\nfinnbjörn\nfinnboga\nfinnbogi\nfinnborg\nfinndís\nfinney\nfinnfríður\nfinngeir\nfinnjón\nfinnlaug\nfinnlaugur\nfinnrós\nfinnur\nfinnvarður\nfjalar\nfjalldís\nfjarki\nfjóla\nfjólar\nfjólmundur\nfjölnir\nfjölvar\nfjörnir\nflemming\nflosi\nflóki\nflóra\nflórent\nflóvent\nfolda\nforni\nfossmar\nfrancis\nfrank\nfranklín\nfrans\nfransiska\nfranz\nfranziska\nfregn\nfreybjörn\nfreydís\nfreygarður\nfreygerður\nfreyja\nfreylaug\nfreyleif\nfreymar\nfreymundur\nfreymóður\nfreyr\nfreysteinn\nfreyviður\nfreyþór\nfriedrich\nfrigg\nfritz\nfriðberg\nfriðbergur\nfriðbert\nfriðbjörg\nfriðbjörn\nfriðbjört\nfriðborg\nfriðdís\nfriðdóra\nfriðey\nfriðfinna\nfriðfinnur\nfriðgeir\nfriðgerður\nfriðjón\nfriðjóna\nfriðlaug\nfriðlaugur\nfriðleif\nfriðleifur\nfriðlín\nfriðmann\nfriðmar\nfriðmey\nfriðmundur\nfriðný\nfriðrik\nfriðrika\nfriðrikka\nfriðrós\nfriðrún\nfriðsemd\nfriðsteinn\nfriður\nfriðveig\nfriðvin\nfriðþjófur\nfriðþór\nfriðþóra\nfrosti\nfrostrós\nfrán\nfránn\nfrár\nfrímann\nfríða\nfríðsteinn\nfríður\nfróði\nfróðmar\nfróðný\nfuni\nfura\nfylkir\nfáfnir\nfálki\nfía\nfídes\nfífa\nfífill\nfólki\nfönn\nfúsi\ngabriel\ngabríel\ngabríela\ngabríella\ngael\ngaldur\ngamalíel\ngaribaldi\ngarpur\ngarri\ngarðar\ngaui\ngauja\ngaukur\ngauthildur\ngauti\ngautrekur\ngautur\ngautviður\ngefjun\ngefn\ngeir\ngeira\ngeirarður\ngeirbjörg\ngeirdís\ngeirfinna\ngeirfinnur\ngeirfríður\ngeirharður\ngeirhildur\ngeirhjörtur\ngeirhvatur\ngeiri\ngeirlaug\ngeirlaugur\ngeirleifur\ngeirlöð\ngeirmundur\ngeirný\ngeirríður\ngeirröður\ngeirrún\ngeirtryggur\ngeirvaldur\ngeirólfur\ngeirþjófur\ngeirþrúður\ngeisli\ngellir\ngeorg\ngeorgía\ngerald\ngeri\ngerða\ngerðar\ngerður\ngestheiður\ngestný\ngestrún\ngestur\ngilbert\ngill\ngillý\ngilmar\ngils\ngilslaug\ngissunn\ngissur\ngizur\ngjaflaug\ngjúki\ngloría\ngló\nglóa\nglóbjört\nglódís\nglóey\nglói\nglóð\nglúmur\ngneisti\ngná\ngnúpur\ngnýr\ngottskálk\ngottsveinn\ngoði\ngoðmundur\ngrani\ngrankell\ngregor\ngrein\ngreipur\ngreppur\ngret\ngreta\ngretar\ngrethe\ngrettir\ngrélöð\ngrét\ngréta\ngrétar\ngríma\ngrímar\ngrímey\ngrímheiður\ngrímhildur\ngrímkell\ngrímlaugur\ngrímnir\ngrímur\ngrímólfur\ngrímúlfur\ngróa\ngullbrá\ngulli\ngullveig\ngullý\ngumi\ngumma\ngunnar\ngunnberg\ngunnbjörg\ngunnbjörn\ngunnbjört\ngunnborg\ngunndís\ngunndór\ngunndóra\ngunnella\ngunnfinna\ngunnfríður\ngunngeir\ngunnhallur\ngunnharða\ngunnheiður\ngunnhildur\ngunnjóna\ngunnlaug\ngunnlaugur\ngunnleif\ngunnleifur\ngunnlöð\ngunnröður\ngunnrún\ngunnsteinn\ngunnur\ngunnvaldur\ngunnveig\ngunnvör\ngunnólfur\ngunnóli\ngunný\ngunnþór\ngunnþóra\ngunnþórunn\ngurrý\ngustav\ngutti\nguttormur\nguðberg\nguðbergur\nguðbjarni\nguðbjartur\nguðbjörg\nguðbjörn\nguðbjört\nguðborg\nguðbrandur\nguðdís\nguðfinna\nguðfinnur\nguðfreður\nguðfríður\nguðgeir\nguðjón\nguðjóna\nguðlaug\nguðlaugur\nguðleif\nguðleifur\nguðleikur\nguðlín\nguðmann\nguðmar\nguðmey\nguðmon\nguðmunda\nguðmundur\nguðmundína\nguðni\nguðný\nguðráður\nguðríður\nguðröður\nguðrún\nguðsteina\nguðsteinn\nguðvarður\nguðveig\nguðveigur\nguðvin\nguðþór\ngylfi\ngyrðir\ngytta\ngyða\ngyðja\ngyðríður\ngæfa\ngæflaug\ngía\ngídeon\ngígja\ngígjar\ngígur\ngísela\ngísla\ngísley\ngísli\ngíslný\ngíslrún\ngíslunn\ngíslína\ngíta\ngóa\ngógó\ngói\ngóði\ngúa\ngústaf\ngústav\ngýgjar\ngýmir\nhadda\nhaddi\nhaddur\nhaddý\nhafberg\nhafbjörg\nhafborg\nhafdís\nhafey\nhafgrímur\nhafliða\nhafliði\nhaflína\nhafnar\nhafni\nhafný\nhafrós\nhafrún\nhafsteina\nhafsteinn\nhafþór\nhafþóra\nhagalín\nhagbarður\nhagbert\nhaki\nhalla\nhallbera\nhallberg\nhallbjörg\nhallbjörn\nhallborg\nhalldís\nhalldór\nhalldóra\nhalley\nhallfreður\nhallfríður\nhallgarður\nhallgeir\nhallgerður\nhallgils\nhallgrímur\nhallgunnur\nhallkatla\nhallkell\nhallmann\nhallmar\nhallmundur\nhallný\nhallrún\nhallsteinn\nhallur\nhallvarður\nhallveig\nhallvör\nhallþór\nhamar\nhanna\nhannes\nhanney\nhannibal\nhans\nhansa\nhansína\nharald\nharaldur\nharpa\nharri\nharry\nharrý\nhartmann\nhartvig\nhauksteinn\nhaukur\nhaukvaldur\nhauður\nheba\nhebba\nhedda\nhedí\nheida\nheikir\nheilmóður\nheimir\nheinrekur\nheisi\nheiða\nheiðar\nheiðarr\nheiðberg\nheiðbert\nheiðbjörg\nheiðbjörk\nheiðbjört\nheiðbrá\nheiðdís\nheiðlaug\nheiðlindur\nheiðlóa\nheiðmann\nheiðmar\nheiðmundur\nheiðný\nheiðrekur\nheiðrós\nheiðrún\nheiður\nheiðveig\nhekla\nhektor\nhelen\nhelena\nhelga\nhelgi\nhella\nhelma\nhelmút\nhemmert\nhendrik\nhendrikka\nhenning\nhenný\nhenrietta\nhenrik\nhenrika\nhenry\nhenríetta\nhenrý\nhera\nherbert\nherbjörg\nherbjörn\nherbjört\nherborg\nherdís\nherfinnur\nherfríður\nhergeir\nhergerður\nhergill\nhergils\nherjólfur\nherlaug\nherlaugur\nherleifur\nherluf\nhermann\nhermundur\nhermína\nhermóður\nhersilía\nhersir\nhersteinn\nhersveinn\nherta\nhertha\nhervar\nhervarður\nhervin\nhervör\nherþrúður\nhilaríus\nhilbert\nhilda\nhildar\nhildegard\nhildibergur\nhildibjörg\nhildibrandur\nhildigeir\nhildigerður\nhildiglúmur\nhildigunnur\nhildimar\nhildimundur\nhildingur\nhildir\nhildiríður\nhildisif\nhildiþór\nhildur\nhilma\nhilmar\nhilmir\nhiminbjörg\nhimri\nhind\nhinrik\nhinrika\nhinrikka\nhjallkár\nhjalta\nhjaltalín\nhjaltey\nhjalti\nhjarnar\nhjálmar\nhjálmdís\nhjálmey\nhjálmfríður\nhjálmgeir\nhjálmgerður\nhjálmrós\nhjálmrún\nhjálmtýr\nhjálmur\nhjálmveig\nhjálmþór\nhjördís\nhjörfríður\nhjörleif\nhjörleifur\nhjörný\nhjörtfríður\nhjörtur\nhjörtþór\nhjörvar\nhlaðgerður\nhleiðar\nhleiður\nhlini\nhljómur\nhlynur\nhlédís\nhlégestur\nhlér\nhlíf\nhlífar\nhlín\nhlíðar\nhlíðberg\nhlökk\nhlöðmundur\nhlöður\nhlöðvarður\nhlöðver\nhnefill\nhnikar\nhnikarr\nholgeir\nholger\nholti\nhrafn\nhrafna\nhrafnar\nhrafnbergur\nhrafnborg\nhrafndís\nhrafney\nhrafnfífa\nhrafngerður\nhrafnheiður\nhrafnhildur\nhrafnkatla\nhrafnkell\nhrafnlaug\nhrafntinna\nhrafntýr\nhrannar\nhrappur\nhraunar\nhraundís\nhrefna\nhreggviður\nhreimur\nhreindís\nhreinn\nhreiðar\nhreiðmar\nhringur\nhrollaugur\nhrolleifur\nhrund\nhrærekur\nhrímnir\nhróaldur\nhróar\nhróbjartur\nhrói\nhrólfdís\nhrólfur\nhrómundur\nhróðgeir\nhróðmar\nhróðný\nhróðvar\nhróðólfur\nhrönn\nhrútur\nhugberg\nhugbjörg\nhugbjört\nhugborg\nhugdís\nhugi\nhuginn\nhugleikur\nhugljúf\nhugo\nhugrún\nhugó\nhuld\nhulda\nhuldar\nhuldrún\nhuldís\nhuxley\nhvannar\nhvönn\nhyltir\nhylur\nhákon\nhákonía\nháleygur\nhálfdan\nhálfdán\nhámundur\nhárekur\nhárlaugur\nhásteinn\nhávar\nhávarr\nhávarður\nhængur\nhænir\nhéðinn\nhíram\nhólm\nhólmar\nhólmbert\nhólmbjörg\nhólmdís\nhólmfastur\nhólmfríður\nhólmgeir\nhólmgrímur\nhólmkell\nhólmsteinn\nhólmþór\nhóseas\nhödd\nhögna\nhögni\nhörn\nhörður\nhöskuldur\nhöður\nhúbert\nhúgó\nhúmi\nhúna\nhúnbjörg\nhúnbogi\nhúndís\nhúngerður\nhúni\nhúnn\nhúnröður\nida\nidda\nillugi\nilmur\nilse\nilías\nimmanúel\nimmý\nina\ninda\nindia\nindiana\nindra\nindriði\nindí\nindía\nindíana\nindíra\ninga\ningberg\ningdís\ningeborg\ninger\ningey\ningheiður\ninghildur\ningi\ningiberg\ningibergur\ningibert\ningibjartur\ningibjörg\ningibjörn\ningibjört\ningiborg\ningifinna\ningifríður\ningigerður\ningilaug\ningileif\ningileifur\ningilín\ningimagn\ningimar\ningimaría\ningimunda\ningimundur\ningiríður\ningirós\ningisól\ningivaldur\ningiveig\ningiþór\ningjaldur\ningmar\ningrid\ningrún\ningunn\ningvaldur\ningvar\ningveldur\ningvi\ningólfur\ningþór\ninna\nirena\nirene\nirja\nirma\nirmelín\nirmý\nirpa\nisabel\nisabella\nismael\nissi\niða\niðunn\njack\njafet\njagger\njaki\njakob\njakobína\njakop\njamil\njan\njana\njane\njanetta\njannika\njanus\njara\njarfi\njarl\njarla\njarún\njarþrúður\njasmín\njason\njenetta\njenna\njenni\njenny\njenný\njens\njensína\njeremías\njes\njesper\njessý\njochum\njohan\njohn\njoshua\njovina\njudith\njulian\njárnbrá\njárngerður\njárngrímur\njátgeir\njátmundur\njátvarður\njóa\njóakim\njóann\njóanna\njódís\njóel\njófríður\njóhann\njóhanna\njóhannes\njói\njólín\njómar\njómundur\njón\njóna\njónanna\njónar\njónas\njónasína\njónatan\njónbjörg\njónbjörn\njónbjört\njóndís\njóndór\njóndóra\njóney\njónfríður\njóngeir\njóngerð\njónheiður\njónhildur\njóninna\njónmundur\njónný\njónsteinn\njónída\njónína\njóný\njónþór\njóra\njórlaug\njórunn\njóríður\njósafat\njósavin\njósebína\njósef\njósefín\njósefína\njósep\njósteinn\njósúa\njóvin\njökla\njökull\njökulrós\njörfi\njörgen\njörgína\njörmundur\njörri\njörundur\njörvar\njörvi\njúdea\njúdit\njúlí\njúlía\njúlían\njúlíana\njúlíanna\njúlíetta\njúlíhuld\njúlína\njúlírós\njúlíus\njúní\njúní\njúnía\njúníana\njúníus\njúrek\nkai\nkaj\nkaja\nkakali\nkaktus\nkala\nkaldi\nkaleb\nkali\nkalla\nkalman\nkalmann\nkalmar\nkamal\nkamilla\nkamma\nkamí\nkapitola\nkaprasíus\nkapítóla\nkara\nkarel\nkaren\nkarim\nkarin\nkaritas\nkarkur\nkarl\nkarla\nkarles\nkarli\nkarlinna\nkarlotta\nkarlína\nkarmen\nkarol\nkarolína\nkarvel\nkarí\nkarín\nkarína\nkarítas\nkaró\nkarólín\nkarólína\nkarún\nkaspar\nkasper\nkassandra\nkastíel\nkata\nkatarína\nkatarínus\nkaterína\nkatharina\nkathinka\nkatinka\nkatla\nkatrín\nkatrína\nkató\nkatý\nkaðlín\nkellý\nkendra\nkeran\nketilbjörg\nketilbjörn\nketilfríður\nketill\nketilríður\nkiddý\nkiljan\nkilían\nkira\nkirsten\nkirstín\nkittý\nkjalar\nkjallakur\nkjalvör\nkjaran\nkjartan\nkjarval\nkjárr\nkjói\nklara\nklemens\nklementína\nklemenz\nkleópatra\nkládía\nklængur\nknörr\nknútur\nkoggi\nkolbeinn\nkolbjörg\nkolbjörn\nkolbrá\nkolbrún\nkoldís\nkolfinna\nkolfinnur\nkolfreyja\nkolgríma\nkolgrímur\nkolka\nkolmar\nkolskeggur\nkolur\nkolviður\nkonkordía\nkonný\nkonráð\nkonstantínus\nkorka\nkormlöð\nkormákur\nkornelía\nkornelíus\nkort\nkoðrán\nkraki\nkris\nkrista\nkristall\nkristberg\nkristbergur\nkristbjörg\nkristbjörn\nkristborg\nkristdór\nkristel\nkristens\nkristensa\nkrister\nkristey\nkristfinnur\nkristfríður\nkristgeir\nkristgerður\nkristian\nkristin\nkristine\nkristinn\nkristjana\nkristján\nkristjón\nkristjóna\nkristlaug\nkristlaugur\nkristleifur\nkristlind\nkristlín\nkristmann\nkristmar\nkristmundur\nkristný\nkristofer\nkristrós\nkristrún\nkristvaldur\nkristvarður\nkristveig\nkristvin\nkristvina\nkristíana\nkristíanna\nkristín\nkristína\nkristófer\nkristólína\nkristý\nkristþór\nkristþóra\nkrumma\nkrummi\nkría\nkvasir\nkveldúlfur\nkár\nkára\nkári\nkæja\nkókó\nkópur\nkórekur\nlaila\nlambert\nlana\nlara\nlars\nlaufar\nlaufey\nlaufheiður\nlaufhildur\nlauga\nlaugey\nlaugheiður\nlaugi\nlauritz\nlaíla\nlea\nleif\nleifur\nleiknir\nleikný\nleila\nleiðólfur\nlena\nleo\nleon\nleonard\nleonhard\nleonóra\nleví\nlexí\nleyla\nleó\nleóna\nleónóra\nleópold\nlilja\nliljar\nliljurós\nliljá\nlill\nlilla\nlillian\nlilly\nlillý\nlily\nlilý\nlind\nlinda\nlindar\nlindberg\nlinddís\nlingný\nlisbeth\nlistalín\nliv\nljósbjörg\nljósbrá\nljósálfur\nljótunn\nljótur\nljúfur\nlofn\nloftur\nloftveig\nlogey\nlogi\nlokbrá\nloki\nlotta\nlouisa\nlouise\nlovísa\nloðmundur\nludvig\nlukka\nlundi\nlydia\nlydía\nlyngar\nlyngheiður\nlár\nlára\nlárensína\nlárent\nlárentíus\nláretta\nlárey\nlárus\nlæla\nlér\nlíam\nlíba\nlíf\nlífdís\nlílý\nlín\nlína\nlínberg\nlínbjörg\nlíndís\nlíneik\nlíney\nlínhildur\nlíni\nlísa\nlísabet\nlísandra\nlísbet\nlísebet\nlív\nlóa\nlóreley\nlórens\nlórenz\nlótus\nlúcía\nlúkas\nlúna\nlúsinda\nlúsía\nlúter\nlúther\nlúvísa\nlúísa\nlúðvíg\nlúðvík\nlúðvíka\nlýdía\nlýra\nlýtingur\nlýður\nmaddý\nmagda\nmagdalena\nmagga\nmaggey\nmaggi\nmaggý\nmagna\nmagndís\nmagnea\nmagnes\nmagney\nmagnfríður\nmagngeir\nmagnheiður\nmagnhildur\nmagni\nmagnús\nmagnúsína\nmagný\nmagnþór\nmagnþóra\nmagðalena\nmaj\nmaja\nmakan\nmalen\nmalena\nmalika\nmalla\nmalía\nmalín\nmalína\nmanda\nmanfred\nmanfreð\nmanúel\nmanúela\nmanúella\nmar\nmara\nmarbjörn\nmardís\nmarel\nmarela\nmarella\nmaren\nmarey\nmarfríður\nmargeir\nmargit\nmargot\nmargret\nmargrjet\nmargrét\nmargrímur\nmargunnur\nmarheiður\nmari\nmaria\nmarie\nmarijón\nmarikó\nmarinella\nmarinó\nmarit\nmarja\nmarjón\nmark\nmarkrún\nmarkó\nmarkús\nmarkþór\nmarlaug\nmarlena\nmarlín\nmarlís\nmaron\nmarri\nmars\nmarsa\nmarsellíus\nmarselía\nmarselína\nmarsibil\nmarsilía\nmarsý\nmarta\nmarteinn\nmarten\nmartha\nmarthen\nmartin\nmartína\nmarvin\nmary\nmarzibil\nmarzilíus\nmarí\nmaría\nmaríam\nmarían\nmaríana\nmaríanna\nmarías\nmarín\nmarína\nmarínella\nmarínó\nmaríon\nmarís\nmarísa\nmarísól\nmarít\nmaríuerla\nmaríus\nmarólína\nmarý\nmathilda\nmathías\nmatta\nmattea\nmatthea\nmatthilda\nmatthildur\nmatthía\nmatthías\nmatti\nmattíana\nmattías\nmattína\nmattý\nmax\nmaxima\nmaximus\nmaía\nmaídís\nmaísól\nmeda\nmekkin\nmekkinó\nmekkín\nmelinda\nmelissa\nmelkorka\nmelkíor\nmelkólmur\nmelrakki\nmelrós\nmensalder\nmerkúr\nmessíana\nmethúsalem\nmetta\nmetúsalem\nmey\nmeyvant\nmichael\nmikael\nmikaela\nmikaelína\nmikjáll\nmikkael\nmikkalína\nmikkel\nmilda\nmildinberg\nmildríður\nmilla\nmillý\nminerva\nminna\nminney\nminný\nmiriam\nmirja\nmirjam\nmirra\nmist\nmjalldís\nmjallhvít\nmjaðveig\nmjöll\nmjöllnir\nmjölnir\nmoli\nmona\nmonika\nmorgan\nmorgunsól\nmoritz\nmosi\nmuggur\nmunda\nmundheiður\nmundhildur\nmundína\nmuni\nmuninn\nmyrk\nmyrkvi\nmyrra\nmábil\nmálfríður\nmálhildur\nmálmfríður\nmánadís\nmáney\nmáni\nmár\nmára\nmárus\nmía\nmías\nmíla\nmímir\nmímósa\nmínerva\nmír\nmíra\nmíranda\nmíríel\nmítra\nmíó\nmóa\nmódís\nmóeiður\nmóey\nmóheiður\nmói\nmóna\nmónika\nmóníka\nmóri\nmórits\nmóses\nmóði\nmörk\nmörður\nmúli\nmýr\nmýra\nmýrkjartan\nmýrún\nnadia\nnadja\nnadía\nnana\nnanna\nnanný\nnansý\nnaomí\nnarfi\nnatalie\nnatalía\nnatan\nnatanael\nnataníel\nnathan\nnaómí\nneisti\nnella\nnellý\nnenna\nnenni\nneptúnus\nnicolas\nnicole\nnikanor\nnikolai\nnikolas\nnikoletta\nnikulás\nnikíta\nnikólína\nnils\nninja\nninna\nniðbjörg\nnjála\nnjáll\nnjóla\nnjörður\nnonni\nnorbert\nnorma\nnormann\nnorðmann\nnáttmörður\nnáttsól\nnáttúlfur\nnáð\nníels\nníls\nnína\nníní\nnóa\nnóam\nnóel\nnói\nnóni\nnóra\nnóri\nnótt\nnóvember\nnökkvi\nnúmi\nnýbjörg\nnývarð\nobba\nodda\noddbergur\noddbjörg\noddbjörn\noddfreyja\noddfreyr\noddfríður\noddgeir\noddgerður\noddhildur\noddi\noddkell\noddlaug\noddleif\noddleifur\noddmar\noddný\noddrún\noddsteinn\noddur\noddvar\noddveig\noddvör\noddþór\noktavía\noktavíus\noktó\noktóvía\noktóvíus\nolaf\nolav\nolga\nolgeir\noliver\nolivert\nolivia\nollý\nora\norfeus\norka\normar\normheiður\normhildur\normur\norri\norvar\notkatla\notkell\notri\notta\notti\nottó\notur\npamela\nparmes\nparís\npatrek\npatrekur\npatricia\npatrick\npatrik\npatrisía\npedró\nper\nperla\npeta\npeter\npetra\npetrea\npetronella\npetrína\npetrónella\npetrós\npetrún\npetrúnella\npjetur\npolly\npollý\npría\npríor\npála\npáldís\npáley\npálfríður\npálhanna\npálheiður\npálhildur\npáll\npálmar\npálmey\npálmfríður\npálmi\npálrún\npálín\npálína\npétrína\npétrún\npétur\npía\nrafael\nrafn\nrafnar\nrafney\nrafnhildur\nrafnkell\nragna\nragnar\nragnbjörg\nragney\nragnfríður\nragnheiður\nragnhildur\nragúel\nrakel\nramóna\nrandalín\nrandver\nrandíður\nrandý\nranka\nrannva\nrannveig\nrannver\nrasmus\nrea\nrebekka\nrefur\nreginbaldur\nreginbjörg\nreginn\nregína\nreidar\nreifnir\nreimar\nrein\nreinar\nreinhart\nreinhold\nremek\nrenata\nrex\nreykdal\nreyn\nreynald\nreynar\nreyndís\nreynheiður\nreynhildur\nreynir\nreyr\nrichard\nrikharð\nrikharður\nrikka\nripley\nrita\nrobert\nrolf\nronald\nronja\nrorí\nroxanna\nrudolf\nruni\nrunný\nrunólfur\nrut\nruth\nrán\nráðgeir\nráðhildur\nráðvarður\nríkarður\nríkey\nríkharð\nríkharður\nrín\nríta\nríó\nróbert\nróberta\nróbjörg\nrólant\nróman\nrómeó\nrós\nrósa\nrósalind\nrósalía\nrósanna\nrósant\nrósar\nrósberg\nrósbjörg\nrósborg\nróselía\nrósenberg\nrósey\nrósfríður\nróshildur\nrósi\nrósinberg\nrósinkar\nrósinkara\nrósinkrans\nrósinkransa\nróska\nróslaug\nróslind\nróslinda\nróslín\nrósmann\nrósmary\nrósmarý\nrósmunda\nrósmundur\nrósný\nröfn\nrögn\nrögnvald\nrögnvaldur\nrögnvar\nrökkvi\nröskva\nröðull\nrúbar\nrúben\nrúbý\nrúdólf\nrún\nrúna\nrúnar\nrúndís\nrúnhildur\nrúrik\nrúrí\nrútur\nsabrína\nsabína\nsafír\nsaga\nsakarías\nsalbjörg\nsaldís\nsalgerður\nsalka\nsalma\nsalmann\nsalmar\nsalný\nsalome\nsalvar\nsalvör\nsalín\nsalína\nsalóme\nsalómon\nsamson\nsamúel\nsandel\nsandra\nsandri\nsandur\nsanna\nsantía\nsara\nsarína\nsaxi\nsebastian\nsebastían\nsefanía\nseifur\nseimur\nselena\nselja\nselka\nselma\nsenía\nseptíma\nsera\nserena\nsesar\nseselía\nsesil\nsesilía\nsesselja\nsesselía\nsessilía\nsif\nsigbergur\nsigbert\nsigbjartur\nsigbjörn\nsigdís\nsigdór\nsigdóra\nsigfastur\nsigfinnur\nsigfreður\nsigfríð\nsigfríður\nsigfús\nsigga\nsiggeir\nsiggerður\nsighvatur\nsigjón\nsiglaugur\nsigmann\nsigmar\nsigmunda\nsigmundur\nsigna\nsignar\nsignhildur\nsigný\nsigri\nsigrid\nsigríkur\nsigríður\nsigrún\nsigsteinn\nsigtryggur\nsigtýr\nsigur\nsigurbaldur\nsigurberg\nsigurbergur\nsigurbirna\nsigurbjarni\nsigurbjartur\nsigurbjörg\nsigurbjörn\nsigurbjört\nsigurborg\nsigurbrandur\nsigurbára\nsigurdríf\nsigurdrífa\nsigurdís\nsigurdór\nsigurdóra\nsigurey\nsigurfinna\nsigurfinnur\nsigurfljóð\nsigurgeir\nsigurgeira\nsigurgestur\nsigurgrímur\nsigurgísli\nsigurhanna\nsigurhans\nsigurhelga\nsigurhildur\nsigurhjörtur\nsigurjón\nsigurjóna\nsigurkarl\nsigurlaug\nsigurlaugur\nsigurleif\nsigurleifur\nsigurlilja\nsigurlinn\nsigurlinni\nsigurliði\nsigurlogi\nsigurlás\nsigurlín\nsigurlína\nsigurmann\nsigurmar\nsigurmon\nsigurmunda\nsigurmundur\nsigurnanna\nsigurnýas\nsigurnýjas\nsiguroddur\nsigurpáll\nsigurrós\nsigursteina\nsigursteinn\nsigursveinn\nsigurunn\nsigurvaldi\nsigurveig\nsigurvin\nsigurvina\nsigurást\nsigurásta\nsigurða\nsigurður\nsiguróli\nsigurósk\nsigurörn\nsigurþór\nsigurþóra\nsigvalda\nsigvaldi\nsigvarður\nsigyn\nsigþrúður\nsigþór\nsigþóra\nsilfa\nsilfrún\nsilfá\nsilja\nsilka\nsilla\nsilli\nsilva\nsilvana\nsilvía\nsindri\nsirra\nsirrí\nsirrý\nsiv\nsivía\nsjafnar\nsjana\nsjöfn\nskafti\nskapti\nskarpheiður\nskarphéðinn\nskefill\nskeggi\nskellir\nskjöldur\nskorri\nskröggur\nskugga\nskuggi\nskuld\nskær\nskæringur\nskírnir\nskíði\nskúla\nskúli\nskúlína\nskúta\nsmiður\nsmyrill\nsmári\nsnjáfríður\nsnjáka\nsnjófríður\nsnjóki\nsnjólaug\nsnjólaugur\nsnjólfur\nsnorra\nsnorri\nsnæbjartur\nsnæbjörg\nsnæbjörn\nsnæbjört\nsnæborg\nsnæbrá\nsnædís\nsnæfríður\nsnæhólm\nsnælaug\nsnælaugur\nsnær\nsnæringur\nsnærós\nsnærún\nsnævar\nsnævarr\nsnæþór\nsnót\nsoffanías\nsoffía\nsofie\nsofía\nsolveig\nsonja\nsonný\nsophanías\nsophia\nsophie\nsophus\nspartakus\nsporði\nspói\nstanley\nstapi\nstarkaður\nstarri\nstasía\nstefan\nstefana\nstefanía\nstefnir\nstefán\nstefánný\nsteina\nsteinar\nsteinarr\nsteinberg\nsteinbergur\nsteinbjörg\nsteinbjörn\nsteinborg\nsteindís\nsteindór\nsteindóra\nsteiney\nsteinfinnur\nsteinfríður\nsteingerður\nsteingrímur\nsteinhildur\nsteini\nsteinkell\nsteinlaug\nsteinmann\nsteinmar\nsteinmóður\nsteinn\nsteinrós\nsteinröður\nsteinrún\nsteinunn\nsteinvarður\nsteinvör\nsteinólfur\nsteinþór\nsteinþóra\nstella\nstirnir\nstjarna\nstjarney\nstormur\nsturla\nsturlaugur\nsturri\nstyr\nstyrbjörn\nstyrgerður\nstyrkár\nstyrmir\nstyrr\nstígheiður\nstígrún\nstígur\nstína\nstórólfur\nsumarliði\nsumarlína\nsumarrós\nsunna\nsunnefa\nsunneva\nsunniva\nsunníva\nsusan\nsvafa\nsvafar\nsvala\nsvali\nsvalrún\nsvan\nsvana\nsvanberg\nsvanbergur\nsvanbjörg\nsvanbjörn\nsvanbjört\nsvanborg\nsvandís\nsvaney\nsvanfríður\nsvangeir\nsvanheiður\nsvanhildur\nsvanhvít\nsvanhólm\nsvani\nsvanlaug\nsvanlaugur\nsvanmundur\nsvanrós\nsvanur\nsvanþrúður\nsvanþór\nsvava\nsvavar\nsvea\nsveina\nsveinar\nsveinberg\nsveinbjartur\nsveinbjörg\nsveinbjörn\nsveinborg\nsveindís\nsveiney\nsveinfríður\nsveingerður\nsveinhildur\nsveinjón\nsveinlaug\nsveinlaugur\nsveinmar\nsveinn\nsveinrós\nsveinrún\nsveinsína\nsveinungi\nsveinveig\nsveinþór\nsvend\nsverre\nsverrir\nsváfnir\nsvölnir\nsvörfuður\nsylgja\nsylva\nsylvia\nsylvía\nsæberg\nsæbergur\nsæbjartur\nsæbjörg\nsæbjörn\nsæbjört\nsæborg\nsæbrá\nsædís\nsæfinna\nsæfríður\nsæhildur\nsæi\nsæla\nsælaug\nsælaugur\nsæmann\nsæmi\nsæmunda\nsæmundur\nsæný\nsær\nsærós\nsærún\nsæsól\nsæunn\nsævald\nsævaldur\nsævar\nsævarr\nsævin\nsævör\nsæþór\nsía\nsímon\nsímona\nsímonía\nsírnir\nsírus\nsísí\nsíta\nsívar\nsófus\nsófónías\nsókrates\nsól\nsóla\nsólberg\nsólbergur\nsólbjartur\nsólbjörg\nsólbjörn\nsólbjört\nsólborg\nsólbrá\nsólbrún\nsóldís\nsóldögg\nsóley\nsólfríður\nsólgerður\nsólhildur\nsólimann\nsólkatla\nsóllilja\nsólmar\nsólmundur\nsólný\nsólon\nsólrós\nsólrún\nsólveig\nsólver\nsólvin\nsólvör\nsólín\nsónata\nsölmundur\nsölva\nsölvar\nsölvey\nsölvi\nsölvína\nsören\nsörli\nsúla\nsúlamít\nsúsan\nsúsanna\nsýrus\ntala\ntalía\ntamar\ntamara\ntandri\ntanja\ntanya\ntanya\ntanía\ntara\ntarfur\ntea\nteitný\nteitur\ntekla\ntelma\ntera\nteresa\nteresía\nthea\nthelma\ntheodór\ntheodóra\ntheresa\ntheódór\ntheódóra\nthomas\nthor\nthorberg\nthór\ntindar\ntindra\ntindri\ntindur\ntinna\ntinni\ntirsa\ntjaldur\ntjörfi\ntjörvi\ntobías\ntodda\ntolli\ntonni\ntorbjörg\ntorfey\ntorfheiður\ntorfhildur\ntorfi\ntrausti\ntristan\ntristana\ntrostan\ntryggva\ntryggvi\ntryggvína\ntrú\ntrúmann\ntumas\ntumi\ntyrfingur\ntía\ntíalilja\ntíbor\ntíbrá\ntími\ntímon\ntímoteus\ntímóteus\ntína\ntístran\ntóbías\ntóbý\ntói\ntóka\ntóki\ntómas\ntór\ntóta\ntýr\ntýra\nubbi\nuggi\nugla\nulrich\nuna\nundína\nuni\nunna\nunnar\nunnbjörg\nunnbjörn\nunndís\nunndór\nunnsteinn\nunnur\nunnþór\nurðar\nurður\nuxi\nvagn\nvagna\nvagnbjörg\nvagnfríður\nvaka\nvakur\nvala\nvalberg\nvalbergur\nvalbjörg\nvalbjörk\nvalbjörn\nvalbjört\nvalborg\nvalbrandur\nvaldemar\nvaldheiður\nvaldi\nvaldimar\nvaldís\nvaldór\nvalentín\nvalentína\nvalentínus\nvalería\nvaley\nvalfríður\nvalgarð\nvalgarður\nvalgeir\nvalgerða\nvalgerður\nvalgý\nvalhildur\nvalka\nvalkyrja\nvallaður\nvallý\nvalmar\nvalmundur\nvalný\nvalrós\nvalrún\nvalsteinn\nvalter\nvaltýr\nvalur\nvalva\nvalves\nvalíant\nvalý\nvalþrúður\nvalþór\nvanda\nvarmar\nvarða\nvatnar\nveig\nveiga\nveigar\nveigur\nvenný\nvenus\nver\nvera\nvermundur\nvernharð\nvernharður\nveronika\nverónika\nveróníka\nvestar\nvestmar\nvetrarrós\nveturliði\nvibeka\nvictor\nvictoría\nvigdís\nvigfús\nviggó\nviglín\nvignir\nvigný\nvigri\nvigtýr\nvigur\nvikar\nviktor\nviktoria\nviktoría\nvilberg\nvilbergur\nvilbert\nvilbjörn\nvilbogi\nvilborg\nvilbrandur\nvildís\nvilfríður\nvilgeir\nvilgerður\nvilhelm\nvilhelmína\nvilhjálmur\nvili\nviljar\nvilji\nvilla\nvilli\nvillimey\nvilma\nvilmar\nvilmundur\nvilný\nvinbjörg\nvincent\nvindar\nvinjar\nvinný\nvinsý\nvirgill\nvirginía\nviðar\nviðja\nviðjar\nvon\nvoney\nvopni\nvordís\nvorm\nváli\nvápni\nvár\nvébjörg\nvébjörn\nvédís\nvégeir\nvégerður\nvékell\nvélaug\nvélaugur\nvémundur\nvéný\nvésteinn\nvíbekka\nvíf\nvífill\nvígberg\nvígdögg\nvíggunnur\nvíglundur\nvígmar\nvígmundur\nvígsteinn\nvígþór\nvíkingur\nvísa\nvíðar\nvíðir\nvíóla\nvíóletta\nvöggur\nvölundur\nvörður\nvöttur\nwalter\nwerner\nwilhelm\nwillard\nwilliam\nwillum\nwilly\nylfa\nylfur\nylja\nylur\nylva\nymir\nyngvar\nyngvi\nynja\nyrja\nyrkill\nyrsa\nzakaría\nzakarías\nzophanías\nzophonías\nzóphanías\nzóphonías\nágúst\nágústa\nágústína\náki\nálfar\nálfdís\nálfey\nálfgeir\nálfgerður\nálfgrímur\nálfheiður\nálfhildur\nálfrós\nálfrún\nálfsól\nálfur\nálfþór\námundi\nárbjartur\nárbjörg\nárbjörn\nárbjört\nárdís\nárelía\nárelíus\nárgeir\nárgils\nárlaug\nármann\nármey\nárna\nárndís\nárney\nárnheiður\nárni\nárnína\nárný\nársæl\nársæll\nársól\nárveig\nárvök\náróra\nárún\nárþóra\nás\nása\násberg\násbergur\násbjörg\násbjörn\násborg\násdís\násdór\násfríður\násgautur\násgeir\násgerður\násgils\násgrímur\náshildur\nási\náskatla\náskell\násla\náslaug\náslaugur\násleif\náslákur\násmar\násmundur\násný\násrós\násröður\násrún\nást\násta\nástbjörg\nástbjörn\nástbjört\nástdís\nástfríður\nástgeir\nástgerður\nástheiður\násthildur\nástmar\nástmundur\nástráður\nástríkur\nástríður\nástrós\nástrún\nástvald\nástvaldur\nástvar\nástveig\nástvin\nástþrúður\nástþór\nástþóra\násvaldur\násvarður\násvör\násólfur\násþór\nægileif\nægir\næsa\næsgerður\næsir\nævar\nævarr\nævör\nían\nída\nígor\níma\ními\nína\nír\níren\nírena\níris\nírunn\nísabel\nísabella\nísadóra\nísafold\nísak\nísalind\nísar\nísarr\nísbjörg\nísbjörn\nísdís\níseldur\nísey\nísfold\nísgeir\nísgerður\níshildur\nísidór\nísidóra\nísis\níslaug\nísleif\nísleifur\níslilja\nísmael\nísmar\nísmey\nísold\nísrael\nísrún\níssól\nísveig\nísól\nísólfur\níunn\níva\nívan\nívar\nóda\nófeigur\nófelía\nóla\nólaf\nólafur\nólafía\nólafína\nólavía\nóli\nóliver\nólivía\nólína\nólíver\nólöf\nómar\nómi\nósa\nósk\nóskar\nósklín\nósvald\nósvaldur\nósvífur\nótta\nóttar\nóttarr\nóðinn\nóðný\nögmunda\nögmundur\nögn\nögri\nölnir\nölrún\nölveig\nölver\nölvir\nöndólfur\nönundur\nörbrún\nörk\nörlaugur\nörlygur\nörn\nörnólfur\nörvar\nösp\nössur\nöxar\núa\núddi\núlfa\núlfar\núlfdís\núlfey\núlfgeir\núlfheiður\núlfhildur\núlfhéðinn\núlfkell\núlfljótur\núlfrún\núlftýr\núlfur\núlla\núlrik\núna\núndína\núranus\núranía\núrsúla\nýja\nýma\nýmir\nýr\nýrar\nýrr\nþalía\nþangbrandur\nþeba\nþengill\nþeyr\nþeódís\nþeódóra\nþingey\nþinur\nþiðrandi\nþiðrik\nþjálfi\nþjóstar\nþjóstólfur\nþjóðann\nþjóðar\nþjóðbjörg\nþjóðbjörn\nþjóðgeir\nþjóðhildur\nþjóðleifur\nþjóðmar\nþjóðrekur\nþjóðvarður\nþjóðólfur\nþoka\nþollý\nþorberg\nþorbergur\nþorbjörg\nþorbjörn\nþorbrandur\nþorfinna\nþorfinnur\nþorgarður\nþorgautur\nþorgeir\nþorgerður\nþorgestur\nþorgils\nþorgnýr\nþorgríma\nþorgrímur\nþorgísl\nþorkatla\nþorkell\nþorlaug\nþorlaugur\nþorleif\nþorleifur\nþorleikur\nþorlákur\nþormar\nþormundur\nþormóður\nþorri\nþorsteina\nþorsteinn\nþorstína\nþorvaldur\nþorvar\nþorvarður\nþrastar\nþrymur\nþrá\nþráinn\nþrándur\nþróttur\nþröstur\nþrúða\nþrúðmar\nþrúður\nþula\nþura\nþurí\nþuríður\nþurý\nþyri\nþyrill\nþyrnir\nþyrnirós\nþyrí\nþór\nþóra\nþóranna\nþórar\nþórarinn\nþórarna\nþórbergur\nþórbjarni\nþórbjörg\nþórbjörn\nþórdís\nþórelfa\nþórelfur\nþórey\nþórfríður\nþórgnýr\nþórgrímur\nþórgunna\nþórgunnur\nþórhaddur\nþórhalla\nþórhalli\nþórhallur\nþórhanna\nþórheiður\nþórhildur\nþóri\nþórinn\nþórir\nþórkatla\nþórlaug\nþórlaugur\nþórleif\nþórleifur\nþórlindur\nþórmar\nþórmundur\nþórný\nþórodda\nþóroddur\nþórormur\nþórsteina\nþórsteinn\nþórsteinunn\nþórstína\nþórunn\nþórveig\nþórvör\nþórða\nþórður\nþórólfur\nþórörn\nþöll\nþúfa".split("\n"));
	this.addTrainingData("theological_angels","Theological Angels","abaddon\nabathar\nadriel\nahriman\nambriel\namesha\nanael\nangel\narariel\narchangel\nariel\nazazel\nazrael\nbarachiel\nbene\ncamael\ncassiel\ncherub\ncherubim\ndaniel\ndardail\ndominions\ndumah\neremiel\ngabriel\ngadreel\ngrigori\nhadraniel\nhahasiah\nhamalat\nhaniel\nharut\nhashmal\nhesediel\nimamiah\nisrafil\njegudiel\njehoel\njequn\njerahmeel\njophiel\nkerubiel\nkiraman\nkushiel\nleliel\nlucifer\nmaalik\nmarut\nmebahiah\nmetatron\nmichael\nmuaqqibat\nmunkar\nmuriel\nnakir\nnanael\nnetzach\nnithael\nnuriel\npahaliah\npenemue\nphanuel\npowers\npoyel\nprincipalities\npuriel\nqaphsiel\nraguel\nraphael\nraziel\nremiel\nsachiel\nsamael\nsandalphon\nsariel\nschemhampharae\nselaphiel\nseraph\nseraphiel\nseraphim\nshamsiel\nsimiel\ntemeluchus\ntennin\nthrones\ntzaphqiel\nuriel\nuzziel\nvehuel\nvirtues\nwormwood\nzachariel\nzadkiel\nzaphkiel\nzephon\nzophiel".split("\n"));
	this.addTrainingData("japanese_forenames","Japanese Forenames","ai\naiko\naimi\nairi\nakane\nakari\nakemi\naki\nakie\nakifumi\nakihiko\nakihiro\nakihisa\nakihito\nakiko\nakimasa\nakimi\nakimitsu\nakina\nakinobu\nakinori\nakio\nakira\nakisada\nakishige\nakito\nakitoshi\nakitsugu\nakiyoshi\nakiyuki\namane\nami\nanri\nanzu\naoi\narata\narihiro\narinaga\narinobu\naritomo\nasako\nasami\nasao\nasuka\nasuka\nasumi\nasuna\natomu\natsuhiko\natsuhiro\natsuko\natsumi\natsuo\natsushi\natsuto\natsuya\naya\nayaka\nayako\nayame\nayana\nayane\nayano\nayu\nayuka\nayumi\nayumu\nazuma\nazumi\nazusa\nbanri\nbunji\nbunta\nchiaki\nchie\nchieko\nchiemi\nchiharu\nchihiro\nchiho\nchika\nchikara\nchikayoshi\nchinami\nchinatsu\nchisato\nchitose\nchiyako\nchiyo\nchiyoko\nchizuko\nchizuru\nchoki\nchōei\nchūichi\ndai\ndaichi\ndaigo\ndaiki\ndairoku\ndaishin\ndaisuke\ndaizō\neiichi\neiichiro\neiji\neijirō\neikichi\neiko\neimi\neinosuke\neishun\neisuke\neizō\nemi\nemiko\nemiri\neri\nerika\neriko\netsuji\netsuko\nfujiko\nfujio\nfukumi\nfumiaki\nfumie\nfumihiko\nfumihiro\nfumika\nfumiko\nfumio\nfumito\nfumiya\nfusako\nfusanosuke\nfusazane\nfutoshi\nfuyuki\nfuyuko\ngaku\ngakuto\ngen'ichi\ngen'ichirō\ngenjiro\ngenta\ngentarō\ngenzo\ngiichi\ngin\ngoichi\ngoro\nhachirō\nhajime\nhakaru\nhana\nhanae\nhanako\nharu\nharuaki\nharuchika\nharue\nharuhi\nharuhiko\nharuhiro\nharuhisa\nharuka\nharuki\nharuko\nharumi\nharuna\nharunobu\nharuo\nharutaka\nharuto\nharuyo\nharuyoshi\nhatsu\nhatsue\nhatsuo\nhayanari\nhayate\nhayato\nhazuki\nheihachirō\nheisuke\nhideaki\nhideharu\nhidehiko\nhidehito\nhideji\nhidekazu\nhideki\nhideko\nhidemasa\nhidemi\nhidemi\nhidemitsu\nhidenobu\nhidenori\nhideo\nhideshi\nhidetaka\nhideto\nhidetoshi\nhidetsugu\nhideyo\nhideyoshi\nhideyuki\nhikari\nhikaru\nhimeko\nhinata\nhiro\nhiroaki\nhiroe\nhirofumi\nhirohide\nhirohisa\nhiroji\nhirokatsu\nhirokazu\nhiroki\nhiroko\nhirokuni\nhiromasa\nhiromi\nhiromichi\nhiromitsu\nhiromori\nhiromu\nhironari\nhironobu\nhironori\nhiroshi\nhiroshige\nhirotaka\nhirotami\nhiroto\nhirotoki\nhirotomo\nhirotoshi\nhirotsugu\nhiroya\nhiroyasu\nhiroyo\nhiroyoshi\nhiroyuki\nhisae\nhisahito\nhisako\nhisamitsu\nhisamoto\nhisanobu\nhisanori\nhisao\nhisashi\nhisataka\nhisateru\nhisato\nhisaya\nhisaya\nhisayasu\nhisayo\nhisayoshi\nhisayuki\nhitomi\nhitoshi\nhokuto\nhonami\nhotaru\nhozumi\nichiei\nichiko\nichirō\nichizō\niehisa\niemasa\niemon\niesada\nikko\nikue\nikumi\nikuo\nikurō\niori\nippei\nisami\nisamu\nisao\nissei\nitaru\nitsuki\nitsuko\nitsumi\niwao\nizumi\njiichirō\njin\njin'ichi\njinpachi\njiro\njitsuko\njun\njun'ichirō\njun'ya\njunichi\njunji\njunki\njunko\njunpei\njunzō\njōichirō\njōji\njōkichi\njōtarō\njūbei\njūkichi\njūshirō\njūtarō\njūzō\nkaede\nkagami\nkagemori\nkagetaka\nkaguya\nkaho\nkahoru\nkaiji\nkaito\nkakichi\nkaku\nkakuji\nkan'ichi\nkana\nkanae\nkanako\nkaname\nkanehira\nkanehiro\nkanematsu\nkanemoto\nkanesuke\nkanetake\nkaneto\nkanetsugu\nkaneyoshi\nkankuro\nkansuke\nkaori\nkaoru\nkarin\nkasumi\nkatsuaki\nkatsuei\nkatsuhiko\nkatsuhiro\nkatsuhisa\nkatsuhito\nkatsuji\nkatsuki\nkatsukiyo\nkatsuko\nkatsumasa\nkatsumi\nkatsumoto\nkatsunaga\nkatsunari\nkatsunori\nkatsunosuke\nkatsuo\nkatsushi\nkatsusuke\nkatsutarō\nkatsuteru\nkatsutomo\nkatsutoshi\nkatsuya\nkatsuyoshi\nkatsuyuki\nkawai\nkayo\nkayoko\nkazu\nkazuaki\nkazue\nkazuharu\nkazuhiko\nkazuhiro\nkazuhisa\nkazuhito\nkazuki\nkazuko\nkazuma\nkazumasa\nkazumi\nkazunari\nkazunori\nkazuo\nkazuoki\nkazurō\nkazusa\nkazushi\nkazushige\nkazutaka\nkazuto\nkazutoki\nkazutoshi\nkazuya\nkazuyo\nkazuyoshi\nkazuyuki\nkei\nkeigo\nkeiichi\nkeiichirō\nkeiji\nkeijirō\nkeijū\nkeiki\nkeiki\nkeiko\nkeinosuke\nkeishi\nkeisuke\nkeita\nkeizō\nken\nken'ichi\nken'ichirō\nken'yū\nkengo\nkenji\nkenjirō\nkenki\nkenkichi\nkensaku\nkenshin\nkensuke\nkenta\nkentaro\nkento\nkenzo\nkesao\nkihachi\nkihachirō\nkihei\nkiichirō\nkiko\nkikue\nkikuko\nkikuo\nkimiko\nkimio\nkimiya\nkin'ichi\nkin'ichirō\nkin'ya\nkinji\nkinjirō\nkintaro\nkira\nkisaburō\nkishō\nkiyoaki\nkiyofumi\nkiyohide\nkiyohiko\nkiyohiro\nkiyoji\nkiyokazu\nkiyoko\nkiyomoto\nkiyonari\nkiyonori\nkiyoshi\nkiyosue\nkiyotaka\nkiyotake\nkiyoyuki\nkogorō\nkoharu\nkoji\nkojiro\nkonomi\nkoson\nkotaro\nkotomi\nkotori\nkouta\nkoya\nkozue\nkumatarō\nkumi\nkumiko\nkuniaki\nkunie\nkunihiko\nkunihiro\nkunihisa\nkuniko\nkunimitsu\nkunio\nkunitake\nkuniyuki\nkuranosuke\nkurenai\nkurumi\nkusuo\nkyo\nkyoko\nkyukichi\nkyōhei\nkyōichi\nkyōji\nkyōsuke\nkōhei\nkōichi\nkōichirō\nkōki\nkōkichi\nkōnosuke\nkōsaku\nkōsei\nkōshirō\nkōsuke\nkōzō\nmaaya\nmachi\nmachiko\nmadoka\nmahiro\nmaho\nmaiko\nmaki\nmakiko\nmakio\nmako\nmakoto\nmami\nmamiko\nmamoru\nmana\nmanabu\nmanami\nmanjirō\nmantarō\nmao\nmareo\nmari\nmariko\nmarié\nmasaaki\nmasabumi\nmasachika\nmasae\nmasafumi\nmasaharu\nmasahide\nmasahiko\nmasahiro\nmasahisa\nmasahito\nmasaichi\nmasaie\nmasaji\nmasakage\nmasakatsu\nmasakazu\nmasaki\nmasako\nmasakuni\nmasami\nmasamichi\nmasamitsu\nmasamori\nmasamune\nmasamura\nmasanao\nmasanobu\nmasanori\nmasao\nmasaomi\nmasaru\nmasashi\nmasashige\nmasataka\nmasatake\nmasatane\nmasateru\nmasato\nmasatomo\nmasatoshi\nmasatsugu\nmasaya\nmasayoshi\nmasayuki\nmasazumi\nmasumi\nmasuo\nmasuzō\nmatabei\nmatsuchi\nmatsuki\nmatsuko\nmatsuo\nmatsushige\nmayako\nmayu\nmayuko\nmayumi\nmayura\nmegu\nmegumi\nmei\nmeiko\nmeisa\nmichiaki\nmichiharu\nmichihiko\nmichihiro\nmichihisa\nmichiko\nmichinori\nmichio\nmichiru\nmichirō\nmichitaka\nmichitarō\nmichiya\nmichiyo\nmichiyoshi\nmidori\nmie\nmieko\nmiho\nmiiko\nmika\nmikako\nmiki\nmikiko\nmikio\nmikoto\nmiku\nmikuni\nmikuru\nmimori\nmina\nminae\nminako\nminami\nmineichi\nmineko\nmineo\nminori\nmirai\nmisaki\nmisako\nmisao\nmisato\nmitsuaki\nmitsugi\nmitsugu\nmitsuharu\nmitsuhide\nmitsuhiko\nmitsuhira\nmitsuhiro\nmitsuhisa\nmitsuki\nmitsuko\nmitsumasa\nmitsumori\nmitsunobu\nmitsunori\nmitsuo\nmitsuomi\nmitsuru\nmitsusuke\nmitsutaka\nmitsuteru\nmitsutoshi\nmitsuyasu\nmitsuyo\nmitsuyo\nmitsuyoshi\nmitsuyuki\nmiu\nmiwa\nmiwako\nmiyabi\nmiyako\nmiyoko\nmiyu\nmiyuki\nmiyumi\nmiyū\nmizuho\nmizuki\nmizuko\nmochiaki\nmoe\nmokichi\nmomo\nmomoe\nmomoka\nmomoko\nmorihiko\nmorihiro\nmorikazu\nmorimasa\nmorio\nmoritaka\nmosuke\nmotoaki\nmotoharu\nmotohiko\nmotohiro\nmotoichi\nmotojirō\nmotoki\nmotoko\nmotomu\nmotonobu\nmotoshi\nmotoshige\nmotosuke\nmototada\nmototsugu\nmotoyasu\nmotoyuki\nmotozane\nmukuro\nmunehiro\nmunemori\nmunenobu\nmunenori\nmuneo\nmuneshige\nmunetaka\nmunetoki\nmunetoshi\nmurashige\nmutsuko\nmutsumi\nmutsuo\nnagaharu\nnagahide\nnagako\nnagamasa\nnagamichi\nnaganao\nnaganori\nnagatoki\nnagatomo\nnagisa\nnami\nnamio\nnana\nnanako\nnanami\nnanase\nnankichi\nnao\nnaofumi\nnaohiko\nnaohiro\nnaohisa\nnaohito\nnaoji\nnaokatsu\nnaoki\nnaoko\nnaomasa\nnaomi\nnaomichi\nnaomori\nnaoshi\nnaotaka\nnaotake\nnaoto\nnaoya\nnaoyuki\nnaozumi\nnariaki\nnariakira\nnaritaka\nnariyasu\nnariyuki\nnaruhisa\nnaruhito\nnarumi\nnatsue\nnatsuki\nnatsuko\nnatsume\nnatsumi\nnoa\nnoboru\nnobuaki\nnobuatsu\nnobuharu\nnobuhiko\nnobuhiro\nnobuhisa\nnobuhito\nnobukatsu\nnobukazu\nnobuko\nnobumasa\nnobumitsu\nnobumoto\nnobunao\nnobunari\nnobuo\nnobusada\nnobusuke\nnobutaka\nnobuteru\nnobutoki\nnobutomo\nnobutoshi\nnobutsuna\nnobuyasu\nnobuyoshi\nnobuyuki\nnodoka\nnoriaki\nnorifumi\nnorifusa\nnorihiko\nnorihiro\nnorihito\nnorikazu\nnoriko\nnorimasa\nnorio\nnoriyasu\nnoriyo\nnoriyoshi\nnoriyuki\nnozomi\nnozomu\nokimoto\nokitsugu\nomi\nosamu\notoha\notohiko\notome\nraizo\nran\nrei\nreiichi\nreiji\nreika\nreiko\nreizō\nren\nrena\nrentarō\nrie\nrieko\nriho\nriichi\nrika\nrikichi\nrikiya\nriku\nrin\nrina\nrinshō\nrisa\nritsuko\nrokurō\nrumi\nrumiko\nruna\nruri\nruriko\nryoko\nryu\nryō\nryōhei\nryōichi\nryōji\nryōka\nryōma\nryōsei\nryōsuke\nryōta\nryōtarō\nryōzō\nryūhei\nryūichi\nryūji\nryūki\nryūnosuke\nryūsaku\nryūsei\nryūsuke\nryūta\nryūtarō\nryūya\nryūzō\nsaburō\nsachie\nsachiko\nsachio\nsadaaki\nsadaharu\nsadahiko\nsadako\nsadao\nsadatoshi\nsadayoshi\nsadazane\nsaeko\nsaiichi\nsakae\nsaki\nsakichi\nsakie\nsakiko\nsakura\nsakurako\nsanae\nsaori\nsatoko\nsatomi\nsatonari\nsatoru\nsatoshi\nsatsuki\nsatsuo\nsawako\nsaya\nsayaka\nsayako\nsayoko\nsayumi\nsayuri\nseigen\nseigo\nseihō\nseiichi\nseiichirō\nseiji\nseijin\nseijirō\nseikichi\nseiko\nseishi\nseishirō\nseiya\nseizō\nsenkichi\nsetsuko\nsetsuna\nshichirō\nshigeaki\nshigefumi\nshigeharu\nshigehiro\nshigehisa\nshigekazu\nshigeki\nshigeko\nshigemasa\nshigematsu\nshigemi\nshigemitsu\nshigenaga\nshigenobu\nshigenori\nshigeo\nshigeri\nshigeru\nshigetada\nshigetaka\nshigeto\nshigetoshi\nshigeyasu\nshigeyoshi\nshigeyuki\nshiho\nshiina\nshikō\nshimako\nshin\nshin'ichi\nshin'ichirō\nshinako\nshingo\nshinji\nshinjirō\nshinjō\nshinkichi\nshino\nshinobu\nshinpei\nshinsaku\nshinsuke\nshinta\nshintarō\nshinya\nshinzō\nshion\nshiori\nshizue\nshizuka\nshizuko\nshizuo\nshoko\nshuko\nshuko\nshun\nshun'ichi\nshun'ichirō\nshun'ya\nshunji\nshunkichi\nshunpei\nshunsaku\nshunsuke\nshuntarō\nshunzō\nshō\nshōgo\nshōhei\nshōichi\nshōji\nshōjirō\nshōma\nshōsuke\nshōta\nshōtarō\nshōya\nshōzō\nshūgo\nshūhei\nshūichi\nshūji\nshūsaku\nshūsuke\nshūta\nshūzō\nsonosuke\nsora\nsubaru\nsuehiro\nsuguru\nsukehiro\nsukemasa\nsuketoshi\nsuketsugu\nsumika\nsumiko\nsumio\nsumire\nsumiyoshi\nsunao\nsusumu\nsuzue\nsuzuko\nsōgen\nsōichi\nsōichirō\nsōji\nsōsuke\nsōtarō\ntadaaki\ntadachika\ntadafumi\ntadaharu\ntadahiko\ntadahiro\ntadahito\ntadakatsu\ntadamasa\ntadami\ntadamori\ntadanaga\ntadanao\ntadanari\ntadanobu\ntadanori\ntadao\ntadaoki\ntadashi\ntadataka\ntadateru\ntadatomo\ntadatoshi\ntadatsugu\ntadatsune\ntadayo\ntadayoshi\ntadayuki\ntaeko\ntaichi\ntaichirō\ntaiga\ntaiichi\ntaiji\ntaiki\ntaishi\ntaisuke\ntaka\ntakaaki\ntakafumi\ntakahide\ntakahiko\ntakahiro\ntakahisa\ntakahito\ntakaki\ntakako\ntakamasa\ntakamitsu\ntakanobu\ntakanori\ntakao\ntakashi\ntakatomi\ntakatoshi\ntakatsugu\ntakauji\ntakaya\ntakayasu\ntakayoshi\ntakayuki\ntakeaki\ntakefumi\ntakeharu\ntakehiko\ntakehiro\ntakehisa\ntakehito\ntakeichi\ntakejirō\ntakeko\ntakenaga\ntakenori\ntakeo\ntakeru\ntakeshi\ntaketo\ntaketora\ntaketoshi\ntakeya\ntakeyoshi\ntakezō\ntaku\ntakuji\ntakuma\ntakumi\ntakuo\ntakurō\ntakuto\ntakuya\ntakuzō\ntamaki\ntamao\ntamiko\ntamio\ntamotsu\ntarō\ntateo\ntatsuaki\ntatsuhiko\ntatsuhiro\ntatsuhito\ntatsuji\ntatsuko\ntatsuma\ntatsumi\ntatsunori\ntatsuo\ntatsurō\ntatsushi\ntatsuya\ntatsuyoshi\ntatsuyuki\nteiji\nteijirō\nteiko\nteiko\nteizō\nteppei\nteru\nteruaki\nteruhiko\nteruhisa\nteruko\nterumasa\nterumi\nterunobu\nteruo\nteruyoshi\nteruyuki\ntetsu\ntetsuharu\ntetsuji\ntetsumasa\ntetsuo\ntetsurō\ntetsushi\ntetsutarō\ntetsuya\ntetsuzō\ntogo\ntokihiko\ntokiko\ntokio\ntokuji\ntokujirō\ntokuko\ntokuo\ntokurō\ntokutarō\ntomiko\ntomio\ntomo\ntomoaki\ntomochika\ntomoe\ntomoharu\ntomohide\ntomohiko\ntomohiro\ntomohisa\ntomohito\ntomoji\ntomoka\ntomokazu\ntomoki\ntomoko\ntomomi\ntomomichi\ntomonobu\ntomonori\ntomotaka\ntomoya\ntomoyasu\ntomoyo\ntomoyoshi\ntomoyuki\ntorahiko\ntoru\ntoshi\ntoshiaki\ntoshiharu\ntoshihide\ntoshihiko\ntoshihiro\ntoshihisa\ntoshihito\ntoshikatsu\ntoshikazu\ntoshiki\ntoshiko\ntoshimasa\ntoshimi\ntoshimichi\ntoshimitsu\ntoshinaga\ntoshinari\ntoshinobu\ntoshinori\ntoshio\ntoshirō\ntoshitada\ntoshitaka\ntoshitsugu\ntoshiya\ntoshiyasu\ntoshiyuki\ntoshizō\ntoyoaki\ntoyohiko\ntoyokazu\ntoyoko\ntoyomatsu\ntoyoshige\ntoyozō\ntsubasa\ntsugio\ntsukasa\ntsuneharu\ntsunehisa\ntsunejirō\ntsuneko\ntsunemi\ntsunenori\ntsuneo\ntsuneyoshi\ntsuneyuki\ntsutomu\ntsuyoshi\numanosuke\numeji\numeko\nwakako\nwataru\nyaeko\nyahiko\nyahiro\nyanosuke\nyasuaki\nyasue\nyasufumi\nyasuharu\nyasuhide\nyasuhiko\nyasuhiro\nyasuhisa\nyasuji\nyasujirō\nyasukazu\nyasuki\nyasuko\nyasumasa\nyasumi\nyasumichi\nyasunari\nyasunobu\nyasunori\nyasuo\nyasurō\nyasushi\nyasutaka\nyasutomo\nyasutoshi\nyasuyoshi\nyasuyuki\nyatarō\nyayoi\nyoko\nyorimitsu\nyorinobu\nyorishige\nyoritaka\nyoritsugu\nyoritsune\nyoriyuki\nyoshi\nyoshifumi\nyoshihide\nyoshihiko\nyoshihiro\nyoshihisa\nyoshihito\nyoshiie\nyoshika\nyoshikane\nyoshikatsu\nyoshikazu\nyoshiki\nyoshikiyo\nyoshiko\nyoshikuni\nyoshimasa\nyoshimatsu\nyoshimi\nyoshimichi\nyoshinaga\nyoshinao\nyoshinari\nyoshino\nyoshinobu\nyoshinori\nyoshio\nyoshirō\nyoshisada\nyoshishige\nyoshisuke\nyoshitaka\nyoshitake\nyoshitarō\nyoshiteru\nyoshito\nyoshitomo\nyoshitsugu\nyoshiya\nyoshiyasu\nyoshiyuki\nyugi\nyugo\nyui\nyuka\nyukari\nyuki\nyukie\nyukiharu\nyukihiko\nyukihiro\nyukiko\nyukimasa\nyukimura\nyukina\nyukinobu\nyukinori\nyukio\nyukitaka\nyukito\nyukiya\nyumeko\nyumi\nyumika\nyumiko\nyuri\nyurie\nyurika\nyuriko\nyurina\nyutaka\nyuzuru\nyō\nyō\nyōhei\nyōichi\nyōichirō\nyōji\nyōjirō\nyōsuke\nyōta\nyōzō\nyū\nyūdai\nyūhei\nyūichi\nyūichirō\nyūji\nyūjirō\nyūkichi\nyūko\nyūsaku\nyūsei\nyūshi\nyūsuke\nyūta\nyūtarō\nyūto\nyūya\nyūzō\nzenjiro\nzenkichi\nzentarō\nzenzō".split("\n"));
	this.addTrainingData("french_forenames","French Forenames","adrien\nagnès\nalain\nalbert\nalexandra\nalexandre\nalexis\nalice\naline\namandine\namélie\nandré\nandrée\nangélique\nanne\nannemarie\nannick\nannie\nantoine\narlette\narnaud\narthur\naudrey\naurore\naurélie\naurélien\nbaptiste\nbenjamin\nbenoît\nbernadette\nbernard\nbertrand\nbrigitte\nbruno\nbéatrice\ncamille\ncarole\ncaroline\ncatherine\nchantal\ncharles\nchloé\nchristelle\nchristian\nchristiane\nchristine\nchristophe\nclaire\nclara\nclaude\nclaudine\nclémence\nclément\ncolette\ncoralie\ncorinne\ncyril\ncécile\ncédric\ncéline\ndamien\ndaniel\ndanielle\ndanièle\ndavid\ndelphine\ndenis\ndenise\ndidier\ndominique\ndominique\ndylan\nemma\nemmanuel\nemmanuelle\nenzo\nestelle\nfabien\nfabienne\nfabrice\nfanny\nflorence\nflorent\nflorian\nfrancine\nfrancis\nfranck\nfrançois\nfrançoise\nfrédéric\ngabriel\ngaétan\ngaëlle\ngeneviève\ngeorges\ngeorgette\ngermaine\nghislaine\ngilbert\ngilles\nginette\ngisèle\ngrégory\nguillaume\nguy\ngérard\nhenri\nhenriette\nhervé\nhugo\nhuguette\nhélène\ninès\nirène\nisabelle\njacqueline\njacques\njanine\njean\njeanclaude\njeanfrançois\njeanlouis\njeanluc\njeanmarc\njeanmarie\njeanmichel\njeanne\njeannine\njeanpaul\njeanpierre\njennifer\njessica\njocelyne\njonathan\njoseph\njosette\njosé\njoël\njoëlle\njulie\njulien\njuliette\njustine\njérôme\nkarine\nkevin\nlaetitia\nlaura\nlaure\nlaurence\nlaurent\nliliane\nlionel\nlouis\nlouise\nloïc\nluc\nlucas\nlucie\nlucien\nlucienne\nludovic\nlydie\nléa\nmadeleine\nmagali\nmanon\nmarc\nmarcel\nmarcelle\nmarguerite\nmaria\nmarie\nmariechristine\nmarieclaude\nmariethérèse\nmarine\nmarion\nmartine\nmathieu\nmathilde\nmatthieu\nmaurice\nmaxime\nmichaël\nmichel\nmicheline\nmichelle\nmichèle\nmickaël\nmireille\nmohamed\nmonique\nmorgane\nmuriel\nmyriam\nmélanie\nmélissa\nnadia\nnadine\nnathalie\nnicolas\nnicole\nnoémie\nocéane\nodette\nodile\nolivier\npascal\npascale\npatrice\npatricia\npatrick\npaul\npaulette\npauline\nphilippe\npierre\npierrette\nquentin\nraphaël\nraymond\nraymonde\nrené\nrenée\nrichard\nrobert\nroger\nroland\nromain\nrégine\nrégis\nrémi\nrémy\nsabine\nsabrina\nsamuel\nsandra\nsandrine\nsarah\nserge\nsimon\nsimone\nsolange\nsonia\nsophie\nstéphane\nstéphanie\nsuzanne\nsylvain\nsylvie\nsébastien\nséverine\nthierry\nthomas\nthéo\nthérèse\nvalentin\nvalérie\nvanessa\nvictor\nvincent\nvirginie\nvéronique\nwilliam\nxavier\nyann\nyannick\nyves\nyvette\nyvonne\néliane\nélisabeth\nélise\nélodie\némilie\néric\nétienne\névelyne".split("\n"));
	this.addTrainingData("german_towns","German Towns","aach\naachen\naalen\nabenberg\nabensberg\nachern\nachim\nadelsheim\nadenau\nadorf\nahaus\nahlen\nahrensburg\naichach\naichtal\naken\nalbstadt\nalfeld\nallendorf\nallstedt\nalpirsbach\nalsdorf\nalsfeld\nalsleben\naltdorf\naltena\naltenberg\naltenburg\naltenkirchen\naltensteig\naltentreptow\naltlandsberg\naltötting\nalzenau\nalzey\namberg\namorbach\namöneburg\nandernach\nangermünde\nanklam\nannaberg\nannaburg\nannweiler\nansbach\napolda\narendsee\narneburg\narnis\narnsberg\narnstadt\narnstein\narnstein\nartern\narzberg\naschaffenburg\naschersleben\nasperg\nattendorn\naub\naue\nauerbach\nauerbach\naugsburg\naugustusburg\naulendorf\nauma\naurich\naßlar\nbabenhausen\nbacharach\nbacknang\nbaden\nbaesweiler\nbaiersdorf\nbalingen\nballenstedt\nbalve\nbamberg\nbarby\nbargteheide\nbarmstedt\nbarntrup\nbarsinghausen\nbarth\nbaruth\nbassum\nbattenberg\nbaumholder\nbaunach\nbaunatal\nbautzen\nbayreuth\nbebra\nbeckum\nbedburg\nbeelitz\nbeerfelden\nbeeskow\nbeilngries\nbeilstein\nbelgern\nbendorf\nbensheim\nberching\nberga\nbergen\nbergen\nbergheim\nbergisch\nbergkamen\nbergneustadt\nberka\nberlin\nbernau\nbernburg\nbernkastel\nbernsdorf\nbernstadt\nbersenbrück\nbesigheim\nbetzdorf\nbetzenstein\nbeverungen\nbexbach\nbiberach\nbiedenkopf\nbielefeld\nbiesenthal\nbietigheim\nbillerbeck\nbingen\nbirkenfeld\nbischofsheim\nbischofswerda\nbismark\nbitburg\nbitterfeld\nblankenburg\nblankenhain\nblaubeuren\nblaustein\nbleckede\nbleicherode\nblieskastel\nblomberg\nblumberg\nbobingen\nbocholt\nbochum\nbockenem\nbodenwerder\nbogen\nboizenburg\nbonn\nbonndorf\nbopfingen\nboppard\nborgentreich\nborgholzhausen\nborken\nborken\nborkum\nborna\nbornheim\nbottrop\nboxberg\nbrackenheim\nbrake\nbrakel\nbramsche\nbrand\nbrandenburg\nbrandis\nbraubach\nbraunfels\nbraunlage\nbraunsbedra\nbraunschweig\nbreckerfeld\nbredstedt\nbreisach\nbremen\nbremerhaven\nbremervörde\nbretten\nbreuberg\nbrilon\nbrotterode\nbruchköbel\nbruchsal\nbrunsbüttel\nbräunlingen\nbrück\nbrüel\nbrühl\nbrüssow\nbuchen\nbuchholz\nbuchloe\nbuckow\nburg\nburg\nburgau\nburgbernheim\nburgdorf\nburghausen\nburgkunstadt\nburglengenfeld\nburgstädt\nburgwedel\nburladingen\nburscheid\nbuttelstedt\nbuttstädt\nbutzbach\nbuxtehude\nbärnau\nböblingen\nböhlen\nbönnigheim\nbückeburg\nbüdelsdorf\nbüdingen\nbühl\nbünde\nbüren\nbürgel\nbürstadt\nbützow\ncalau\ncalbe\ncalw\ncastrop\ncelle\ncham\nchemnitz\nclausthal\nclingen\ncloppenburg\ncoburg\ncochem\ncoesfeld\ncolditz\ncologne\ncoswig\ncoswig\ncottbus\ncrailsheim\ncreglingen\ncreuzburg\ncreußen\ncrimmitschau\ncrivitz\ncuxhaven\ndachau\ndahlen\ndahme\ndahn\ndamme\ndannenberg\ndargun\ndarmstadt\ndassel\ndassow\ndatteln\ndaun\ndeggendorf\ndeidesheim\ndelbrück\ndelitzsch\ndelmenhorst\ndemmin\ndessau\ndetmold\ndettelbach\ndieburg\ndiemelstadt\ndiepholz\ndierdorf\ndietenheim\ndietfurt\ndietzenbach\ndiez\ndillenburg\ndillingen\ndillingen\ndingelstädt\ndingolfing\ndinkelsbühl\ndinklage\ndinslaken\ndippoldiswalde\ndissen\nditzingen\ndoberlug\ndohna\ndommitzsch\ndonaueschingen\ndonauwörth\ndonzdorf\ndorfen\ndormagen\ndornburg\ndornhan\ndornstetten\ndorsten\ndortmund\ndransfeld\ndrebkau\ndreieich\ndrensteinfurt\ndresden\ndrolshagen\nduderstadt\nduisburg\ndöbeln\ndöbern\ndömitz\ndülmen\ndüren\ndüsseldorf\nebeleben\neberbach\nebermannstadt\nebern\nebersbach\nebersbach\nebersberg\neberswalde\neckartsberga\neckernförde\nedenkoben\negeln\neggenfelden\neggesin\nehingen\nehrenfriedersdorf\neibelstadt\neibenstock\neichstätt\neilenburg\neinbeck\neisenach\neisenberg\neisenberg\neisenhüttenstadt\neisfeld\neisleben\neislingen\nellingen\nellrich\nellwangen\nelmshorn\nelsdorf\nelsfleth\nelsterberg\nelsterwerda\nelstra\nelterlein\neltmann\neltville\nelzach\nelze\nemden\nemmelshausen\nemmendingen\nemmerich\nemsdetten\nendingen\nengen\nenger\nennepetal\nennigerloh\neppelheim\neppingen\neppstein\nerbach\nerbach\nerbendorf\nerding\nerftstadt\nerfurt\nerkelenz\nerkner\nerkrath\nerlangen\nerlenbach\nerlensee\nerwitte\neschborn\neschenbach\neschershausen\neschwege\neschweiler\nesens\nespelkamp\nessen\nesslingen\nettenheim\nettlingen\neuskirchen\neutin\nfalkenberg\nfalkensee\nfalkenstein\nfalkenstein\nfehmarn\nfellbach\nfelsberg\nfeuchtwangen\nfilderstadt\nfinsterwalde\nfladungen\nflensburg\nflorstadt\nflöha\nflörsheim\nforchheim\nforchtenberg\nforst\nfrankenau\nfrankenberg\nfrankenberg\nfrankenthal\nfrankfurt\nfrankfurt\nfranzburg\nfrauenstein\nfrechen\nfreiberg\nfreiberg\nfreiburg\nfreilassing\nfreinsheim\nfreising\nfreital\nfreren\nfreudenberg\nfreudenberg\nfreudenstadt\nfreyburg\nfreystadt\nfreyung\nfridingen\nfriedberg\nfriedberg\nfriedland\nfriedland\nfriedrichroda\nfriedrichsdorf\nfriedrichshafen\nfriedrichstadt\nfriedrichsthal\nfriesack\nfriesoythe\nfritzlar\nfrohburg\nfröndenberg\nfulda\nfurth\nfurtwangen\nfürstenau\nfürstenberg\nfürstenfeldbruck\nfürstenwalde\nfürth\nfüssen\ngadebusch\ngaggenau\ngaildorf\ngammertingen\ngarbsen\ngarching\ngardelegen\ngarding\ngartz\ngarz\ngau\ngebesee\ngedern\ngeesthacht\ngeestland\ngefell\ngefrees\ngehrden\ngehren\ngeilenkirchen\ngeisa\ngeiselhöring\ngeisenfeld\ngeisenheim\ngeisingen\ngeislingen\ngeislingen\ngeithain\ngeldern\ngelnhausen\ngelsenkirchen\ngemünden\ngemünden\ngengenbach\ngenthin\ngeorgsmarienhütte\ngera\ngerabronn\ngerbstedt\ngeretsried\ngeringswalde\ngerlingen\ngermering\ngermersheim\ngernsbach\ngernsheim\ngerolstein\ngerolzhofen\ngersfeld\ngersthofen\ngescher\ngeseke\ngevelsberg\ngeyer\ngiengen\ngießen\ngifhorn\nginsheim\ngladbeck\ngladenbach\nglashütte\nglauchau\nglinde\nglücksburg\nglückstadt\ngnoien\ngoch\ngoldberg\ngoldkronach\ngolßen\ngommern\ngoslar\ngotha\ngrabow\ngrafenau\ngrafenwöhr\ngrafing\ngransee\ngrebenau\ngrebenstein\ngreding\ngreifswald\ngreiz\ngreußen\ngreven\ngrevenbroich\ngrevesmühlen\ngriesheim\ngrimma\ngrimmen\ngroitzsch\ngronau\ngronau\ngroß\ngroß\ngroß\ngroßalmerode\ngroßbottwar\ngroßbreitenbach\ngroßenehrich\ngroßenhain\ngroßräschen\ngroßröhrsdorf\ngroßschirma\ngräfenberg\ngräfenhainichen\ngräfenthal\ngröditz\ngröningen\ngrünberg\ngrünhain\ngrünsfeld\ngrünstadt\nguben\ngudensberg\ngummersbach\ngundelfingen\ngundelsheim\ngunzenhausen\ngöppingen\ngörlitz\ngöttingen\ngößnitz\ngüglingen\ngünzburg\ngüsten\ngüstrow\ngütersloh\ngützkow\nhaan\nhachenburg\nhadamar\nhagen\nhagenbach\nhagenow\nhaiger\nhaigerloch\nhainichen\nhaiterbach\nhalberstadt\nhaldensleben\nhalle\nhalle\nhallenberg\nhallstadt\nhaltern\nhalver\nhamburg\nhameln\nhamm\nhammelburg\nhamminkeln\nhanau\nhanover\nharburg\nhardegsen\nharen\nharsewinkel\nhartenstein\nhartha\nharzgerode\nhaselünne\nhaslach\nhattersheim\nhattingen\nhatzfeld\nhausach\nhauzenberg\nhavelberg\nhavelsee\nhayingen\nhaßfurt\nhechingen\nhecklingen\nheide\nheideck\nheidelberg\nheidenau\nheidenheim\nheilbad\nheilbronn\nheiligenhafen\nheiligenhaus\nheilsbronn\nheimbach\nheimsheim\nheinsberg\nheitersheim\nheldrungen\nhelmbrechts\nhelmstedt\nhemau\nhemer\nhemmingen\nhemmoor\nhemsbach\nhennef\nhennigsdorf\nheppenheim\nherbolzheim\nherborn\nherbrechtingen\nherbstein\nherdecke\nherdorf\nherford\nheringen\nheringen\nhermeskeil\nhermsdorf\nherne\nherrenberg\nherrieden\nherrnhut\nhersbruck\nherten\nherzberg\nherzberg\nherzogenaurach\nherzogenrath\nhessisch\nhessisch\nhettingen\nhettstedt\nheubach\nheusenstamm\nhilchenbach\nhildburghausen\nhilden\nhildesheim\nhillesheim\nhilpoltstein\nhirschau\nhirschberg\nhirschhorn\nhitzacker\nhochheim\nhockenheim\nhof\nhofgeismar\nhofheim\nhofheim\nhohen\nhohenberg\nhohenleuben\nhohenmölsen\nhohenstein\nhohnstein\nhollfeld\nholzgerlingen\nholzminden\nhomberg\nhomberg\nhomburg\nhorb\nhorn\nhornbach\nhornberg\nhorstmar\nhoya\nhoyerswerda\nhungen\nhusum\nhöchstadt\nhöchstädt\nhöhr\nhörstel\nhöxter\nhückelhoven\nhückeswagen\nhüfingen\nhünfeld\nhürth\nibbenbüren\nichenhausen\nidar\nidstein\nillertissen\nilmenau\nilsenburg\nilshofen\nimmenhausen\nimmenstadt\ningelfingen\ningelheim\ningolstadt\niphofen\niserlohn\nisny\nisselburg\nitzehoe\njarmen\njena\njerichow\njessen\njever\njoachimsthal\njohanngeorgenstadt\njöhstadt\njülich\njüterbog\nkaarst\nkahla\nkaisersesch\nkaiserslautern\nkalbe\nkalkar\nkaltenkirchen\nkaltennordheim\nkamen\nkamenz\nkamp\nkandel\nkandern\nkappeln\nkarben\nkarlsruhe\nkarlstadt\nkassel\nkastellaun\nkatzenelnbogen\nkaub\nkaufbeuren\nkehl\nkelbra\nkelheim\nkelkheim\nkellinghusen\nkelsterbach\nkemberg\nkemnath\nkempen\nkempten\nkenzingen\nkerpen\nketzin\nkevelaer\nkiel\nkierspe\nkindelbrück\nkirchberg\nkirchberg\nkirchberg\nkirchen\nkirchenlamitz\nkirchhain\nkirchheim\nkirchheimbolanden\nkirn\nkirtorf\nkitzingen\nkitzscher\nkleve\nklingenberg\nklingenthal\nklötze\nklütz\nknittlingen\nkoblenz\nkohren\nkolbermoor\nkonstanz\nkonz\nkorbach\nkorntal\nkornwestheim\nkorschenbroich\nkraichtal\nkrakow\nkranichfeld\nkrautheim\nkrefeld\nkremmen\nkrempe\nkreuztal\nkronach\nkronberg\nkroppenstedt\nkrumbach\nkröpelin\nkulmbach\nkupferberg\nkuppenheim\nkusel\nkyllburg\nkyritz\nkölleda\nkönigs\nkönigsberg\nkönigsbrunn\nkönigsbrück\nkönigsee\nkönigslutter\nkönigstein\nkönigstein\nkönigswinter\nkönnern\nköthen\nkühlungsborn\nkülsheim\nkünzelsau\nlaage\nlaatzen\nladenburg\nlage\nlahnstein\nlahr\nlaichingen\nlambrecht\nlampertheim\nlandau\nlandau\nlandsberg\nlandsberg\nlandshut\nlandstuhl\nlangelsheim\nlangen\nlangenau\nlangenburg\nlangenfeld\nlangenhagen\nlangenselbold\nlangenzenn\nlangewiesen\nlassan\nlaubach\nlaucha\nlauchhammer\nlauchheim\nlauda\nlauenburg\nlauf\nlaufen\nlaufenburg\nlauffen\nlauingen\nlaupheim\nlauscha\nlauta\nlauter\nlauterbach\nlauterecken\nlauterstein\nlebach\nlebus\nleer\nlehesten\nlehrte\nleichlingen\nleimen\nleinefelde\nleinfelden\nleipheim\nleipzig\nleisnig\nlemgo\nlengenfeld\nlengerich\nlennestadt\nlenzen\nleonberg\nleun\nleuna\nleutenberg\nleutershausen\nleutkirch\nleverkusen\nlich\nlichtenau\nlichtenau\nlichtenberg\nlichtenfels\nlichtenfels\nlichtenstein\nliebenau\nliebenwalde\nlieberose\nliebstadt\nlimbach\nlimburg\nlindau\nlinden\nlindenberg\nlindenfels\nlindow\nlingen\nlinnich\nlinz\nlippstadt\nlohmar\nlohne\nlohr\nloitz\nlollar\nlommatzsch\nlorch\nlorch\nlorsch\nlucka\nluckau\nluckenwalde\nludwigsburg\nludwigsfelde\nludwigshafen\nludwigslust\nludwigsstadt\nlugau\nlunzenau\nlychen\nlöbau\nlöffingen\nlöhne\nlöningen\nlörrach\nlöwenstein\nlößnitz\nlübbecke\nlübben\nlübbenau\nlübeck\nlübtheen\nlübz\nlüchow\nlüdenscheid\nlüdinghausen\nlügde\nlüneburg\nlünen\nlütjenburg\nlützen\nmagdala\nmagdeburg\nmahlberg\nmainbernheim\nmainburg\nmaintal\nmainz\nmalchin\nmalchow\nmanderscheid\nmannheim\nmansfeld\nmarbach\nmarburg\nmarienberg\nmarienmünster\nmarkdorf\nmarkgröningen\nmarkkleeberg\nmarkneukirchen\nmarkranstädt\nmarktbreit\nmarktheidenfeld\nmarktleuthen\nmarktoberdorf\nmarktredwitz\nmarktsteft\nmarl\nmarlow\nmarne\nmarsberg\nmaulbronn\nmaxhütte\nmayen\nmechernich\nmeckenheim\nmedebach\nmeerane\nmeerbusch\nmeersburg\nmeinerzhagen\nmeiningen\nmeisenheim\nmeißen\nmeldorf\nmelle\nmellrichstadt\nmelsungen\nmemmingen\nmenden\nmendig\nmengen\nmeppen\nmerkendorf\nmerseburg\nmerzig\nmeschede\nmettmann\nmetzingen\nmeuselwitz\nmeyenburg\nmeßkirch\nmeßstetten\nmichelstadt\nmiesbach\nmiltenberg\nmindelheim\nminden\nmirow\nmittenwalde\nmitterteich\nmittweida\nmoers\nmonheim\nmonheim\nmonschau\nmontabaur\nmoosburg\nmoringen\nmosbach\nmunderkingen\nmunich\nmunster\nmurrhardt\nmylau\nmärkisch\nmöckern\nmöckmühl\nmölln\nmönchengladbach\nmörfelden\nmössingen\nmücheln\nmügeln\nmühlacker\nmühlberg\nmühldorf\nmühlhausen\nmühlheim\nmühlheim\nmülheim\nmülheim\nmüllheim\nmüllrose\nmünchberg\nmüncheberg\nmünchenbernsdorf\nmünnerstadt\nmünsingen\nmünster\nmünstermaifeld\nmünzenberg\nnabburg\nnagold\nnaila\nnassau\nnastätten\nnauen\nnaumburg\nnaumburg\nnaunhof\nnebra\nneckarbischofsheim\nneckargemünd\nneckarsteinach\nneckarsulm\nneresheim\nnetphen\nnettetal\nnetzschkau\nneu\nneu\nneu\nneubrandenburg\nneubukow\nneubulach\nneuburg\nneudenau\nneuenburg\nneuenbürg\nneuenhaus\nneuenrade\nneuenstadt\nneuenstein\nneuerburg\nneuffen\nneuhaus\nneukalen\nneukirchen\nneukirchen\nneukloster\nneumark\nneumarkt\nneumarkt\nneumünster\nneunburg\nneunkirchen\nneuruppin\nneusalza\nneuss\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustrelitz\nneusäß\nneutraubling\nneuwied\nneuötting\nnidda\nniddatal\nnidderau\nnideggen\nniebüll\nniedenstein\nnieder\nniederkassel\nniedernhall\nniederstetten\nniederstotzingen\nnieheim\nniemegk\nnienburg\nnienburg\nnierstein\nniesky\nnittenau\nnorden\nnordenham\nnorderney\nnorderstedt\nnordhausen\nnordhorn\nnortheim\nnortorf\nnossen\nnuremberg\nnördlingen\nnürtingen\nober\noberasbach\noberharz\noberhausen\noberhof\noberkirch\noberkochen\noberlungwitz\nobermoschel\nobernburg\noberndorf\nobernkirchen\noberriexingen\nobertshausen\noberursel\noberviechtach\noberweißbach\noberwesel\noberwiesenthal\nochsenfurt\nochsenhausen\nochtrup\noderberg\noebisfelde\noederan\noelde\noelsnitz\noelsnitz\noer\noerlinghausen\noestrich\noettingen\noffenbach\noffenburg\nohrdruf\nolbernhau\nolching\noldenburg\noldenburg\nolfen\nolpe\nolsberg\noppenau\noppenheim\noranienbaum\noranienburg\norlamünde\nornbau\nortenberg\nortrand\noschatz\noschersleben\nosnabrück\nosterburg\nosterburken\nosterfeld\nosterhofen\nosterholz\nosterode\nosterwieck\nostfildern\nostheim\nosthofen\nostritz\notterberg\notterndorf\nottweiler\noverath\nowen\npaderborn\npapenburg\npappenheim\nparchim\nparsberg\npasewalk\npassau\npattensen\npausa\npegau\npegnitz\npeine\npeitz\npenig\npenkun\npenzberg\npenzlin\nperleberg\npetershagen\npfaffenhofen\npfarrkirchen\npforzheim\npfreimd\npfullendorf\npfullingen\npfungstadt\nphilippsburg\npinneberg\npirmasens\npirna\nplattling\nplau\nplaue\nplauen\nplettenberg\npleystein\nplochingen\nplön\npockau\npocking\npohlheim\npolch\nporta\npotsdam\npottenstein\npreetz\npremnitz\nprenzlau\npressath\npreußisch\nprichsenstadt\npritzwalk\nprüm\npuchheim\npulheim\npulsnitz\nputbus\nputlitz\npößneck\npüttlingen\nquakenbrück\nquedlinburg\nquerfurt\nquickborn\nrabenau\nradeberg\nradebeul\nradeburg\nradevormwald\nradolfzell\nraguhn\nrahden\nrain\nramstein\nranis\nransbach\nrastatt\nrastenberg\nrathenow\nratingen\nratzeburg\nrauenberg\nraunheim\nrauschenberg\nravensburg\nravenstein\nrecklinghausen\nrees\nregen\nregensburg\nregis\nrehau\nrehburg\nrehna\nreichelsheim\nreichenbach\nreichenbach\nreinbek\nreinfeld\nreinheim\nremagen\nremda\nremscheid\nremseck\nrenchen\nrendsburg\nrennerod\nrenningen\nrerik\nrethem\nreutlingen\nrheda\nrhede\nrheinau\nrheinbach\nrheinberg\nrheinböllen\nrheine\nrheinfelden\nrheinsberg\nrheinstetten\nrhens\nrhinow\nribnitz\nrichtenberg\nriedenburg\nriedlingen\nriedstadt\nrieneck\nriesa\nrietberg\nrinteln\nrochlitz\nrockenhausen\nrodalben\nrodenberg\nrodewisch\nrodgau\nroding\nromrod\nronneburg\nronnenberg\nrosbach\nrosenfeld\nrosenheim\nrosenthal\nrostock\nrotenburg\nrotenburg\nroth\nrothenburg\nrothenburg\nrothenfels\nrottenburg\nrottenburg\nrottweil\nroßleben\nroßwein\nrudolstadt\nruhla\nruhland\nrunkel\nrutesheim\nröbel\nrödental\nrödermark\nrömhild\nrösrath\nrötha\nröthenbach\nröttingen\nrötz\nrüdesheim\nrüsselsheim\nrüthen\nsaalburg\nsaalfeld\nsaarbrücken\nsaarburg\nsaarlouis\nsachsenhagen\nsachsenheim\nsalzgitter\nsalzkotten\nsalzwedel\nsandau\nsandersdorf\nsangerhausen\nsankt\nsankt\nsankt\nsarstedt\nsassenberg\nsassnitz\nsayda\nschalkau\nschauenstein\nscheer\nscheibenberg\nscheinfeld\nschelklingen\nschenefeld\nscheßlitz\nschieder\nschifferstadt\nschillingsfürst\nschiltach\nschirgiswalde\nschkeuditz\nschkölen\nschleiden\nschleiz\nschleswig\nschlettau\nschleusingen\nschlieben\nschlitz\nschlotheim\nschloß\nschlüchtern\nschlüsselfeld\nschmalkalden\nschmallenberg\nschmölln\nschnackenburg\nschnaittenbach\nschneeberg\nschneverdingen\nschongau\nschopfheim\nschorndorf\nschortens\nschotten\nschramberg\nschraplau\nschriesheim\nschrobenhausen\nschrozberg\nschwaan\nschwabach\nschwabmünchen\nschwaigern\nschwalbach\nschwalmstadt\nschwandorf\nschwanebeck\nschwarzenbach\nschwarzenbach\nschwarzenbek\nschwarzenberg\nschwarzenborn\nschwarzheide\nschwedt\nschweich\nschweinfurt\nschwelm\nschwentinental\nschwerin\nschwerte\nschwetzingen\nschwäbisch\nschwäbisch\nschömberg\nschönau\nschönau\nschönberg\nschönebeck\nschöneck\nschönewalde\nschöningen\nschönsee\nschönwald\nschöppenstedt\nschüttorf\nsebnitz\nseehausen\nseeland\nseelow\nseelze\nseesen\nsehnde\nseifhennersdorf\nselb\nselbitz\nseligenstadt\nselm\nselters\nsenden\nsendenhorst\nsenftenberg\nseßlach\nsiegburg\nsiegen\nsigmaringen\nsimbach\nsimmern\nsindelfingen\nsingen\nsinsheim\nsinzig\nsoest\nsolingen\nsolms\nsoltau\nsondershausen\nsonneberg\nsonnewalde\nsonthofen\nsontra\nspaichingen\nspalt\nspangenberg\nspeicher\nspenge\nspeyer\nspremberg\nspringe\nsprockhövel\nstade\nstadt\nstadtallendorf\nstadtbergen\nstadthagen\nstadtilm\nstadtlengsfeld\nstadtlohn\nstadtoldendorf\nstadtprozelten\nstadtroda\nstadtsteinach\nstarnberg\nstaufen\nstaufenberg\nstavenhagen\nstaßfurt\nstein\nsteinach\nsteinau\nsteinbach\nsteinbach\nsteinfurt\nsteinheim\nsteinheim\nstendal\nsternberg\nstockach\nstolberg\nstollberg\nstolpen\nstorkow\nstraelen\nstralsund\nstrasburg\nstraubing\nstrausberg\nstrehla\nstromberg\nstutensee\nstuttgart\nstößen\nstühlingen\nsuhl\nsulingen\nsulz\nsulzbach\nsulzbach\nsulzburg\nsundern\nsyke\nsömmerda\nsüdliches\nsüßen\ntambach\ntangerhütte\ntangermünde\ntann\ntanna\ntauberbischofsheim\ntaucha\ntaunusstein\ntecklenburg\ntegernsee\ntelgte\nteltow\ntemplin\ntengen\ntessin\nteterow\ntettnang\nteublitz\nteuchern\nteupitz\nteuschnitz\nthale\nthalheim\nthannhausen\ntharandt\nthemar\nthum\ntirschenreuth\ntitisee\ntittmoning\ntodtnau\ntorgau\ntorgelow\ntornesch\ntraben\ntraunreut\ntraunstein\ntrebbin\ntrebsen\ntreffurt\ntrendelburg\ntreuchtlingen\ntreuen\ntreuenbrietzen\ntriberg\ntribsees\ntrier\ntriptis\ntrochtelfingen\ntroisdorf\ntrossingen\ntrostberg\ntuttlingen\ntwistringen\ntöging\ntönisvorst\ntönning\ntübingen\nuebigau\nueckermünde\nuelzen\nuetersen\nuffenheim\nuhingen\nulm\nulmen\nulrichstein\nummerstadt\nunkel\nunna\nunterschleißheim\nusedom\nusingen\nuslar\nvacha\nvaihingen\nvallendar\nvarel\nvechta\nvelbert\nvelburg\nvelden\nvelen\nvellberg\nvellmar\nvelten\nverden\nveringenstadt\nverl\nversmold\nvetschau\nviechtach\nviernheim\nviersen\nvillingen\nvilsbiburg\nvilseck\nvilshofen\nvisselhövede\nvlotho\nvoerde\nvogtsburg\nvohburg\nvohenstrauß\nvolkach\nvolkmarsen\nvreden\nvöhrenbach\nvöhringen\nvölklingen\nwachenheim\nwadern\nwaghäusel\nwahlstedt\nwaiblingen\nwaibstadt\nwaischenfeld\nwaldbröl\nwaldeck\nwaldenbuch\nwaldenburg\nwaldenburg\nwaldershof\nwaldheim\nwaldkappel\nwaldkirch\nwaldkirchen\nwaldkraiburg\nwaldmünchen\nwaldsassen\nwaldshut\nwalldorf\nwalldürn\nwallenfels\nwalsrode\nwaltershausen\nwaltrop\nwanfried\nwangen\nwanzleben\nwarburg\nwaren\nwarendorf\nwarin\nwarstein\nwassenberg\nwasserburg\nwassertrüdingen\nwasungen\nwedel\nweener\nwegberg\nwegeleben\nwehr\nweida\nweiden\nweikersheim\nweil\nweil\nweilburg\nweilheim\nweilheim\nweimar\nweingarten\nweinheim\nweinsberg\nweinstadt\nweismain\nweiterstadt\nweißenberg\nweißenburg\nweißenfels\nweißenhorn\nweißensee\nweißenstadt\nweißenthurm\nweißwasser\nwelzheim\nwelzow\nwemding\nwendlingen\nwerben\nwerdau\nwerder\nwerdohl\nwerl\nwermelskirchen\nwernau\nwerne\nwerneuchen\nwernigerode\nwertheim\nwerther\nwertingen\nwesel\nwesenberg\nwesselburen\nwesseling\nwesterburg\nwesterstede\nwetter\nwetter\nwettin\nwetzlar\nwiddern\nwiehe\nwiehl\nwiesbaden\nwiesensteig\nwiesloch\nwiesmoor\nwildau\nwildberg\nwildenfels\nwildeshausen\nwilhelmshaven\nwilkau\nwillebadessen\nwillich\nwilsdruff\nwilster\nwilthen\nwindischeschenbach\nwindsbach\nwinnenden\nwinsen\nwinterberg\nwipperfürth\nwirges\nwismar\nwissen\nwitten\nwittenberg\nwittenberge\nwittenburg\nwittichenau\nwittingen\nwittlich\nwittmund\nwittstock\nwitzenhausen\nwoldegk\nwolfach\nwolfenbüttel\nwolfhagen\nwolframs\nwolfratshausen\nwolfsburg\nwolfstein\nwolgast\nwolkenstein\nwolmirstedt\nworms\nwriezen\nwunsiedel\nwunstorf\nwuppertal\nwurzbach\nwurzen\nwustrow\nwyk\nwächtersbach\nwörrstadt\nwörth\nwörth\nwörth\nwülfrath\nwürselen\nwürzburg\nxanten\nzahna\nzarrentin\nzehdenick\nzeil\nzeitz\nzell\nzell\nzell\nzella\nzerbst\nzeulenroda\nzeven\nziegenrück\nzierenberg\nziesar\nzirndorf\nzittau\nzossen\nzschopau\nzweibrücken\nzwenkau\nzwickau\nzwiesel\nzwingenberg\nzwönitz\nzörbig\nzülpich\nöhringen\nöstringen\nübach\nüberlingen".split("\n"));
	this.addTrainingData("animals","Animals","aardvark\naardwolf\nalbatross\nalligator\nalpaca\nanaconda\nangelfish\nanglerfish\nant\nanteater\nantelope\nantlion\nape\naphid\narmadillo\nasp\nass\nbaboon\nbadger\nbaldeagle\nbandicoot\nbarnacle\nbarracuda\nbasilisk\nbass\nbat\nbear\nbeaver\nbedbug\nbee\nbeetle\nbird\nbison\nblackbird\nblackpanther\nblackwidow\nbluebird\nbluejay\nbluewhale\nboa\nboar\nbobcat\nbonobo\nbuffalo\nbutterfly\nbuzzard\ncamel\ncapybara\ncaribou\ncarp\ncat\ncaterpillar\ncatfish\ncatshark\ncentipede\nchameleon\ncheetah\nchickadee\nchicken\nchimpanzee\nchinchilla\nchipmunk\nclam\nclownfish\ncobra\ncockroach\ncod\ncondor\ncoral\ncougar\ncow\ncoyote\ncrab\ncrane\ncranefly\ncrayfish\ncricket\ncrocodile\ncrow\ncuckoo\ndamselfly\ndeer\ndingo\ndog\ndolphin\ndonkey\ndormouse\ndove\ndragonfly\nduck\ndungbeetle\neagle\nearthworm\nearwig\nechidna\neel\negret\nelephant\nelephantseal\nelk\nemu\nermine\nfalcon\nferret\nfinch\nfirefly\nfish\nflamingo\nflea\nfly\nfowl\nfox\nfrog\nfruitbat\ngalliform\ngamefowl\ngazelle\ngecko\ngerbil\ngiantpanda\ngiantsquid\ngibbon\ngiraffe\ngoat\ngoldfish\ngoose\ngopher\ngorilla\ngrasshopper\ngrizzlybear\ngroundshark\ngroundsloth\ngrouse\nguan\nguanaco\nguineafowl\nguineapig\ngull\nhaddock\nhalibut\nhammerheadshark\nhamster\nhare\nhawk\nhedgehog\nhermitcrab\nheron\nherring\nhippopotamus\nhornet\nhorse\nhoverfly\nhummingbird\nhumpbackwhale\nhyena\niguana\njackal\njaguar\njay\njellyfish\nkangaroo\nkingfisher\nkiwi\nkoala\nkoi\nkomodo\nkrill\nladybug\nlamprey\nlark\nleech\nlemming\nlemur\nleopard\nlimpet\nlion\nlizard\nllama\nlobster\nlocust\nloon\nlouse\nlynx\nmacaw\nmackerel\nmagpie\nmammal\nmanatee\nmantaray\nmarmoset\nmarmot\nmeadowlark\nmeerkat\nmink\nminnow\nmite\nmockingbird\nmole\nmollusk\nmongoose\nmonitor\nmonkey\nmoose\nmosquito\nmoth\nmouse\nmule\nnarwhal\nnewt\nnightingale\noctopus\norangutan\norca\nostrich\notter\nowl\nox\npanda\npanther\nparakeet\nparrot\npartridge\npeacock\npeafowl\npelican\npenguin\nperch\nperegrine\npheasant\npig\npigeon\npike\npiranha\nplatypus\npolarbear\npony\nporcupine\nporpoise\npossum\nprairiedog\nprawn\nprayingmantis\nprimate\npuffin\npuma\npython\nquail\nrabbit\nraccoon\nrat\nrattlesnake\nraven\nredpanda\nreindeer\nreptile\nrhinoceros\nroadrunner\nrodent\nrook\nrooster\nsalamander\nsalmon\nscorpion\nseahorse\nsealion\nseaslug\nseasnail\nshark\nsheep\nshrew\nshrimp\nsilkworm\nsilverfish\nskink\nskunk\nsloth\nslug\nsnail\nsnake\nsnipe\nsole\nsparrow\nspermwhale\nspider\nspidermonkey\nsquid\nsquirrel\nstarfish\nstingray\nstoat\nstork\nswallow\nswan\nswift\nswordfish\nswordtail\ntarantula\ntermite\nthrush\ntiger\ntigershark\ntoad\ntortoise\ntoucan\ntreefrog\ntrout\ntuna\nturkey\nturtle\ntyrannosaurus\nvampirebat\nviper\nvole\nvulture\nwallaby\nwalrus\nwasp\nwaterbuffalo\nweasel\nwhale\nwhitefish\nwildcat\nwildebeest\nwolf\nwolverine\nwombat\nwoodpecker\nyak\nzebra".split("\n"));
	this.addTrainingData("pokemon","Pokemon","abra\naerodactyl\nalakazam\narbok\narcanine\narticuno\nbeedrill\nbellsprout\nblastoise\nbulbasaur\nbutterfree\ncaterpie\nchansey\ncharizard\ncharmander\ncharmeleon\nclefable\nclefairy\ncloyster\ncubone\ndewgong\ndiglett\nditto\ndodrio\ndoduo\ndragonair\ndragonite\ndratini\ndrowzee\ndugtrio\neevee\nekans\nelectabuzz\nelectrode\nexeggcute\nexeggutor\nfarfetchd\nfearow\nflareon\ngastly\ngengar\ngeodude\ngloom\ngolbat\ngoldeen\ngolduck\ngolem\ngraveler\ngrimer\ngrowlithe\ngyarados\nhaunter\nhitmonchan\nhitmonlee\nhorsea\nhypno\nivysaur\njigglypuff\njolteon\njynx\nkabuto\nkabutops\nkadabra\nkakuna\nkangaskhan\nkingler\nkoffing\nkrabby\nlapras\nlickitung\nmachamp\nmachoke\nmachop\nmagikarp\nmagmar\nmagnemite\nmagneton\nmankey\nmarowak\nmeowth\nmetapod\nmew\nmewtwo\nmime\nmoltres\nmuk\nnidoking\nnidoqueen\nnidoran\nnidoran\nnidorina\nnidorino\nninetales\noddish\nomanyte\nomastar\nonix\nparas\nparasect\npersian\npidgeot\npidgeotto\npidgey\npikachu\npinsir\npoliwag\npoliwhirl\npoliwrath\nponyta\nporygon\nprimeape\npsyduck\nraichu\nrapidash\nraticate\nrattata\nrhydon\nrhyhorn\nsandshrew\nsandslash\nscyther\nseadra\nseaking\nseel\nshellder\nslowbro\nslowpoke\nsnorlax\nspearow\nsquirtle\nstarmie\nstaryu\ntangela\ntauros\ntentacool\ntentacruel\nvaporeon\nvenomoth\nvenonat\nvenusaur\nvictreebel\nvileplume\nvoltorb\nvulpix\nwartortle\nweedle\nweepinbell\nweezing\nwigglytuff\nzapdos\nzubat".split("\n"));
	this.addTrainingData("fish","Fish","albacore\nalbacore\nalewife\nalfonsino\nalgaeeater\nalligator\nalligatorfish\namberjack\nanchovy\nanchovy\nanemonefish\nangelfish\nangler\nanglerfish\narapaima\narcherfish\narmorhead\narowana\narrowtooth\naruana\nayu\nbaikal\nbala\nballan\nbandfish\nbangus\nbanjo\nbarb\nbarbel\nbarfish\nbarracuda\nbarracuda\nbarracudina\nbarramundi\nbarreleye\nbaskingshark\nbass\nbasslet\nbasslet\nbatfish\nbatfish\nbatray\nbeachsalmon\nbeardfish\nbetta\nbichir\nbigeye\nbigscale\nbillfish\nbitterling\nblackchin\nblackfish\nblackfish\nbleak\nblenny\nblenny\nblobfish\nblowfish\nblueeye\nbluefin\nbluefish\nbluegill\nboafish\nboarfish\nbocaccio\nboga\nbonefish\nbonito\nbonnetmouth\nbonytongue\nbowfin\nboxfish\nbream\nbream\nbrill\nbristlemouth\nbristlenose\nbrooder\nbrotula\nbrotula\nbuffalo\nbuffalofish\nbullhead\nbullheadshark\nbullshark\nbulltrout\nburbot\nburi\nburmadanio\nburrfish\nbutterflyfish\nbutterflyray\ncandiru\ncandlefish\ncapelin\ncardinalfish\ncardinalfish\ncardinaltetra\ncarp\ncarp\ncarp\ncarpetshark\ncarpetshark\ncarpsucker\ncatalufa\ncatalufa\ncatfish\ncatfish\ncatla\ncatshark\ncavefish\nchannelbass\nchannelcatfish\nchar\nchar\ncherrysalmon\ncherubfish\nchimaera\nchimaera\nchinooksalmon\nchub\nchub\nchubsucker\nchumsalmon\ncichlid\ncichlid\ncisco\nclingfish\nclingfish\nclownfish\ncobbler\ncobia\ncod\ncod\ncodlet\ncodlet\ncodling\ncoelacanth\ncoffinfish\ncohosalmon\ncoley\ncombfish\nconger\ncookiecutter\ncoolieloach\ncornetfish\ncorydoras\ncowfish\ncownose\ncowshark\ncrappie\ncrestfish\ncroaker\ncrocodileshark\ncuckoowrasse\ncusk\ncuskeel\ncutlassfish\ncutthroateel\ncutthroattrout\ndab\ndace\ndace\ndaggertooth\ndaggertooth\ndamselfish\ndanio\ndanio\ndanio\ndarter\ndarter\ndarter\ndartfish\ndealfish\ndemoiselle\ndevario\ndevilray\ndhufish\ndiscus\ndiver\ndogfish\ndogfish\ndogteeth\ndolphinfish\ndorab\ndorado\ndory\ndory\ndottyback\ndragonet\ndragonfish\ndragonfish\ndragongoby\ndriftfish\ndrum\nduckbill\nduskygrouper\neagleray\neel\neelgoby\neelpout\neeltailcatfish\nelasmobranch\nelectriceel\nelephantnose\nelephantnose\nelver\nemperor\nescolar\nescolar\neulachon\nfangtooth\nfeatherback\nfierasfer\nfilefish\nfingerfish\nfirefish\nflagblenny\nflagfin\nflagfish\nflagtail\nflashlightfish\nflatfish\nflathead\nflathead\nflier\nflounder\nflounder\nflyingfish\nflyingfish\nfootballfish\nfringehead\nfrogfish\nfusilier\ngaljoen\ngangesshark\ngar\ngaribaldi\ngarpike\nghostfish\nghostflathead\nghostknifefish\nghostpipefish\nghostshark\nghoul\ngibberfish\nglassfish\nglassfish\ngoatfish\ngoatfish\ngoby\ngoby\ngoldentrout\ngoldeye\ngoldfish\ngombessa\ngoosefish\ngourami\ngourami\ngourami\ngraveldiver\ngrayling\ngrayling\ngreeneye\ngreenling\ngrenadier\ngroundshark\ngrouper\ngrunion\ngrunt\ngrunter\ngruntsculpin\ngudgeon\nguitarfish\ngulper\ngulper\ngunnel\ngunnel\nguppy\ngurnard\ngurnard\ngurnard\nhaddock\nhagfish\nhairtail\nhake\nhake\nhalfbeak\nhalfmoon\nhalibut\nhalibut\nhalosaur\nhamlet\nhammerhead\nhammerjaw\nhandfish\nhardhead\nharelip\nhatchetfish\nhatchetfish\nhawkfish\nherring\nherring\nhogsucker\nhoki\nhornshark\nhorsefish\nhorsemackerel\nhoundshark\nhoundshark\nhuchen\nhussar\nicefish\nicefish\nide\nilisha\ninanga\ninconnu\njack\njackfish\njavelin\njawfish\njellynose\njewel\njewelfish\njewfish\njohndory\nkafue\nkahawai\nkaluga\nkanyu\nkelpfish\nkelpfish\nkelpperch\nkillifish\nkillifish\nkingfish\nkingofthesalmon\nknifefish\nknifefish\nknifejaw\nkoi\nkokanee\nkokopu\nlabyrinthfish\nladyfish\nlagena\nlampfish\nlampfish\nlamprey\nlamprey\nlancetfish\nlanternfish\nlanternshark\nlargemouth\nleaffish\nleatherjacket\nlefteyeflounder\nlemonshark\nlemonsole\nlenok\nleopard\nlightfish\nlimia\nlinedsole\nling\nlingcod\nlionfish\nlionfish\nlivebearer\nlizardfish\nloach\nlongfin\nloosejaw\nlouvar\nluderick\nlumpsucker\nlungfish\nlungfish\nmackerel\nmackerel\nmackerelshark\nmadtom\nmahseer\nmakoshark\nmanefish\nmanofwar\nmantaray\nmarblefish\nmarlin\nmasu\nmedaka\nmedusafish\nmegamouthshark\nmenhaden\nmenhaden\nmilkfish\nminnow\nminnow\nminnowofthedeep\nmodocsucker\nmojarra\nmola\nmola\nmonkfish\nmooneye\nmoonfish\nmora\nmoray\nmoray\nmorid\nmorwong\nmosquitofish\nmouthbrooder\nmrigal\nmudcat\nmudfish\nmudminnow\nmudminnow\nmudminnow\nmudskipper\nmudsucker\nmudsucker\nmullet\nmullet\nmummichog\nmurraycod\nmuskellunge\nmustardeel\nnase\nneedlefish\nnibblefish\nnoodlefish\nnoodlefish\nnurseryfish\nnurseshark\noarfish\noilfish\noilfish\noldwife\nopah\nopaleye\noscar\npaddlefish\npanga\nparadisefish\nparore\nparrotfish\nparrotfish\npeacockflounder\npeamouth\npearleye\npearlfish\npelicaneel\npencilfish\npencilsmelt\nperch\npickerel\npickerel\npigfish\npike\npikeblenny\npikeconger\npikeperch\npilchard\npilotfish\npineapplefish\npineconefish\npinksalmon\npipefish\npiranha\npirarucu\npirateperch\nplaice\nplaty\nplatyfish\npleco\nplownose\npoacher\npollock\npollock\npollyfish\npomfret\npomfret\npompano\nponyfish\nporbeagle\nporcupinefish\nporgy\npowen\nprickleback\nprickleback\npricklefish\npricklyshark\nprowfish\nprowfish\npuffer\npuffer\npufferfish\npumpkinseed\npupfish\npupfish\npíntano\nquillback\nquillfish\nrabbitfish\nragfish\nrainbowfish\nrainbowfish\nrainbowtrout\nrasbora\nratfish\nrattail\nray\nrazorfish\nredfin\nredfish\nredlip\nredmouth\nredsalmon\nredsnapper\nreedfish\nreefshark\nreefshark\nremora\nrequiemshark\nribboneel\nribbonfish\nriceeel\nricefish\nridgehead\nrivuline\nrivuline\nroach\nroanokebass\nrockbass\nrockbeauty\nrockcod\nrockfish\nrockfish\nrockfish\nrockling\nrohu\nronquil\nroosterfish\nropefish\nroughscad\nroughsculpin\nroughy\nroughy\nroundhead\nrudd\nrudderfish\nruffe\nsabertooth\nsabertoothfish\nsablefish\nsailfish\nsalamanderfish\nsalmon\nsalmon\nsalmonshark\nsandbarshark\nsandburrower\nsanddab\nsanddiver\nsandeel\nsandfish\nsandgoby\nsandknifefish\nsandlance\nsandperch\nsandroller\nsandstargazer\nsandtiger\nsandtilefish\nsardine\nsargassumfish\nsauger\nsaury\nsaury\nsawfish\nsawshark\nscabbardfish\nscabbardfish\nscalyfin\nscat\nscissortail\nscorpionfish\nsculpin\nsculpin\nsculpin\nscup\nseabass\nseabream\nseacatfish\nseachub\nseadevil\nseadragon\nseahorse\nsealamprey\nseamoth\nsearaven\nsearobin\nsearobin\nsearobin\nseasnail\nseatoad\nshad\nshad\nshark\nsharksucker\nsharpnose\nsheatfish\nsheepshead\nsheepshead\nshiner\nshiner\nshrimpfish\nsiamesefightingfish\nsillago\nsilverside\nsilverside\nsixgillray\nsixgillshark\nskate\nskilfish\nskipjacktuna\nsleeper\nsleepershark\nslickhead\nslimehead\nslipmouth\nsmelt\nsmelt\nsmeltwhiting\nsnailfish\nsnakeeel\nsnakehead\nsnapper\nsnapper\nsnipeeel\nsnipeeel\nsnipeeel\nsnipefish\nsnoek\nsnook\nsnubnose\nsoldierfish\nsole\nspadefish\nspaghettieel\nspearfish\nspeckledtrout\nspiderfish\nspikefish\nspinefoot\nspinyfin\nsplitfin\nspookfish\nsprat\nspringfish\nsquaretail\nsquaretail\nsquaretail\nsquawfish\nsquawfish\nsquawfish\nsqueaker\nsquirrelfish\nstargazer\nstargazer\nsteelhead\nstickleback\nstickleback\nstingfish\nstingray\nstingray\nstonecat\nstonefish\nstoneroller\nsturgeon\nsturgeon\nsturgeon\nsucker\nsunfish\nsunfish\nsunfish\nsurfperch\nsurgeonfish\nswallower\nswallower\nswampeel\nswampfish\nsweeper\nswordfish\nswordtail\nswordtail\nsábalo\ntadpolefish\ntailor\ntaimen\ntang\ntang\ntapetail\ntarpon\ntarwhine\ntelescopefish\ntench\ntenpounder\ntenuis\ntetra\ntetra\nthornfish\nthreadfin\nthreadtail\nthresher\ntigerbarb\ntigerperch\ntigershark\ntilapia\ntilefish\ntoadfish\ntommyruff\ntompot\ntonguefish\ntope\ntopminnow\ntorpedo\ntrahira\ntreefish\ntrevally\ntrevally\ntriggerfish\ntriggerfish\ntriplefin\ntriplespine\ntripletail\ntrout\ntroutperch\ntrumpeter\ntrumpetfish\ntrunkfish\ntubeblenny\ntubeeye\ntubeshoulder\ntubesnout\ntuna\ntunny\nturbot\nturkeyfish\nuaru\nunicornfish\nunicornfish\nvanjaram\nvelvetfish\nvelvetfish\nvendace\nvimba\nviperfish\nviperfish\nwahoo\nwallago\nwalleye\nwalu\nwarmouth\nwartyangler\nwaryfish\nwaspfish\nweaselshark\nweatherfish\nweaver\nweever\nweeverfish\nwhalefish\nwhalefish\nwhalefish\nwhaleshark\nwhiff\nwhitebait\nwhitecroaker\nwhitefish\nwhitefish\nwhitemarlin\nwhiteshark\nwhiteshark\nwhitetip\nwhitetipshark\nwhiting\nwhiting\nwobbegong\nwolfeel\nwolffish\nwolfherring\nwormeel\nwormfish\nwrasse\nwrasse\nwrymouth\nyellowbass\nyellowhead\nyellowjack\nyellowmargin\nyellowtail\nzander\nzebrafish\nzebraloach\nzebrashark\nziege\nzingel".split("\n"));
	this.addTrainingData("plantscommon","Plants (Common Names)","africanrice\nalder\nalmond\nambrosia\namyroot\napple\napricot\narfaj\narrowwood\nash\nashleavedmaple\nasianrice\nazolla\nbabyrose\nbamboo\nbanana\nbankcress\nbaobab\nbay\nbaylaurel\nbean\nbearberry\nbearcorn\nbeech\nbermudacress\nbindweed\nbirch\nbirdsnest\nbittercress\nbittersweet\nbitterweed\nblackalder\nblackash\nblackberry\nblackbirch\nblackcap\nblackcherry\nblackhaw\nblackiehead\nblackmaple\nblackoak\nblackraspberry\nblackweed\nblueash\nblueberry\nblueoak\nboleanbirch\nbowwood\nbox\nboxelder\nboxwood\nbrier\nbrittlebush\nbroadleaf\nbrownbetty\nbuckeye\nbuffaloweed\nbulbouscress\nbullnettle\nburoak\nbutterflyweed\ncabbage\ncaneash\ncanoebirch\ncarrot\ncarrotweed\nchampionoak\ncherry\ncherrybirch\nchestnut\nchiggerflower\nchristmasfern\nchrysanthemum\ncinnamon\nclove\nclover\nclumpfoot\ncoakum\ncoastliveoak\ncoconut\ncoffeeplant\ncolicweed\ncollard\ncolwort\ncommonalder\nconeflower\ncorkoak\ncornel\ncornelian\ncornsowthistle\ncornthistle\ncorydalis\ncottonplant\ncreekmaple\ncress\ncrowfoot\ncrowsnest\ncrowstoes\ncucumber\ncursedthistle\ncutleafmaple\ndaisy\ndamerocket\ndeadlynightshade\ndeadnettle\ndevilsbite\ndevilsnose\ndevilsplague\ndewberry\ndindle\ndogwood\ndrumstick\nduckretten\nduscle\ndyeleaves\ndyersoak\nearthgall\neucalyptus\neytelia\nfalsealder\nfalsebox\nfellenwort\nfelonwood\nfelonwort\nfennel\nferns\nfeverbush\nfeverfew\nfig\nflax\nfluxroot\nfumewort\ngallberry\ngarget\ngarlic\ngarlicmustard\ngarlicroot\ngilliflower\ngoldenbuttons\ngoldengarlic\ngoldenglow\ngoosetongue\ngordaldo\ngrapefruit\ngrapevine\ngrayalder\ngraybirch\ngreenash\ngreenthistle\ngroundberry\ngutweed\nhaldi\nhardthistle\nharesthistle\nharlequin\nhayfever\nhealingblade\nhedgeplant\nhellebore\nhemp\nhempdogbane\nhenplant\nhogweed\nholly\nhoneymesquite\nhorsecane\nhorsenettle\nhoundsberry\nhouseleek\nhuckleberry\nindianhemp\nindianposy\ninkberry\ninkberryholly\nironwood\nislandoak\nitchweed\nivy\njackinthebush\njalap\njudastree\njuneberry\njuniper\nkeek\nkinnikinnik\nkousa\nkudzu\nlaceflower\nlambscress\nlambsfoot\nlandcress\nlavender\nleek\nlemon\nlettuce\nlilac\nlilyleek\nlovevine\nlowrose\nmahoganybirch\nmaize\nmango\nmaple\nmapleash\nmapleash\nmeadowholly\nmesquite\nmilfoil\nmilkthistle\nmilkweed\nmilkytassel\nmirbeckoak\nmoosemaple\nmoosewood\nmorel\nmosquitofern\nmulberry\nneem\nnettle\nnightshade\nnoddingthistle\nnorthernoak\nnosebleed\noak\nolive\nonion\norangeroot\nosage\nosageapple\npaperbirch\nparsley\nparsnip\npea\npeach\npeanut\npear\npellitory\npennyhedge\npepperroot\nperennialthistle\npigeonberry\npine\npineapple\npinoak\npistachio\nplane\nplantain\npleurisyroot\npoisonberry\npoisonflower\npoisonivy\npoke\npokeroot\npokeweed\npolecatweed\npolkweed\npoplar\npoppy\npossumhaw\npotato\nprairierose\npricklythistle\npudina\npurpleraspberry\nquercitron\nradicalweed\nragweed\nragwort\nramblerrose\nrantipole\nrapeseed\nraspberry\nredash\nredbirch\nredbrush\nredbud\nredmulberry\nredoak\nredweed\nrheumatismroot\nrhubarb\nribwort\nrice\nriverash\nriverbirch\nrivermaple\nroadweed\nrocket\nrocketcress\nrose\nrosemary\nrumcherry\nrye\nsandbrier\nsanguinary\nsaskatoon\nscarletberry\nscoke\nscotchcap\nscruboak\nscurvycress\nscurvygrass\nserviceberry\nshadblow\nshadbush\nsilkweed\nsilverbirch\nsilvermaple\nskunkcabbage\nskunkweed\nsnakeberry\nsneezeweed\nsneezewort\nsnowdrop\nsoftmaple\nsorrel\nsowthistle\nspanishoak\nspeckledalder\nspeedwell\nspicebirch\nspoolwood\nspottedoak\nspringcress\nsquawbush\nstagbush\nstammerwort\nstickweed\nstrawberry\nstripedalder\nstripedmaple\nsugarcane\nsugarmaple\nsugarplum\nsummerlilac\nsunflower\nswallowwort\nswallowwort\nswampash\nswampcabbage\nswampholly\nswampmaple\nswampoak\nswampsilkweed\nsweetbirch\nsweetpotato\nsweetrocket\nswinethistle\nswinies\nswordferns\nsycamore\ntansy\ntasselweed\ntea\nthimbleberry\nthimbleweed\nthistle\nthousandleaf\nthousandseal\nthyme\ntickleweed\ntobaccoplant\ntomato\ntoothwort\ntouchmenot\ntreadsoftly\ntreeonion\ntrillium\ntuberroot\ntulip\ntulsi\nuplandcress\nvalleyoak\nvanillaorchid\nviburnum\nviolet\nvioletbloom\nvirginbower\nwakerobin\nwalnut\nwaterash\nwaterbirch\nwaterfern\nwatermaple\nwaybread\nwaythistle\nweepingbirch\nweepingbirch\nwheat\nwhitealder\nwhiteash\nwhitebirch\nwhitebirch\nwhitemaple\nwhitemulberry\nwhiteoak\nwhiteroot\nwhitetansy\nwildblackcherry\nwildcherry\nwildcotton\nwildgarlic\nwildhops\nwildrose\nwildtansy\nwillow\nwindroot\nwineberry\nwinterberry\nwintercress\nwinterrocket\nwoodbine\nwoodynightshade\nwormwood\nwoundrocket\nwoundwort\nyam\nyarrow\nyellowbirch\nyellowdaisy\nyellowfumewort\nyellowrocket\nyellowwood\nzedoary".split("\n"));
	this.addTrainingData("countries","Countries","afghanistan\nafrica\nalbania\nalgeria\nandorra\nangola\nantigua\narabia\nargentina\narmenia\nascension\naustralia\naustria\nbahamas\nbahrain\nbangladesh\nbarbados\nbelarus\nbelgium\nbelize\nbermuda\nbolivia\nbosnia\nbotswana\nbrazil\nbritain\nbrunei\nbulgaria\nburundi\ncambodia\ncameroon\ncanada\nchad\nchile\nchina\nchina\ncolombia\ncongo\ncostarica\ncroatia\ncuba\ncyprus\ncyrenaica\nczech\ndenmark\necuador\negypt\nemirates\neritrea\nestonia\nethiopia\nfalklands\nfinland\nfrance\ngambia\ngeorgia\ngermany\nghana\ngreece\ngreenland\ngrenada\nguam\nguatemala\nguernsey\nguinea\nguinea\nhaiti\nhongkong\nhungary\niceland\nindia\nindonesia\niran\niraq\nireland\nisrael\nitaly\njamaica\njapan\njordan\nkashmir\nkenya\nkorea\nkosovo\nkurdistan\nkuwait\nlaos\nlatvia\nlebanon\nlibya\nliechtenstein\nlithuania\nluxembourg\nmacau\nmacedonia\nmadagascar\nmalaysia\nmaldives\nmali\nmalta\nmexico\nmicronesia\nmonaco\nmongolia\nmorocco\nmozambique\nnepal\nnetherlands\nnicaragua\nniger\nnigeria\nnorway\nnorway\noman\npakistan\npalestine\npanama\nparaguay\nperu\nphilippines\npoland\nportugal\nromania\nross\nrussia\nrwanda\nsalvador\nsaudi\nserbia\nseychelles\nsingapore\nslovakia\nslovenia\nsomalia\nspain\nsudan\nsudan\nsvalbard\nsweden\nswitzerland\nsyria\ntaiwan\ntaiwan\nthailand\ntimor\ntobago\ntrinidad\ntunisia\nturkey\nturkmenistan\nuganda\nukraine\nunitedkingdom\nuruguay\nuzbekistan\nvanuatu\nvatican\nvenezuela\nvietnam\nyemen\nzealand\nzimbabwe".split("\n"));
	this.addTrainingData("clothing","Clothing","anorak\nbikini\nblazer\nbloomers\nblouse\nbra\ncape\ncardigan\ncloak\ncoat\ncorset\ndress\ndungarees\nfrock\ngarters\ngloves\ngown\njacket\njeans\njumper\nkilt\nkimino\nknickers\nleggings\nleotard\nlingerie\nlongjohns\nmackintosh\nmittens\nnegligee\nnightgown\nnylons\noveralls\novercoat\npajamas\npants\npetticoat\nponcho\nraincoat\nrobe\nsari\nsarong\nscarf\nshirt\nskirt\nskivvy\nslacks\nsocks\nstockings\nsuit\nsweater\nsweatshirt\ntie\ntrousers\ntshirt\ntuxedo\nunderclothes\nunderpants\nundershirt\nunderwear\nuniform\nveil\nvest\nwaistcoat".split("\n"));
	if(!this.isQueryStringEmpty()) this.trainingData.push(new _$Main_TrainingData("custom","Custom",[]));
	window.onload = $bind(this,this.onWindowLoaded);
};
Main.__name__ = true;
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	addTrainingData: function(value,display,data) {
		this.trainingData.push(new _$Main_TrainingData(value,display,data));
	}
	,onWindowLoaded: function() {
		this.nameDataPresetListElement = window.document.getElementById("trainingdatalist");
		this.trainingDataTextEdit = window.document.getElementById("trainingdataedit");
		this.orderElement = window.document.getElementById("order");
		this.priorElement = window.document.getElementById("prior");
		this.maxProcessingTimeElement = window.document.getElementById("maxtime");
		this.noNamesFoundElement = window.document.getElementById("nonamesfound");
		this.currentNamesElement = window.document.getElementById("currentnames");
		this.generateElement = window.document.getElementById("generate");
		this.lengthElement = window.document.getElementById("minmaxlength");
		this.startsWithElement = window.document.getElementById("startswith");
		this.endsWithElement = window.document.getElementById("endswith");
		this.includesElement = window.document.getElementById("includes");
		this.excludesElement = window.document.getElementById("excludes");
		this.similarElement = window.document.getElementById("similar");
		this.shareLinkElement = window.document.getElementById("shareurl");
		this.shareLinkTextEdit = window.document.getElementById("shareedit");
		this.buildTrainingDataList();
		this.applySettings();
		this.createSliders();
		this.addEventListeners();
	}
	,getElementReferences: function() {
		this.nameDataPresetListElement = window.document.getElementById("trainingdatalist");
		this.trainingDataTextEdit = window.document.getElementById("trainingdataedit");
		this.orderElement = window.document.getElementById("order");
		this.priorElement = window.document.getElementById("prior");
		this.maxProcessingTimeElement = window.document.getElementById("maxtime");
		this.noNamesFoundElement = window.document.getElementById("nonamesfound");
		this.currentNamesElement = window.document.getElementById("currentnames");
		this.generateElement = window.document.getElementById("generate");
		this.lengthElement = window.document.getElementById("minmaxlength");
		this.startsWithElement = window.document.getElementById("startswith");
		this.endsWithElement = window.document.getElementById("endswith");
		this.includesElement = window.document.getElementById("includes");
		this.excludesElement = window.document.getElementById("excludes");
		this.similarElement = window.document.getElementById("similar");
		this.shareLinkElement = window.document.getElementById("shareurl");
		this.shareLinkTextEdit = window.document.getElementById("shareedit");
	}
	,buildTrainingDataList: function() {
		this.trainingData.sort(function(a,b) {
			var left = a.displayName.toLowerCase();
			var right = b.displayName.toLowerCase();
			if(left < right) return -1;
			if(left > right) return 1;
			return 0;
		});
		var _g = 0;
		var _g1 = this.trainingData;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			var option;
			var _this = window.document;
			option = _this.createElement("option");
			option.appendChild(window.document.createTextNode(data.displayName));
			option.value = data.value;
			this.nameDataPresetListElement.appendChild(option);
		}
	}
	,isQueryStringEmpty: function() {
		var params = window.location.search.substring(1);
		if(params == null || params == "") return true;
		return false;
	}
	,applySettings: function() {
		this.set_trainingDataKey("animals");
		this.numToGenerate = 100;
		this.minLength = 5;
		this.maxLength = 11;
		this.order = 3;
		this.prior = 0.005;
		this.maxProcessingTime = 800;
		this.set_startsWith("");
		this.set_endsWith("");
		this.set_includes("");
		this.set_excludes("");
		this.set_similar("");
		if(this.isQueryStringEmpty()) return;
		var params = window.location.search.substring(1);
		var splitParams = params.split("&");
		var customTrainingData = [];
		var sharedResultData = [];
		var _g = 0;
		while(_g < splitParams.length) {
			var param = splitParams[_g];
			++_g;
			var kv = param.split("=");
			if(kv.length < 2) continue;
			var k = decodeURIComponent(kv[0].split("+").join(" "));
			var v = decodeURIComponent(kv[1].split("+").join(" "));
			switch(k) {
			case "r":
				sharedResultData.push(v);
				break;
			case "w":
				customTrainingData.push(v);
				break;
			case "length_range_min":
				this.minLength = Std.parseInt(v);
				break;
			case "length_range_max":
				this.maxLength = Std.parseInt(v);
				break;
			case "order":
				this.order = Std.parseInt(v);
				break;
			case "prior":
				this.prior = parseFloat(v);
				break;
			case "max_processing_time":
				this.maxProcessingTime = Std.parseInt(v);
				break;
			case "starts_with":
				this.set_startsWith(v);
				break;
			case "ends_width":
				this.set_endsWith(v);
				break;
			case "includes":
				this.set_includes(v);
				break;
			case "excludes":
				this.set_excludes(v);
				break;
			case "similar_to":
				this.set_similar(v);
				break;
			}
		}
		if(sharedResultData.length > 0) {
			this.lastNames = sharedResultData;
			this.setNames(this.lastNames);
		}
		if(customTrainingData.length > 3) {
			var data = this.getTrainingDataForKey("custom");
			data.data = customTrainingData;
			this.set_trainingDataKey("custom");
		}
	}
	,makeCustomQueryString: function() {
		var s = "http://www.samcodes.co.uk/project/markov-namegen/";
		var appendKv = function(k,v,sep) {
			if(sep == null) sep = "&";
			if(k == null || k.length == 0 || v == null || v.length == 0) return;
			s += sep + encodeURIComponent(k) + "=" + encodeURIComponent(v);
		};
		appendKv("length_range_min",Std.string(this.minLength),"?");
		appendKv("length_range_max",Std.string(this.maxLength));
		appendKv("order",Std.string(this.order));
		appendKv("prior",Std.string(this.prior));
		appendKv("max_processing_time",Std.string(this.maxProcessingTime));
		appendKv("starts_with",this.get_startsWith());
		appendKv("ends_width",this.get_endsWith());
		appendKv("includes",this.get_includes());
		appendKv("excludes",this.get_excludes());
		appendKv("similar_to",this.get_similar());
		var data = this.trainingDataTextEdit.value.split(" ");
		if(data.length > 1) {
			var _g = 0;
			while(_g < data.length) {
				var word = data[_g];
				++_g;
				if(word != null && word.length != 0) appendKv("w",word);
			}
		}
		if(this.lastNames.length > 0) {
			var _g1 = 0;
			var _g11 = this.lastNames;
			while(_g1 < _g11.length) {
				var name = _g11[_g1];
				++_g1;
				if(name != null && name.length != 0) appendKv("r",name);
			}
		}
		return s;
	}
	,createSliders: function() {
		var _g = this;
		noUiSlider.create(this.orderElement,{ start : [this.order], connect : "lower", range : { 'min' : [1,1], 'max' : [9]}, pips : { mode : "range", density : 10}});
		this.createTooltips(this.orderElement);
		this.orderElement.noUiSlider.on("change",function(values,handle,rawValues) {
			_g.order = values[handle] | 0;
		});
		this.orderElement.noUiSlider.on("update",function(values1,handle1,rawValues1) {
			_g.updateTooltips(_g.orderElement,handle1,values1[handle1] | 0);
		});
		noUiSlider.create(this.priorElement,{ start : [this.prior], connect : "lower", range : { 'min' : 0.001, '50%' : 0.15, 'max' : 0.3}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 2})}});
		this.createTooltips(this.priorElement);
		this.priorElement.noUiSlider.on("change",function(values2,handle2,rawValues2) {
			_g.prior = parseFloat(values2[handle2]);
		});
		this.priorElement.noUiSlider.on("update",function(values3,handle3,rawValues3) {
			_g.updateTooltips(_g.priorElement,handle3,values3[handle3]);
		});
		noUiSlider.create(this.maxProcessingTimeElement,{ start : [this.maxProcessingTime], connect : "lower", range : { 'min' : 50, 'max' : 5000}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 0})}});
		this.createTooltips(this.maxProcessingTimeElement);
		this.maxProcessingTimeElement.noUiSlider.on("change",function(values4,handle4,rawValues4) {
			_g.maxProcessingTime = parseFloat(values4[handle4]);
		});
		this.maxProcessingTimeElement.noUiSlider.on("update",function(values5,handle5,rawValues5) {
			_g.updateTooltips(_g.maxProcessingTimeElement,handle5,values5[handle5] | 0);
		});
		noUiSlider.create(this.lengthElement,{ start : [this.minLength,this.maxLength], connect : true, range : { 'min' : [3,1], 'max' : 21}, pips : { mode : "range", density : 10}});
		this.createTooltips(this.lengthElement);
		this.lengthElement.noUiSlider.on("change",function(values6,handle6,rawValues6) {
			if(handle6 == 0) _g.minLength = values6[handle6] | 0; else if(handle6 == 1) _g.maxLength = values6[handle6] | 0;
		});
		this.lengthElement.noUiSlider.on("update",function(values7,handle7,rawValues7) {
			_g.updateTooltips(_g.lengthElement,handle7,values7[handle7] | 0);
		});
	}
	,addEventListeners: function() {
		var _g = this;
		this.nameDataPresetListElement.addEventListener("change",function() {
			_g.set_trainingDataKey(_g.nameDataPresetListElement.value);
		},false);
		this.trainingDataTextEdit.addEventListener("change",function() {
		},false);
		this.generateElement.addEventListener("click",function() {
			var data = _g.trainingDataTextEdit.value;
			if(data == null || data.length == 0) return;
			var arr = data.split(" ");
			if(arr.length > 0) _g.generate(arr);
		},false);
		this.startsWithElement.addEventListener("change",function() {
			if(_g.startsWithElement.value != null) _g.set_startsWith(_g.startsWithElement.value.toLowerCase());
		},false);
		this.endsWithElement.addEventListener("change",function() {
			if(_g.endsWithElement.value != null) _g.set_endsWith(_g.endsWithElement.value.toLowerCase());
		},false);
		this.includesElement.addEventListener("change",function() {
			if(_g.includesElement.value != null) _g.set_includes(_g.includesElement.value.toLowerCase());
		},false);
		this.excludesElement.addEventListener("change",function() {
			if(_g.excludesElement.value != null) _g.set_excludes(_g.excludesElement.value.toLowerCase());
		},false);
		this.similarElement.addEventListener("change",function() {
			if(_g.similarElement.value != null) _g.set_similar(_g.similarElement.value.toLowerCase());
		},false);
		this.shareLinkElement.addEventListener("click",function() {
			_g.shareLinkTextEdit.value = _g.makeCustomQueryString();
			_g.shareLinkTextEdit.style.display = "block";
		},false);
	}
	,onNameDataPresetSelectionChanged: function(key) {
		var data = this.getTrainingDataForKey(key);
		var s = "";
		var _g = 0;
		var _g1 = data.data;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			s += i + " ";
		}
		s = StringTools.rtrim(s);
		this.trainingDataTextEdit.value = s;
	}
	,createTooltips: function(slider) {
		var tipHandles = slider.getElementsByClassName("noUi-handle");
		var _g1 = 0;
		var _g = tipHandles.length;
		while(_g1 < _g) {
			var i = _g1++;
			var div = window.document.createElement("div");
			div.className += "tooltip";
			tipHandles[i].appendChild(div);
			this.updateTooltips(slider,i,0);
		}
	}
	,updateTooltips: function(slider,handleIdx,value) {
		var tipHandles = slider.getElementsByClassName("noUi-handle");
		tipHandles[handleIdx].innerHTML = "<span class='tooltip'>" + (value == null?"null":"" + value) + "</span>";
	}
	,generate: function(data) {
		this.duplicateTrie = new markov_util_PrefixTrie();
		var _g = 0;
		while(_g < data.length) {
			var name = data[_g];
			++_g;
			this.duplicateTrie.insert(name);
		}
		this.generator = new markov_namegen_NameGenerator(data,this.order,this.prior);
		var names = [];
		var startTime = new Date().getTime();
		var currentTime = new Date().getTime();
		while(names.length < this.numToGenerate && currentTime < startTime + this.maxProcessingTime) {
			var name1 = this.generator.generateName(this.minLength,this.maxLength,this.get_startsWith(),this.get_endsWith(),this.get_includes(),this.get_excludes());
			if(name1 != null && !this.duplicateTrie.find(name1)) {
				names.push(name1);
				this.duplicateTrie.insert(name1);
			}
			currentTime = new Date().getTime();
		}
		this.setNames(names);
	}
	,setNames: function(names) {
		var _g = this;
		this.lastNames = names;
		if(this.get_similar().length > 0) names.sort(function(x,y) {
			var xSimilarity = markov_util_EditDistanceMetrics.damerauLevenshtein(x,_g.get_similar(),null);
			var ySimilarity = markov_util_EditDistanceMetrics.damerauLevenshtein(y,_g.get_similar(),null);
			if(xSimilarity > ySimilarity) return 1; else if(xSimilarity < ySimilarity) return -1; else return 0;
		});
		this.noNamesFoundElement.innerHTML = "";
		this.currentNamesElement.innerHTML = "";
		if(names.length == 0) this.noNamesFoundElement.textContent = "No names found, try again or change the settings.";
		var _g1 = 0;
		while(_g1 < names.length) {
			var name = names[_g1];
			++_g1;
			var li;
			var _this = window.document;
			li = _this.createElement("li");
			li.textContent = HxOverrides.substr(name,0,1).toUpperCase() + HxOverrides.substr(name,1,name.length - 1);
			this.currentNamesElement.appendChild(li);
		}
	}
	,getTrainingDataForKey: function(key) {
		var _g = 0;
		var _g1 = this.trainingData;
		while(_g < _g1.length) {
			var data = _g1[_g];
			++_g;
			if(data.value == key) return data;
		}
		return null;
	}
	,get_trainingDataKey: function() {
		return this.nameDataPresetListElement.value;
	}
	,set_trainingDataKey: function(key) {
		this.nameDataPresetListElement.value = key;
		this.onNameDataPresetSelectionChanged(key);
		return this.nameDataPresetListElement.value;
	}
	,get_startsWith: function() {
		return this.startsWithElement.value.toLowerCase();
	}
	,set_startsWith: function(s) {
		return this.startsWithElement.value = s.toLowerCase();
	}
	,get_endsWith: function() {
		return this.endsWithElement.value.toLowerCase();
	}
	,set_endsWith: function(s) {
		return this.endsWithElement.value = s.toLowerCase();
	}
	,get_includes: function() {
		return this.includesElement.value.toLowerCase();
	}
	,set_includes: function(s) {
		return this.includesElement.value = s.toLowerCase();
	}
	,get_excludes: function() {
		return this.excludesElement.value.toLowerCase();
	}
	,set_excludes: function(s) {
		return this.excludesElement.value = s.toLowerCase();
	}
	,get_similar: function() {
		return this.similarElement.value.toLowerCase();
	}
	,set_similar: function(s) {
		return this.similarElement.value = s.toLowerCase();
	}
};
var _$Main_TrainingData = function(value,displayName,data) {
	this.value = value;
	this.displayName = displayName;
	this.data = data;
};
_$Main_TrainingData.__name__ = true;
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
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
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
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
var markov_namegen_Generator = function(data,order,smoothing) {
	if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
	if(!(order >= 1)) throw new js__$Boot_HaxeError("FAIL: order >= 1");
	this.order = order;
	this.smoothing = smoothing;
	this.models = [];
	var letters = markov_util__$ArraySet_ArraySet_$Impl_$.create();
	var _g = 0;
	while(_g < data.length) {
		var word = data[_g];
		++_g;
		var _g2 = 0;
		var _g1 = word.length;
		while(_g2 < _g1) {
			var i = _g2++;
			markov_util__$ArraySet_ArraySet_$Impl_$.add(letters,word.charAt(i));
		}
	}
	letters.sort(function(a,b) {
		if(a < b) return -1;
		if(a > b) return 1;
		return 0;
	});
	var domain = markov_util__$ArraySet_ArraySet_$Impl_$.toArray(letters);
	domain.splice(0,0,"#");
	var _g3 = 0;
	while(_g3 < order) {
		var i1 = _g3++;
		this.models.push(new markov_namegen_Model(data.slice(),order - i1,smoothing,domain));
	}
};
markov_namegen_Generator.__name__ = true;
markov_namegen_Generator.prototype = {
	generate: function() {
		var name = markov_util_StringExtensions.repeat("#",this.order);
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
var markov_namegen_Model = function(data,order,smoothing,alphabet) {
	if(!(alphabet != null && data != null)) throw new js__$Boot_HaxeError("FAIL: alphabet != null && data != null");
	if(!(alphabet.length > 0 && data.length > 0)) throw new js__$Boot_HaxeError("FAIL: alphabet.length > 0 && data.length > 0");
	if(!(smoothing >= 0 && smoothing <= 1)) throw new js__$Boot_HaxeError("FAIL: smoothing >= 0 && smoothing <= 1");
	if(!(order > 0)) throw new js__$Boot_HaxeError("FAIL: order > 0");
	this.order = order;
	this.smoothing = smoothing;
	this.alphabet = alphabet;
	this.observations = new haxe_ds_StringMap();
	this.train(data);
	this.buildChains();
};
markov_namegen_Model.__name__ = true;
markov_namegen_Model.prototype = {
	generate: function(context) {
		if(!(context != null)) throw new js__$Boot_HaxeError("FAIL: context != null");
		var chain = this.chains.get(context);
		if(chain == null) return null; else {
			if(!(chain.length > 0)) throw new js__$Boot_HaxeError("FAIL: chain.length > 0");
			return this.alphabet[this.selectIndex(chain)];
		}
	}
	,retrain: function(data) {
		if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
		this.train(data);
		this.buildChains();
	}
	,train: function(data) {
		while(data.length != 0) {
			var d = data.pop();
			d = markov_util_StringExtensions.repeat("#",this.order) + d + "#";
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
			var _g1 = this.alphabet;
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
var markov_namegen_NameGenerator = function(data,order,smoothing) {
	markov_namegen_Generator.call(this,data,order,smoothing);
};
markov_namegen_NameGenerator.__name__ = true;
markov_namegen_NameGenerator.__super__ = markov_namegen_Generator;
markov_namegen_NameGenerator.prototype = $extend(markov_namegen_Generator.prototype,{
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
var markov_util_ArrayExtensions = function() { };
markov_util_ArrayExtensions.__name__ = true;
markov_util_ArrayExtensions.randomElementFromArrays = function(arrays) {
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
		if(n < lengths[i]) return markov_util_ArrayExtensions.randomElement(arrays[i]);
		i++;
	}
	throw new js__$Boot_HaxeError("Failed to get random element");
};
markov_util_ArrayExtensions.randomElement = function(array) {
	if(!(array != null && array.length != 0)) throw new js__$Boot_HaxeError("FAIL: array != null && array.length != 0");
	return array[Std.random(array.length)];
};
markov_util_ArrayExtensions.noNulls = function(array) {
	if(!(array != null)) throw new js__$Boot_HaxeError("FAIL: array != null");
	var _g = 0;
	while(_g < array.length) {
		var e = array[_g];
		++_g;
		if(e == null) return false;
	}
	return true;
};
markov_util_ArrayExtensions.binarySearchCmp = function(a,x,min,max,comparator) {
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
markov_util_ArrayExtensions.binarySearch = function(a,x,min,max) {
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
var markov_util__$ArraySet_ArraySet_$Impl_$ = {};
markov_util__$ArraySet_ArraySet_$Impl_$.__name__ = true;
markov_util__$ArraySet_ArraySet_$Impl_$._new = function(array) {
	return array;
};
markov_util__$ArraySet_ArraySet_$Impl_$.create = function(array) {
	if(array == null) return [];
	return markov_util__$ArraySet_ArraySet_$Impl_$.toSet(array);
};
markov_util__$ArraySet_ArraySet_$Impl_$.intersection = function(this1,set) {
	var result = [];
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(markov_util__$ArraySet_ArraySet_$Impl_$.contains(set,item)) result.push(item);
	}
	return result;
};
markov_util__$ArraySet_ArraySet_$Impl_$.union = function(this1,set) {
	return markov_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(markov_util__$ArraySet_ArraySet_$Impl_$.toArray(set)));
};
markov_util__$ArraySet_ArraySet_$Impl_$.unionArray = function(this1,set) {
	return markov_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(set));
};
markov_util__$ArraySet_ArraySet_$Impl_$.difference = function(this1,set) {
	var result;
	var array = this1.slice();
	result = array;
	var $it0 = HxOverrides.iter(set);
	while( $it0.hasNext() ) {
		var item = $it0.next();
		HxOverrides.remove(result,item);
	}
	var array1 = markov_util__$ArraySet_ArraySet_$Impl_$.toArray(result);
	return array1;
};
markov_util__$ArraySet_ArraySet_$Impl_$.add = function(this1,v) {
	if(markov_util__$ArraySet_ArraySet_$Impl_$.contains(this1,v)) return false;
	this1.push(v);
	return true;
};
markov_util__$ArraySet_ArraySet_$Impl_$.copy = function(this1) {
	var array = this1.slice();
	return array;
};
markov_util__$ArraySet_ArraySet_$Impl_$.contains = function(this1,v) {
	var _g = 0;
	while(_g < this1.length) {
		var item = this1[_g];
		++_g;
		if(item == v) return true;
	}
	return false;
};
markov_util__$ArraySet_ArraySet_$Impl_$.slice = function(this1,pos,end) {
	var array = this1.slice(pos,end);
	return array;
};
markov_util__$ArraySet_ArraySet_$Impl_$.splice = function(this1,pos,len) {
	var array = this1.splice(pos,len);
	return array;
};
markov_util__$ArraySet_ArraySet_$Impl_$.toArray = function(this1) {
	return this1.slice();
};
markov_util__$ArraySet_ArraySet_$Impl_$.toSet = function(array) {
	var set = [];
	var _g = 0;
	while(_g < array.length) {
		var v = array[_g];
		++_g;
		markov_util__$ArraySet_ArraySet_$Impl_$.add(set,v);
	}
	return set;
};
var markov_util_EditDistanceMetrics = function() { };
markov_util_EditDistanceMetrics.__name__ = true;
markov_util_EditDistanceMetrics.levenshtein = function(source,target) {
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
markov_util_EditDistanceMetrics.damerauLevenshteinMatrix = function(source,target,enableTransposition) {
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
			var val = markov_util_IntExtensions.min(costs[x - 1 + y * w] + 1,markov_util_IntExtensions.min(costs[x + (y - 1) * w] + 1,costs[x - 1 + (y - 1) * w] + cost));
			costs[x + y * w] = val;
			if(enableTransposition && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
				var val1 = markov_util_IntExtensions.min(costs[x + y * w],costs[x - 2 + (y - 2) * w] + cost);
				costs[x + y * w] = val1;
			}
		}
	}
	return costs;
};
markov_util_EditDistanceMetrics.damerauLevenshtein = function(source,target,enableTransposition) {
	if(enableTransposition == null) enableTransposition = true;
	if(source.length == 0) return target.length;
	if(target.length == 0) return source.length;
	var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(source,target,enableTransposition);
	return table[table.length - 1];
};
var markov_util_FileReader = function() { };
markov_util_FileReader.__name__ = true;
var markov_util_IntExtensions = function() { };
markov_util_IntExtensions.__name__ = true;
markov_util_IntExtensions.abs = function(v) {
	if(v < 0) return -v;
	return v;
};
markov_util_IntExtensions.clamp = function(v,min,max) {
	if(v < min) return min;
	if(v > max) return max;
	return v;
};
markov_util_IntExtensions.clampSym = function(v,bound) {
	if(v < bound) return bound; else if(v > bound) return bound; else return v;
};
markov_util_IntExtensions.even = function(v) {
	return v % 2 == 0;
};
markov_util_IntExtensions.odd = function(v) {
	return v % 2 != 0;
};
markov_util_IntExtensions.max = function(a,b) {
	if(a > b) return a;
	return b;
};
markov_util_IntExtensions.min = function(a,b) {
	if(a < b) return a;
	return b;
};
markov_util_IntExtensions.toBool = function(v) {
	return v != 0;
};
markov_util_IntExtensions.isPow2 = function(v) {
	return v > 0 && (v & v - 1) == 0;
};
markov_util_IntExtensions.sign = function(x) {
	if(x > 0) return 1; else if(x < 0) return -1; else return 0;
};
var markov_util_PrefixTrie = function() {
	this.root = new markov_util_PrefixNode("",null,0);
};
markov_util_PrefixTrie.__name__ = true;
markov_util_PrefixTrie.findChild = function(node,letter) {
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
markov_util_PrefixTrie.prototype = {
	insert: function(word) {
		var current = this.root;
		var _g1 = 0;
		var _g = word.length;
		while(_g1 < _g) {
			var i = _g1++;
			var child = markov_util_PrefixTrie.findChild(current,word.charAt(i));
			if(child == null) {
				child = new markov_util_PrefixNode(word.charAt(i),current,i);
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
			current = markov_util_PrefixTrie.findChild(current,word.charAt(i));
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
				words.push(markov_util_StringExtensions.reverse(word));
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
var markov_util_PrefixNode = function(letter,parent,depth) {
	this.parent = parent;
	this.children = [];
	this.letter = letter;
	this.frequency = 1;
	this.word = false;
	this.depth = depth;
};
markov_util_PrefixNode.__name__ = true;
var markov_util_StringExtensions = function() { };
markov_util_StringExtensions.__name__ = true;
markov_util_StringExtensions.reverse = function(s) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	var arr = s.split("");
	arr.reverse();
	return arr.join("");
};
markov_util_StringExtensions.repeat = function(s,times) {
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
markov_util_StringExtensions.contains = function(s,substr) {
	return s.indexOf(substr) >= 0;
};
markov_util_StringExtensions.capitalize = function(s) {
	return HxOverrides.substr(s,0,1).toUpperCase() + HxOverrides.substr(s,1,s.length - 1);
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
ID.header = "header";
ID.accordion = "accordion";
ID.trainingdatalist = "trainingdatalist";
ID.trainingdataedit = "trainingdataedit";
ID.minmaxlength = "minmaxlength";
ID.order = "order";
ID.prior = "prior";
ID.maxtime = "maxtime";
ID.startswith = "startswith";
ID.endswith = "endswith";
ID.includes = "includes";
ID.excludes = "excludes";
ID.similar = "similar";
ID.shareurl = "shareurl";
ID.shareedit = "shareedit";
ID.generatetriegraph = "generatetriegraph";
ID.generatemarkovgraph = "generatemarkovgraph";
ID.markovp = "markovp";
ID.generate = "generate";
ID.markovgraph = "markovgraph";
ID.triegraph = "triegraph";
ID.nonamesfound = "nonamesfound";
ID.currentnames = "currentnames";
Main.WEBSITE_URL = "http://www.samcodes.co.uk/project/markov-namegen/";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

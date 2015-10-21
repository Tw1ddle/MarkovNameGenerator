(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
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
	this.similar = "";
	this.excludes = "";
	this.includes = "";
	this.endsWith = "";
	this.startsWith = "";
	this.trainingData = new haxe_ds_StringMap();
	this.trainingData.set("us_forenames","james\njohn\nrobert\nmichael\nwilliam\ndavid\nrichard\ncharles\njoseph\nthomas\nchristopher\ndaniel\npaul\nmark\ndonald\ngeorge\nkenneth\nsteven\nedward\nbrian\nronald\nanthony\nkevin\njason\nmatthew\ngary\ntimothy\njose\nlarry\njeffrey\nfrank\nscott\neric\nstephen\nandrew\nraymond\ngregory\njoshua\njerry\ndennis\nwalter\npatrick\npeter\nharold\ndouglas\nhenry\ncarl\narthur\nryan\nroger\njoe\njuan\njack\nalbert\njonathan\njustin\nterry\ngerald\nkeith\nsamuel\nwillie\nralph\nlawrence\nnicholas\nroy\nbenjamin\nbruce\nbrandon\nadam\nharry\nfred\nwayne\nbilly\nsteve\nlouis\njeremy\naaron\nrandy\nhoward\neugene\ncarlos\nrussell\nbobby\nvictor\nmartin\nernest\nphillip\ntodd\njesse\ncraig\nalan\nshawn\nclarence\nsean\nphilip\nchris\njohnny\nearl\njimmy\nantonio\ndanny\nbryan\ntony\nluis\nmike\nstanley\nleonard\nnathan\ndale\nmanuel\nrodney\ncurtis\nnorman\nallen\nmarvin\nvincent\nglenn\njeffery\ntravis\njeff\nchad\njacob\nlee\nmelvin\nalfred\nkyle\nfrancis\nbradley\njesus\nherbert\nfrederick\nray\njoel\nedwin\ndon\neddie\nricky\ntroy\nrandall\nbarry\nalexander\nbernard\nmario\nleroy\nfrancisco\nmarcus\nmicheal\ntheodore\nclifford\nmiguel\noscar\njay\njim\ntom\ncalvin\nalex\njon\nronnie\nbill\nlloyd\ntommy\nleon\nderek\nwarren\ndarrell\njerome\nfloyd\nleo\nalvin\ntim\nwesley\ngordon\ndean\ngreg\njorge\ndustin\npedro\nderrick\ndan\nlewis\nzachary\ncorey\nherman\nmaurice\nvernon\nroberto\nclyde\nglen\nhector\nshane\nricardo\nsam\nrick\nlester\nbrent\nramon\ncharlie\ntyler\ngilbert\ngene\nmarc\nreginald\nruben\nbrett\nangel\nnathaniel\nrafael\nleslie\nedgar\nmilton\nraul\nben\nchester\ncecil\nduane\nfranklin\nandre\nelmer\nbrad\ngabriel\nron\nmitchell\nroland\narnold\nharvey\njared\nadrian\nkarl\ncory\nclaude\nerik\ndarryl\njamie\nneil\njessie\nchristian\njavier\nfernando\nclinton\nted\nmathew\ntyrone\ndarren\nlonnie\nlance\ncody\njulio\nkelly\nkurt\nallan\nnelson\nguy\nclayton\nhugh\nmax\ndwayne\ndwight\narmando\nfelix\njimmie\neverett\njordan\nian\nwallace\nken\nbob\njaime\ncasey\nalfredo\nalberto\ndave\nivan\njohnnie\nsidney\nbyron\njulian\nisaac\nmorris\nclifton\nwillard\ndaryl\nross\nvirgil\nandy\nmarshall\nsalvador\nperry\nkirk\nsergio\nmarion\ntracy\nseth\nkent\nterrance\nrene\neduardo\nterrence\nenrique\nfreddie\nwade\nmary\npatricia\nlinda\nbarbara\nelizabeth\njennifer\nmaria\nsusan\nmargaret\ndorothy\nlisa\nnancy\nkaren\nbetty\nhelen\nsandra\ndonna\ncarol\nruth\nsharon\nmichelle\nlaura\nsarah\nkimberly\ndeborah\njessica\nshirley\ncynthia\nangela\nmelissa\nbrenda\namy\nanna\nrebecca\nvirginia\nkathleen\npamela\nmartha\ndebra\namanda\nstephanie\ncarolyn\nchristine\nmarie\njanet\ncatherine\nfrances\nann\njoyce\ndiane\nalice\njulie\nheather\nteresa\ndoris\ngloria\nevelyn\njean\ncheryl\nmildred\nkatherine\njoan\nashley\njudith\nrose\njanice\nkelly\nnicole\njudy\nchristina\nkathy\ntheresa\nbeverly\ndenise\ntammy\nirene\njane\nlori\nrachel\nmarilyn\nandrea\nkathryn\nlouise\nsara\nanne\njacqueline\nwanda\nbonnie\njulia\nruby\nlois\ntina\nphyllis\nnorma\npaula\ndiana\nannie\nlillian\nemily\nrobin\npeggy\ncrystal\ngladys\nrita\ndawn\nconnie\nflorence\ntracy\nedna\ntiffany\ncarmen\nrosa\ncindy\ngrace\nwendy\nvictoria\nedith\nkim\nsherry\nsylvia\njosephine\nthelma\nshannon\nsheila\nethel\nellen\nelaine\nmarjorie\ncarrie\ncharlotte\nmonica\nesther\npauline\nemma\njuanita\nanita\nrhonda\nhazel\namber\neva\ndebbie\napril\nleslie\nclara\nlucille\njamie\njoanne\neleanor\nvalerie\ndanielle\nmegan\nalicia\nsuzanne\nmichele\ngail\nbertha\ndarlene\nveronica\njill\nerin\ngeraldine\nlauren\ncathy\njoann\nlorraine\nlynn\nsally\nregina\nerica\nbeatrice\ndolores\nbernice\naudrey\nyvonne\nannette\njune\nsamantha\nmarion\ndana\nstacy\nana\nrenee\nida\nvivian\nroberta\nholly\nbrittany\nmelanie\nloretta\nyolanda\njeanette\nlaurie\nkatie\nkristen\nvanessa\nalma\nsue\nelsie\nbeth\njeanne\nvicki\ncarla\ntara\nrosemary\neileen\nterri\ngertrude\nlucy\ntonya\nella\nstacey\nwilma\ngina\nkristin\njessie\nnatalie\nagnes\nvera\nwillie\ncharlene\nbessie\ndelores\nmelinda\npearl\narlene\nmaureen\ncolleen\nallison\ntamara\njoy\ngeorgia\nconstance\nlillie\nclaudia\njackie\nmarcia\ntanya\nnellie\nminnie\nmarlene\nheidi\nglenda\nlydia\nviola\ncourtney\nmarian\nstella\ncaroline\ndora\njo\nvickie\nmattie\nterry\nmaxine\nirma\nmabel\nmarsha\nmyrtle\nlena\nchristy\ndeanna\npatsy\nhilda\ngwendolyn\njennie\nnora\nmargie\nnina\ncassandra\nleah\npenny\nkay\npriscilla\nnaomi\ncarole\nbrandy\nolga\nbillie\ndianne\ntracey\nleona\njenny\nfelicia\nsonia\nmiriam\nvelma\nbecky\nbobbie\nviolet\nkristina\ntoni\nmisty\nmae\nshelly\ndaisy\nramona\nsherri\nerika\nkatrina\nclaire\nlindsey\nlindsay\ngeneva\nguadalupe\nbelinda\nmargarita\nsheryl\ncora\nfaye\nada\nnatasha\nsabrina\nisabel\nmarguerite\nhattie\nharriet\nmolly\ncecilia\nkristi\nbrandi\nblanche\nsandy\nrosie\njoanna\niris\neunice\nangie\ninez\nlynda\nmadeline\namelia\nalberta\ngenevieve\nmonique\njodi\njanie\nmaggie\nkayla\nsonya\njan\nlee\nkristine\ncandace\nfannie\nmaryann\nopal\nalison\nyvette\nmelody\nluz\nsusie\nolivia\nflora\nshelley\nkristy\nmamie\nlula\nlola\nverna\nbeulah\nantoinette\ncandice\njuana\njeannette\npam\nkelli\nhannah\nwhitney\nbridget\nkarla\ncelia\nlatoya\npatty\nshelia\ngayle\ndella\nvicky\nlynne\nsheri\nmarianne\nkara\njacquelyn\nerma\nblanca\nmyra\nleticia\npat\nkrista\nroxanne\nangelica\njohnnie\nrobyn\nfrancis\nadrienne\nrosalie\nalexandra\nbrooke\nbethany\nsadie\nbernadette\ntraci\njody\nkendra\njasmine\nnichole\nrachael\nchelsea\nmable\nernestine\nmuriel\nmarcella\nelena\nkrystal\nangelina\nnadine\nkari\nestelle\ndianna\npaulette\nlora\nmona\ndoreen\nrosemarie\nangel\ndesiree\nantonia\nhope\nginger\njanis\nbetsy\nchristie\nfreda\nmercedes\nmeredith\nlynette\nteri\ncristina\neula\nleigh\nmeghan\nsophia\neloise\nrochelle\ngretchen\ncecelia\nraquel\nhenrietta\nalyssa\njana\nkelley\ngwen\nkerry\njenna\ntricia\nlaverne\nolive\nalexis\ntasha\nsilvia\nelvira\ncasey\ndelia\nsophie\nkate\npatti\nlorena\nkellie\nsonja\nlila\nlana\ndarla\nmay\nmindy\nessie\nmandy\nlorene\nelsa\njosefina\njeannie\nmiranda\ndixie\nlucia\nmarta\nfaith\nlela\njohanna\nshari\ncamille\ntami\nshawna\nelisa\nebony\nmelba\nora\nnettie\ntabitha\nollie\njaime\nwinifred\nkristie".split("\n"));
	this.trainingData.set("tolkienesque_forenames","alfwine\nabattârik\nadanedhel\nadanel\nadrahil\nadûnakhôr\naegnor\naerin\nagarwaen\naikanáro\naiwendil\nalatar\nalatáriel\nalcarin\naldamir\naldarion\naldaron\naldor\namandil\namdír\namlaith\namras\namrod\namroth\namrothos\nanairë\nanardil\nanárion\nanborn\nancalagon\nancalimë\nancalimon\nandrast\nanducal\nanfauglir\nandreth\nandróg\nangbor\nangrod\nannatar\narador\naraglas\naragorn\naragost\narahad\narahael\naranarth\narantar\naranuir\naraphant\naraphor\narassuil\naratan\naratar\narathorn\naraval\naravir\naravorn\naredhel\nargeleb\nargon\nargonui\narien\naros\narthedain\narvedui\narvegil\narveleg\narwen\nasfaloth\natanamir\natanatar\naulë\nausir\navranc\nazaghâl\nazog\nbaldor\nbalin\nbaragund\nbarahir\nbarahir\nbaran\nbard\nbauglir\nbelecthor\nbeleg\nbelegorn\nbelegund\nbelemir\nbëor\nbeorn\nbereg\nberegond\nberen\nbergil\nbert\nberúthiel\nbifur\nboldog\nberylla\nbofur\nbolg\nbolger\nbombadil\nbombur\nbór\nborin\nboromir\nboron\nborondir\nbrand\nbrandir\ngormadoc\nmeriadoc\nprimula\nbrego\nbregolas\nbregor\nbrodda\nbrytta\nbucca\nbarliman\ncalembel\ncalimehtar\ncalion\ncalmacil\ncalmacil\ncaranthir\ncarcharoth\ncastamir\ncemendur\nceleborn\ncelebrían\ncelebrimbor\ncelebrindor\ncelegorm\ncelepharn\nceorl\ncírdan\ncirion\nciryaher\nciryandil\nciryatan\nciryon\ncotton\ncurufin\ncurunír\ndaeron\ndáin\ndéagol\ndenethor\ndéor\ndeórwine\ndernhelm\ndior\ndís\ndori\ndorlas\ndraugluin\nduilin\ndurin\ndwalin\neärendil\neärendur\namandil\neärnil\neärnur\neärwen\necthelion\negalmoth\neilinel\nelanor\nelbereth\neldacar\neldarion\nelemmakil\nelendil\nelendor\nelendur\nelenna\nelenwë\nelessar\nelfhelm\nelfhild\nelfwine\nelladan\nelmo\nelrohir\nelrond\nelros\nelu\nelwë\nelwing\nelven\nking\nemeldir\nemerië\nenel\nenelyë\neöl\néomer\néomund\neönwë\neorl\néothain\néothéod\néowyn\neradan\nerendis\nerestor\nerkenbrand\nilúvatar\nestel\nestelmo\nestë\nfalassion\nfaniel\nfaramir\nfastred\nfëanor\nfelaróf\nfengel\nfíli\nfinarfin\nfindis\nfinduilas\nfinduilas\nfingolfin\nfingon\nfinrod\nfinvain\nfinwë\nfíriel\nfolcwine\nfréa\nfréaláf\nfréawine\nfreca\nfrerin\nfrór\nfuinur\nfundin\ngalador\ngaladriel\ngaldor\ngamil\ngamling\ngandalf\nghânburi\ngilgalad\ngildor\ngilrain\ngimilkhâd\ngimilzôr\ngimli\nginglith\ngirion\nglanhír\nglaurung\nglóin\nglóredhel\nglorfindel\ngoldberry\ngoldwine\ngolfimbul\ngollum\ngorbag\ngorlim\ngorthaur\ngothmog\ngram\ngríma\ngrimbold\ngrishnákh\ngrór\ngwaihir\ngwathir\ngwindor\nhador\nhalbarad\nhaldad\nhaldan\nhaldar\nhaldir\nhaleth\nhallas\nhalmir\nháma\nhandir\nhardang\nhareth\nhelm\nherion\nherucalmo\nherumor\nherunúmen\nhirgon\nhiril\nhostamir\nhuan\nhundar\nhuor\nhúrin\nhyarmendacil\nibûn\nidril\nilmarë\nilúvatar\nimbar\nimin\niminyë\nimrahil\nindis\ninglor\ningwë\ninziladûn\ninzilbêth\nírildë\nirimë\nirmo\nisildur\nisilmë\nisilmo\nivriniel\nkhamûl\nkhîm\nkíli\narthedain\nlagduf\nlalaith\nlegolas\nlenwë\nléod\nlindir\nlugdush\nlúthien\nlurtz\nmablung\nmaedhros\nmaeglin\nmaglor\nmagor\nmahtan\nmaiar\nmalach\nmallor\nmalvegil\nmanthor\nmanwë\nmarach\nvoronwë\nmauhúr\nmelian\nmeleth\nmeneldil\nmeneldur\nmîm\nminalcar\nminardil\nminastir\nminyatur\nmírielar\nzimraphel\nmírielserindë\nmithrandir\nmorgoth\nmorwen\nmorwen\nmuzgash\nnahar\nnáin\nnámo\nnarmacil\nnarvi\nnerdanel\nnessa\nnienna\nnienor\nnimloth\nnimrodel\nníniel\nnóm\nnori\nohtar\nóin\nolórin\nolwë\nondoher\nori\nornendil\norodreth\noromë\noropher\norophin\nossë\nostoher\npallando\npalantir\npelendur\npengolodh\npharazôn\nberúthiel\nradagast\nrían\nrómendacil\nrúmil\nlobelia\nlotho\nsador\nsaeros\nsakalthôr\nsalgant\nsalmar\nsaruman\nsauron\nscatha\nshadowfax\nshagrat\nshelob\nsilmariën\nsingollo\nsiriondil\nsmaug\nsméagol\nsnowmane\nsoronto\nstrider\nsúrion\nelmar\ntarcil\ntarondor\ntarannon\ntata\ntatië\ntelchar\ntelemmaitë\ntelemnar\ntelperiën\ntelumehtar\nthengel\nthéoden\nthéodred\nthéodwyn\nthingol\nthorin\nthorondir\nthorondor\nthráin\nthranduil\nthrór\ntilion\ntindomiel\ntinúviel\nadalgrim\nbelladonna\nferumbras\nfortinbras\ngerontius\nisumbras\npaladin\nperegrin\npervinca\ntulkas\ntuor\nturgon\nturambar\ntúrin\nufthak\nuglúk\nuinen\nuldor\nulfang\nulfast\nulwarth\nulmo\numbardacil\nundómiel\nungoliant\nuolë\nkúvion\nurwen\nvairë\nvalacar\nvalandil\nvalandur\nvána\nvanimeldë\nvarda\nvardamir\nnólimon\nvidugavia\nvidumavi\nvinyarion\nvorondil\nvoronwë\nwalda\nwormtongue\nyavanna\nyávien\nzimraphel\nzimrathôn".split("\n"));
	this.trainingData.set("werewolf_forenames","accalia\nadalwolf\nadalwolfa\nadolpha\nadolphus\namaguk\namarog\namoux\namwolf\nardolf\nardwolf\naudolf\nbardalph\nbardolf\nbeowulf\nbiryuk\nbleddyn\nbledig\nbleidd\nbodolf\nbotewolf\nbotolf\nbotwolf\ncana\ncanagan\nchann\nchanteloup\nconall\nconan\ncuan\ndolph\ndolphus\nethelwulf\neyolf\nfaolan\nfarkas\nfelan\nfenris\nfreki\nfridolf\nfriduwulf\ngeirolf\nguadalupe\ngunnolf\nhoniahaka\nhrolf\nhrolleif\ningolf\nivaylo\nlandga\nleidolf\nleloo\nlobo\nloup\nlowell\nlupe\nluperca\nlupo\nlupu\nlupus\nlyall\nlykaios\nmaccon\nmaengun\nmaheegan\nmahigan\nmaicoh\nmaiyun\nmakoce\nmingan\nmohegan\nnashoba\nnuntis\nodolf\nodwolfe\nolcan\nonai\nphelan\nradolf\nraff\nralph\nrand\nrandale\nrandall\nrandi\nrandolph\nranulfo\nraoul\nraul\nrendall\nreule\nrezso\nrodolfo\nrolf\nrudi\nrudolph\nsandalio\nseff\nshunkaha\nsingarti\nsirhaan\nsköll\nsusi\ntala\ntasha\ntate\ntchono\ntoralu\nudolf\nudolph\nujku\nulf\nulfred\nulger\nullok\nulmar\nulmer\nulric\nulvelaik\nuwais\nvarg\nvelvel\nvilkas\nvilks\nvuk\nvukasin\nweylyn\nwolfgang\nwolfram\nwolfrik\nwoolsey\nwulfgar\nylva".split("\n"));
	this.trainingData.set("romandeity_forenames","abeona\nabudantia\nadeona\naequitas\naera\naeternitas\nafricus\nalemonia\nangerona\nangita\nanna\nantevorte\naquilo\naurora\nauster\nbona\ncamenaees\ncandelifera\ncardea\ncarmenta\ncarnea\ncinxia\nclementia\ncloacina\ncoelus\nconcordia\nconditor\nconsus\nconvector\ncopia\ncorus\ncunina\ndea\ndea\ndecima\ndia\ndevera\ndeverra\ndisciplina\ndiscordia\ndius\negestes\nempanda\neventus\nfabulinus\nfama\nfauna\nfaunus\nfaustitas\nfavonius\nfebris\nfelicitas\nferonia\nfides\nflora\nfontus\nfornax\nfortuna\nfulgora\nfurina\nhonos\nindivia\njuturna\njuventas\nlactans\nlares\nlaverna\nliber\nlibera\nliberalitas\nlibertas\nlibitina\nlima\nlucifer\nlucina\nluna\nmaia\nmaiesta\nmania\nmanes\nmatuta\nmeditrina\nmefitas\nmellona\nmena\nmens\nmessor\nmoneta\nmors\nmorta\nmuta\nmutinus\nnaenia\nnecessitas\nnemestrinus\nnona\nnox\nnundina\nobarator\noccator\norbona\norcus\npales\nparcaes\npax\npenates\npicus\npietas\npoena\npomona\nportunes\nporus\npostverta\npotina\npriapus\nprorsa\nprovidentia\npudicitia\nputa\nquirinus\nquiritis\nrobigo\nrobigus\nroma\nrumina\nsancus\nsaritor\nsecuritas\nsemonia\nsors\nspes\nstata\nstimula\nstrenua\nsuadela\nsubrincinator\nsummanus\ntempestes\nterminus\nterra\ntrivia\nvacuna\nveritas\nvertumnus\nviduus\nviriplacaa\nvirtus\nvitumnus\nvolturnus\nvolumna\nvulturnus\napollo\ndemeter\ndiana\nartemis\njuno\nhera\njupiter\nzeus\nmars\nares\nmercury\nhermes\nminerva\nathena\nmenrva\nneptune\nposeidon\nvenus\naphrodite\nvesta\nhestia\nvulcan\nhephaestus\nasclepius\nattis\nbacchus\nbellona\nbubona\nceres\ncupid\ncybele\ndis\nendovelicus\nfaunus\nfuries\nhercules\nisis\njanus\nmithras\nops\nsalus\nserapis\nsaturn\nsilvanus\nsol\nsol\nsomnus\ntellus\nveiovis\nvictoria".split("\n"));
	this.trainingData.set("norsedeity_forenames","brynhildr\neir\ngeirahöð\ngeiravör\ngeirdriful\ngeirönul\ngeirskögul\ngöll\ngöndul\nguðr\ngunnr\nherfjötur\nherja\nhlaðguðr\nhildr\nhjalmþrimul\nhervör\nhjörþrimul\nhlökk\nhrist\nhrund\nkára\nmist\nölrún\nrandgríðr\nráðgríðr\nreginleif\nróta\nsanngriðr\nsigrdrífa\nsigrún\nskalmöld\nskeggöld\nskögul\nskuld\nsveið\nsvipul\nþögn\nþrima\nþrúðr\nbaduhenna\nbil\nbeyla\neir\nēostre\nfreyja\nfrigg\nfulla\ngefjun\ngersemi\ngerðr\ngná\ngullveig\nhariasa\nhlín\nhretha\nhnoss\nilmr\niðunn\nirpa\nlofn\nnanna\nnerthus\nnjörun\nrán\nrindr\nsága\nsandraudiga\nsif\nsigyn\nsinthgunt\nsjöfn\nskaði\nsnotra\nsól\nsyn\ntanfana\nþrúðr\nþorgerðr\nvár\nvör\nzisa\nbaldr\nbragi\ndellingr\nforseti\nfreyr\nheimdallr\nhermóðr\nhöðr\nhœnir\nlóðurr\nloki\nmáni\nmeili\nnjörðr\nodin\nóðr\nsaxnōt\nthor\ntýr\nullr\nváli\nviðarr\nvé\nvili".split("\n"));
	this.trainingData.set("swedish_forenames","elsa\nalice\nmaja\nagnes\nlilly\nolivia\njulia\nebba\nlinnea\nmolly\nella\nwilma\nklara\nstella\nfreja\nalicia\nalva\nalma\nisabelle\nellen\nsaga\nellie\nastrid\nemma\nnellie\nemilia\nvera\nsigne\nelvira\nnova\nselma\nester\nleah\nfelicia\nsara\nsofia\nelise\nines\ntyra\namanda\nelin\nida\nmoa\nmeja\nisabella\ntuva\nnora\nsiri\nmatilda\nsigrid\nedith\nlovisa\njuni\nliv\nlova\nhanna\ntilde\niris\nthea\nemelie\nmelissa\ncornelia\nleia\ningrid\nlivia\njasmine\nnathalie\ngreta\nstina\njoline\nfilippa\nemmy\nsvea\nmärta\ntilda\nhilda\nmajken\nceline\nellinor\nlykke\nnovalie\nlinn\ntindra\nmy\nmira\nrut\nronja\nhilma\nlisa\nmaria\nelina\nlovis\nminna\nhedda\namelia\nsally\nnicole\nvictoria\nluna\nanna\nelisa\nlucas\nwilliam\noscar\noliver\nliam\nelias\nhugo\nvincent\ncharlie\nalexander\naxel\nludvig\nelliot\nnoah\nleo\nviktor\nfilip\narvid\nalfred\nnils\nisak\nemil\ntheo\ntheodor\nedvin\nmelvin\ngustav\nsixten\nadam\nanton\nbenjamin\nolle\nvalter\nerik\nadrian\nalbin\nleon\nharry\nmax\ngabriel\nmalte\nmelker\njosef\nmohamed\nviggo\nebbe\nwilmer\nalvin\ncasper\nlove\njacob\njack\nkevin\nfelix\naugust\nloke\ncarl\nmilo\nsigge\nnoel\njonathan\nvidar\nsebastian\nville\ncolin\nmilton\nsimon\nsam\nfrank\nelton\nloui\nrasmus\ndavid\nsamuel\njoel\nhenry\nwilhelm\nlinus\ntage\nmatteo\nelis\nvilgot\nelvin\nivar\naron\nalex\notto\njohn\nmaximilian\neddie\nneo\ndaniel\njulian\nmio\nhjalmar\ndante\nali\nedward\nhampus\nsvante".split("\n"));
	this.trainingData.set("english_towns","abingdon\naccrington\nacle\nacton\nadlington\nalcester\naldeburgh\naldershot\nalford\nalfreton\nalnwick\nalsager\nalston\nalton\naltrincham\namble\nambleside\namersham\namesbury\nampthill\nandover\nappleby\narlesey\narundel\nashbourne\nashburton\nashby\nashford\nashington\nashton\naskern\naspatria\natherstone\nattleborough\naxbridge\naxminster\naylesbury\naylsham\ntown\nbacup\nbakewell\nbampton\nbanbury\nbarking\nbarnard\nbarnes\nbarnet\nbarnoldswick\nbarnsley\nbarnstaple\nbarrow\nbarton\nbasingstoke\nbatley\nbattle\nbawtry\nbeaconsfield\nbeaminster\nbebington\nbeccles\nbeckenham\nbedale\nbedford\nbedworth\nbelper\nbentham\nberkeley\nberkhamsted\nberwick\nbeverley\nbewdley\nbexhill\nbexley\nbicester\nbiddulph\nbideford\nbiggleswade\nbillericay\nbillingham\nbilston\nbingham\nbingley\nbirchwood\nbirkenhead\nbishop\nblackburn\nblackpool\nblackrod\nblackwater\nblandford\nbletchley\nblyth\nbodmin\nbognor\nbollington\nbolsover\nbolton\nbootle\nbordon\nboroughbridge\nboston\nbottesford\nbourne\nbournemouth\nbovey\nbrackley\nbradford\nbrading\nbradley\nbradninch\nbraintree\nbrampton\nbrandon\nbraunstone\nbrentford\nbrentwood\nbridgnorth\nbridgwater\nbridlington\nbridport\nbrierfield\nbrierley\nbrigg\nbrighouse\nbrightlingsea\nbrixham\nbroadstairs\nbromborough\nbromley\nbromsgrove\nbromyard\nbroseley\nbrough\nbroughton\nbruton\nbuckfastleigh\nbuckingham\nbude\nbudleigh\nbulwell\nbungay\nbuntingford\nburford\nburgess\nburgh\nburnham\nburnley\nburntwood\nburslem\nburton\nburton\nbury\nbury\nbushey\nbuxton\ncaistor\ncallington\ncalne\ncamborne\ncamelford\ncannock\ncanvey\ncarnforth\ncarlton\ncarshalton\ncarterton\ncastle\ncastleford\nchagford\nchapel\nchard\ncharlbury\nchatham\nchatteris\ncheadle\ncheltenham\nchertsey\nchesham\ncheshunt\nchesterfield\nchester\nchickerell\nchilton\nchingford\nchippenham\nchipping\nchipping\nchipping\nchorley\nchorleywood\nchristchurch\nchudleigh\nchulmleigh\nchurch\ncinderford\ncirencester\nclare\nclay\ncleator\ncleethorpes\ncleobury\nclevedon\nclitheroe\nclun\ncockermouth\ncoggeshall\ncolburn\ncolchester\ncoleford\ncoleshill\ncolne\ncolyton\ncongleton\nconisbrough\ncorbridge\ncorby\ncorringham\ncorsham\ncotgrave\ncowes\ncoulsdon\ncramlington\ncranbrook\ncraven\ncrawley\ncrediton\ncrewe\ncrewkerne\ncricklade\ncromer\ncrook\ncrosby\ncrowborough\ncroydon\ncrowland\ncrowle\ncullompton\ndagenham\ndalton\ndarley\ndarlington\ndartford\ndartmouth\ndarwen\ndaventry\ndawley\ndawlish\ndeal\ndenholme\ndereham\ndesborough\ndevizes\ndewsbury\ndidcot\ndinnington\ndiss\ndoncaster\ndorchester\ndorking\ndover\ndovercourt\ndownham\ndriffield\ndroitwich\ndronfield\ndudley\ndukinfield\ndulverton\ndunstable\ndunwich\ndursley\nealing\nearby\nearl\nearley\neasingwold\neast\neast\neast\neastbourne\neastleigh\neast\neastwood\neccles\neccleshall\nedenbridge\nedgware\nedmonton\negremont\nelland\nellesmere\nellesmere\nelstree\nemsworth\nenfield\nepping\nepworth\nerith\neton\nevesham\nexmouth\neye\nfairford\nfakenham\nfalmouth\nfareham\nfaringdon\nfarnham\nfaversham\nfazeley\nfeatherstone\nfelixstowe\nferndown\nferryhill\nfiley\nfilton\nfinchley\nfleet\nfleetwood\nflitwick\nfolkestone\nfordbridge\nfordingbridge\nfordwich\nfowey\nframlingham\nfrinton\nfrodsham\nfrome\ngainsborough\ngarstang\ngateshead\ngillingham\ngillingham\nglastonbury\nglossop\ngodalming\ngodmanchester\ngoole\ngorleston\ngosport\ngrange\ngrantham\ngrassington\ngravesend\ngrays\ngreat\ngreat\ngreat\ngreater\ngrimsby\nguildford\nguisborough\nhadleigh\nhailsham\nhalesowen\nhalesworth\nhalewood\nhalifax\nhalstead\nhaltwhistle\nredenhall\nharlow\nharpenden\nharrogate\nharrow\nhartland\nhartlepool\nharwich\nharworth\nhaslemere\nhaslingden\nhastings\nhatfield\nhatfield\nhatherleigh\nhavant\nhaverhill\nhawkinge\nhaxby\nhawes\nhayle\nhaywards\nheanor\nheathfield\nhebden\nhedge\nhednesford\nhedon\nhelmsley\nhelston\nhemel\nhemsworth\nhendon\nhenley\nhertford\nhessle\nhetton\nhexham\nheywood\nhigham\nhighbridge\nhighworth\nhigh\nhinckley\nhingham\nhitchin\nhoddesdon\nholbeach\nholsworthy\nholt\nhoniton\nhorley\nhorncastle\nhornsea\nhornsey\nhorsforth\nhorsham\nhorwich\nhoughton\nhounslow\nhowden\nhuddersfield\nhungerford\nhunstanton\nhuntingdon\nhyde\nhythe\nilford\nilfracombe\nilkeston\nilkley\nilminster\nimmingham\ningleby\nipswich\nirthlingborough\nivybridge\njarrow\nkeighley\nkempston\nkendal\nkenilworth\nkesgrave\nkeswick\nkettering\nkeynsham\nkidderminster\nkidsgrove\nkimberley\nkingsbridge\nkingsteignton\nkingston\nkington\nkirkby\nkirkbymoorside\nkirkham\nkirton\nknaresborough\nknutsford\nlangport\nlaunceston\nleatherhead\nlechlade\nledbury\nleek\nleigh\nleighton\nleiston\nleominster\nletchworth\nlewes\nleyburn\nleyton\nliskeard\nlittlehampton\nloddon\nloftus\nlong\nlongridge\nlongtown\nlooe\nlostwithiel\nloughborough\nloughton\nlouth\nlowestoft\nludgershall\nludlow\nluton\nlutterworth\nlydd\nlydney\nlyme\nlymington\nlynton\nlytchett\nlytham\nmablethorpe\nmacclesfield\nmadeley\nmaghull\nmaidenhead\nmaidstone\nmaldon\nmalmesbury\nmaltby\nmalton\nmalvern\nmanningtree\nmansfield\nmarazion\nmarch\nmargate\nmarlborough\nmarlow\nmaryport\nmasham\nmatlock\nmedlar\nmelksham\nmeltham\nmelton\nmere\nmexborough\nmiddleham\nmiddlesbrough\nmiddleton\nmiddlewich\nmidhurst\nmidsomer\nmildenhall\nmillom\nminchinhampton\nminehead\nminster\nmirfield\nmitcham\nmitcheldean\nmodbury\nmorecambe\nmoretonhampstead\nmoreton\nmorley\nmorpeth\nmossley\nmuch\nnailsea\nnailsworth\nnantwich\nneedham\nnelson\nneston\nnewark\nnewbiggin\nnewbury\nnewcastle\nnewent\nnewhaven\nnewlyn\nnewmarket\nnewport\nnewquay\nnewton\nnormanton\nnorth\nnorthallerton\nnortham\nnorthampton\nnorthfleet\nnorthleach\nnorthwich\nnorton\nnuneaton\noakengates\noakham\nokehampton\noldbury\noldham\nollerton\nolney\nongar\norford\normskirk\nossett\noswestry\notley\nottery\noundle\npaddock\npadiham\npadstow\npaignton\npainswick\npartington\npatchway\npateley\npeacehaven\npenistone\npenkridge\npenrith\npenryn\npenwortham\npenzance\npershore\npeterlee\npetersfield\npetworth\npickering\nplympton\npocklington\npolegate\npontefract\nponteland\npoole\nporthleven\nportishead\nportland\npotton\npoynton\npreesall\nprescot\nprinces\nprudhoe\npudsey\nqueenborough\nradstock\nramsey\nramsgate\nraunds\nrawtenstall\nrayleigh\nreading\nredcar\nredruth\nreepham\nreigate\nrichmond\nrichmond\nringwood\nripley\nrochdale\nrochester\nrochford\nromford\nromsey\nross\nrothbury\nrotherham\nrothwell\nrowley\nroyal\nroyston\nrugby\nrugeley\nrushden\nryde\nrye\nsaffron\nsalcombe\nsale\nsaltash\nsandbach\nsandhurst\nsandiacre\nsandown\nsandwich\nsandy\nsawbridgeworth\nsaxmundham\nscarborough\nscunthorpe\nseaford\nseaham\nseaton\nsedbergh\nsedgefield\nselby\nselsey\nsettle\nsevenoaks\nshaftesbury\nshanklin\nshefford\nshepshed\nshepton\nsherborne\nsheringham\nshifnal\nshildon\nshipston\nshirebrook\nshoreham\nshrewsbury\nsidmouth\nsilloth\nsilsden\nsittingbourne\nskegness\nskelmersdale\nskelton\nskipton\nsleaford\nslough\nsmethwick\nsnaith\nsnodland\nsoham\nsolihull\nsomerton\nsoutham\nsouthall\nsouthborough\nsouthend\nsouthgate\nsouthminster\nsouthport\nsouthsea\nsouthwell\nsouthwick\nsouthwold\nspalding\nspennymoor\nspilsby\nsprowston\nstafford\nstaines\nstainforth\nstalbridge\nstalham\nstalybridge\nstamford\nstanley\nstanhope\nstapleford\nstaveley\nstevenage\nsteyning\nstockport\nstocksbridge\nstockton\nstone\nstonehouse\nstony\nstotfold\nstourbridge\nstourport\nstowmarket\nstow\nstratford\nstretford\nstrood\nstroud\nsturminster\nsudbury\nsurbiton\nsutton\nsutton\nswaffham\nswanage\nswanley\nswanscombe\nswindon\nsyston\ntadcaster\ntadley\ntamworth\ntaunton\ntavistock\nteignmouth\ntelscombe\ntenbury\ntenterden\ntetbury\ntewkesbury\nthame\nthatcham\nthaxted\nthetford\nthirsk\nthornaby\nthornbury\nthorne\nthorpe\nthrapston\ntickhill\ntidworth\ntipton\ntisbury\ntiverton\ntodmorden\ntonbridge\ntopsham\ntorpoint\ntorquay\ntotnes\ntottenham\ntotton\ntow\ntowcester\ntring\ntrowbridge\ntwickenham\ntynemouth\nuckfield\nulverston\nuppingham\nupton\nuttoxeter\nuxbridge\nventnor\nverwood\nwadebridge\nwadhurst\nwainfleet\nwallasey\nwallsend\nwallingford\nwalsall\nwaltham\nwaltham\nwalthamstow\nwalton\nwantage\nware\nwareham\nwarminster\nwarrington\nwarwick\nwatchet\nwatford\nwath\nwatlington\nwatton\nwellingborough\nwednesbury\nwellington\nwells\nwembley\nwendover\nwestbury\nwesterham\nwesthoughton\nweston\nwetherby\nweybridge\nweymouth\nwhaley\nwhitby\nwhitchurch\nwhitehaven\nwhitehill\nwhitnash\nwhittlesey\nwhitworth\nwickham\nwickwar\nwidnes\nwigan\nwigton\nwillenhall\nwillesden\nwilton\nwilmslow\nwimbledon\nwimborne\nwincanton\nwinchcombe\nwinchelsea\nwindermere\nwindsor\nwinsford\nwinslow\nwinterton\nwirksworth\nwisbech\nwitham\nwithernsea\nwitney\nwiveliscombe\nwivenhoe\nwoburn\nwoburn\nwoking\nwokingham\nwolsingham\nwolverton\nwood\nwoodbridge\nwoodley\nwoodstock\nwooler\nworkington\nworksop\nworthing\nwotton\nwragby\nwymondham\nyarm\nyarmouth\nyate\nyateley\nyeovil\nbasildon\nbracknell\nmilton\nredditch\ntelford\nwashington\nwelwyn".split("\n"));
	this.trainingData.set("theological_demons","abaddon\napollyon\nabezethibou\nabraxas\nabyzou\nadramelech\naeshma\nagaliarept\nagrat\nagares\nagiel\nahriman\nangra\naim\nhaborym\naka\nala\nalal\nalastor\nalloces\nallocer\nallu\namaymon\namdusias\namy\nanamalech\nancitif\nandhaka\nandras\nandrealphus\nandromalius\nantichrist\nanzu\narmaros\narchon\narunasura\nasag\nasakku\nasbel\nasmodai\nasmodeus\nastaroth\nasura\nazazel\nazi\nbaal\nbael\nbabi\nbakasura\nbalam\nbalberith\nbali\nbanshee\nbaphomet\nbarbas\nbarbatos\nbarong\nbathin\nmathim\nbathym\nmarthim\nbeelzebub\nbehemoth\nbelial\nbeleth\nbelphegor\nberith\nbeherit\nbhūta\nbifrons\nboruta\nbotis\nbuer\nbukavac\nbune\nbushyasta\ncain\ncanio\ncharun\nchemosh\nchoronzon\ncimejes\nkimaris\ncimeies\ncorson\ncrocell\nprocell\nculsu\ndaeva\ndagon\ndajjal\ndantalion\ndanjal\ndavy\ndecarabia\ndemiurge\ndemogorgon\ndevil\ndrekavac\ndzoavits\neblis\neligos\neisheth\nfocalor\nforas\nforcas\nforneus\nfurcas\nforcas\nfurfur\ngaap\ngaderel\ngaki\ngamigin\nghoul\nglasya\ncaacrinolaas\ncaassimolar\nclassyalabolas\ngorgon\ngremory\ngomory\ngrigori\ngualichu\nguayota\ngusion\ngusoin\ngusoyn\nhaagenti\nhalphas\nmalthus\nhantu\nhaures\nflauros\nflavros\nhauras\nhavres\nifrit\nincubus\nipos\nipes\njinn\njikininki\nkabandha\nkabhanda\nkali\nkasadya\nkokabiel\nkroni\nkrampus\nkillakee\nkumbhakarna\nlegion\nlechies\nleyak\nlempo\nleraje\nleraie\nleviathan\nlili\nlilin\nlilim\nlilith\nlucifer\nlucifuge\nmalphas\nmammon\nmara\nmaricha\nmarax\nmorax\nforaii\nmarchosias\nmasih\nmastema\nmephistopheles\nmerihem\nmoloch\nmurmur\nmorpheus\nnaamah\nnaberius\ncerbere\nnaberus\nninurta\nnamtar\nonoskelis\norcus\norias\noriax\nornias\norobas\nose\nördög\npaimon\npazuzu\npelesit\nphenex\npenemue\npithius\npocong\npontianak\npruflas\npuloman\nrahab\nraum\nronove\nrusalka\nrakshasa\nrangda\nravan\nsabnock\nsaleos\nsamael\nsatan\nseir\nsemyaz\nshax\nchax\nshedim\nsitri\nsthenno\nstolas\nsolas\nsuanggi\nsuccubus\nsurgat\ntannin\ntoyol\ntuchulcha\nukobach\nvalac\nvalefar\nmalaphar\nmalephar\nvanth\nvapula\nvassago\nvepar\nvine\nwendigo\nxaphan\nxezbeth\nyeqon\nyeterel\nzagan\nzepar\nziminiar".split("\n"));
	this.trainingData.set("scottish_surnames","aileanach\nailpeanach\nallanach\nambarsan\nandarsan\nanndrasdan\narasgain\nbànach\nbaran\nbarrach\nbeitean\nbhàsa\nbhodhsa\nblacach\nblàr\nblàrach\nbochanan\nboid\nbòideach\nbràigheach\nbreac\nbreathnach\nbrothaigh\nbruis\nbrùn\nbrus\nbuideach\nbuidheach\nbuids\nbuiseid\ncailbhin\ncaileanach\ncaimbeul\ncaimbeulach\ncamran\ncamshron\ncamshronach\ncananach\ncanonach\ncaoidheach\ncaolaisdean\ncatach\ncatan\ncatanach\nceallach\nceanadach\nceannaideach\ncearrach\nceiteach\nciar\nciarach\nciogach\ncoineagan\ncrannach\ncriatharach\ncuimeanach\ncuimein\ncuimeineach\ncàidh\ncèamp\ncèampach\ncòmhan\ncreag\ndalais\ndeòir\ndeòireach\ndòmhnallach\ndruimeanach\ndruimein\ndruimeineach\ndruiminn\ndubh\ndubhach\ndùbhghlas\ndùghallach\ndùghlas\ndùghlasach\ndunaid\ndunaidh\neabarcrombaigh\nfearghasdan\nfionnlasdan\nflimean\nfoirbeis\nfoirbeiseach\nforsàidh\nfòlais\nfriseal\nfrisealach\ngall\ngallach\ngeadais\ngeadasach\ngearailteach\ngilios\ngillandrais\ngilleasbaig\ngilleasbuig\ngillechriosd\ngillechrìost\ngiobsan\nglas\ngobha\ngrannd\ngrannda\ngranndach\ngreum\ngreumach\ngriogal\ngriogalach\ngriogarach\nguaire\nguinne\ngunnach\ngutraidh\ngòrdan\ngòrdanach\nìomharach\nlatharnach\nlathurna\nleamhanach\nleamhnach\nleòideach\nlobhdain\nloganach\nloudain\nlìos\nlìosach\nlùtair\nscottish\nmacillanndrais\nmacillebhreac\nmacilleathainn\nmacillfhinnein\nmacillfhinntain\nmacillfhionndaig\nmacilliosa\nmacilloig\nmacille\nmacillebhàin\nmacillebhuidh\nmacillechiar\nmacilledhuibh\nmacillemhìcheil\nmacillemhòire\nmacillenaoimh\nmacilleriabhaich\nmacilleruaidh\nmacuirigh\nmacabhra\nmacabhsalain\nmacadaidh\nmacadhaimh\nmacàidh\nmacaididh\nmacailein\nmacailpein\nmacalasdair\nmacambrais\nmacamhalghaidh\nmacamhlaidh\nmacamhlaigh\nmacanndaidh\nmacanndra\nmacanndrais\nmacaodhagain\nmacaoidh\nmacaoidhein\nmacaomalain\nmacaonghais\nmacara\nmacartain\nmacartair\nmacasgaidh\nmacasgaill\nmacasgain\nmacbeatha\nmacbeathag\nmacbhàididh\nmacbharrais\nmacbhàtair\nmacbheatha\nmacbheathaig\nmacbheathain\nmacbhigein\nmacbhiocair\nmacbhlàthain\nmacbhradain\nmacbhraonaigh\nmacbhrìghdeinn\nmaccàba\nmaccaibe\nmaccailein\nmaccain\nmaccaisgein\nmaccalmain\nmaccaluim\nmaccaog\nmaccaoig\nmaccardaidh\nmaccarmaig\nmaccathachaidh\nmaccathail\nmaccathbhaidh\nmaccathain\nmaccathasaigh\nmaccathbharra\nmacceallaig\nmacceallaigh\nmacceallair\nmaccearnaigh\nmaccearraich\nmacceasain\nmacchoinnich\nmaccianain\nmacciarain\nmacciomalain\nmaccionadha\nmaccinidh\nmacclambroch\nmaccnaimhin\nmaccnusachainn\nmaccodrum\nmaccoinnich\nmaccoinnigh\nmaccolla\nmaccomhainn\nmacconaill\nmacconnain\nmaccosgraigh\nmaccorcadail\nmaccormaig\nmaccrain\nmaccreamhain\nmaccriomain\nmaccrithein\nmaccrosain\nmaccruimein\nmaccrìsdein\nmaccròin\nmaccuaig\nmaccuidhein\nmaccuilcein\nmaccuinn\nmaccuinnleis\nmaccuirc\nmaccuithein\nmaccullach\nmaccullaich\nmaccumasgaigh\nmaccumhais\nmaccuthais\nmaccòiseam\nmaccòmhain\nmaccòmhghan\nmaccùga\nmacdheòrsa\nmacdhiarmaid\nmacdhonnchaidh\nmacdhrostain\nmacdhubhaich\nmacdhubhaig\nmacdhubhshìth\nmacdhubhthaich\nmacdhuibh\nmacdhunlèibhe\nmacdiarmaid\nmacdhàibhidh\nmacdhòmhnaill\nmacdhùghaill\nmacdhùnshléibhe\nmaceachaidh\nmaceachainn\nmaceachairn\nmaceacharna\nmacealair\nmacealar\nmaceamailinn\nmaceanain\nmaceanraig\nmaceòghainn\nmacfhearchair\nmacfhearghail\nmacfhearghais\nmacfhilib\nmacfhiongain\nmacfhionghain\nmacfhionnlaigh\nmacfhitheachain\nmacfhlaithbheartaich\nmacfhraing\nmacfhraingein\nmacfigeinn\nmacfrìdeinn\nmacfuirigh\nmacgairbheith\nmacgaradh\nmacghearailt\nmacgilleain\nmacghille\nmacgillearnain\nmacgilleasbaig\nmacgilleòin\nmacgillfhaolagain\nmacgillfhiontag\nmacgilloig\nmacgillonaidh\nmacgille\nmacgillebhàin\nmacgillebhràth\nmacgillebhreac\nmacgillebhrìghde\nmacgillechaluim\nmacgillechrìosd\nmacgilledhonaghart\nmacgilleathain\nmacgilledhuibh\nmacgillefhialain\nmacgilleghlais\nmacgilliosa\nmacgillemhartainn\nmacgilleriabhaich\nmacgilleseathanaich\nmacgiobain\nmacglaisein\nmacgoraidh\nmacgobhainn\nmacgoraidh\nmacgriogair\nmacguaire\nmacgumaraid\nmaciain\nmacillanndrais\nmacillaodhagain\nmacilldheòra\nmacillearnain\nmacilleasbaig\nmacilleathain\nmacillebhàin\nmacillebheathain\nmacillebhlàthain\nmacillebhràth\nmacillebhrìghde\nmacillebhris\nmacillebhuidhe\nmacillechaluim\nmacillechatain\nmacillechathbhaidh\nmacillechiar\nmacillechiarain\nmacillechomhghain\nmacillechonaill\nmacillechrìosd\nmacillechruim\nmacilledhòmhnaich\nmacilledhonaghart\nmacilledhubhthaich\nmacilledhuibh\nmacilledhuinn\nmacilleghlais\nmacilleghuinnein\nmacilleghuirm\nmacilléidich\nmacilleòin\nmacillemhaoil\nmacillemhàrtainn\nmacillemhearnaig\nmacillemhìcheil\nmacillemhoire\nmacillenaoimh\nmacillephàdraig\nmacillepheadair\nmacilleriabhaich\nmacilleruaidh\nmacillesheathain\nmacillesheathanaich\nmacillesheathnaich\nmacillethòmhais\nmacillfhaolagain\nmacillfhaolain\nmacillfheargain\nmacillfhialain\nmacillfhinnein\nmacillfhionndaig\nmacillfhionndain\nmacillianain\nmacillìmheir\nmacilliomchadha\nmacillìosa\nmacillonchon\nmacillonfhaidh\nmacillosa\nmacilluidhir\nmaciomhair\nmacionmhainn\nmaciosaig\nmaclabhrainn\nmaclabhruinn\nmaclachlainn\nmaclagain\nmaclamraich\nmaclaomainn\nmaclathagain\nmacleòid\nmacleòir\nmaclianain\nmaclothaidh\nmacliuthar\nmaclughaidh\nmacluinge\nmacluirg\nmaclulaich\nmaclùcaidh\nmaclùcais\nmacmhaighstir\nmacmhanachain\nmacmhannain\nmacmhaoilein\nmacmhaoirn\nmacmhaolagain\nmacmhaolain\nmacmhaolbheatha\nmacmhaolchaluim\nmacmhaoldòmhnaich\nmacmhaolìosa\nmacmharais\nmacmharcais\nmacmhata\nmacmhatha\nmacmhathain\nmacmhàrtainn\nmacmhànais\nmacmhèinn\nmacmhiadhchain\nmacmhìcheil\nmacmhoirein\nmacmhòrdha\nmacmhorgain\nmacmhuircheartaich\nmacmhuirich\nmacmhunna\nmacmhurardaich\nmacmhurchaidh\nmacnaois\nmacnaomhain\nmacneacail\nmacneachdain\nmacneis\nmacnèill\nmacnia\nmacniallghais\nmacniallghuis\nmacnìll\nmacniocail\nmacnobaill\nmacphaid\nmacphaidein\nmacphail\nmacphairce\nmacphàdraig\nmacphàic\nmacphàidein\nmacphàil\nmacphàrlain\nmacpheadair\nmacpheadarain\nmacpheadrais\nmacpheidearain\nmacphilip\nmacphòil\nmacrabaidh\nmacraghnaill\nmacraibeirt\nmacraoimhin\nmacraoiridh\nmacraonaill\nmacrath\nmacràild\nmacriada\nmacriocaird\nmacrisnidh\nmacrìdeinn\nmacrìgh\nmacrob\nmacrobaidh\nmacroibeirt\nmacroithridh\nmacruairidh\nmacrusachainn\nmacshanndaidh\nmacshealbhaigh\nmacsheòrais\nmacsheòrsa\nmacshimidh\nmacshithich\nmacshitrig\nmacshìm\nmacshomhairle\nmacshuibhne\nmacsiridh\nmacsporain\nmacsuain\nmacsual\nmacthaidhg\nmactheàrlaich\nmacthom\nmacthomaidh\nmacthorcadail\nmacthorcaill\nmacthàmhais\nmacthòmais\nmactiridh\nmactuirc\nmacualraig\nmacuaraig\nmacuchtraigh\nmacuilleim\nmacuirigh\nmacuisdein\nmacurardaidh\nmacurardaigh\nmacurchadain\nmacurchaidh\nmacusbaig\nmacùisdein\nscottish\nmaoileanach\nmaoliosa\nmatasan\nmathanach\nmatharnach\nmawr\nmoireach\nmoireasdan\nmoireasdanach\nmorgan\nmorganach\nmunna\nmàrnach\nmàrr\nmàrtainn\nmèinn\nmèinnearach\nniocalsan\npadarsan\npaorach\npeadarsan\npeucag\npeutan\npreas\npuidreach\nrathais\nrobasan\nrobasdan\nroid\nroideach\nros\nròs\nrosach\nròsach\nrothach\nruadh\nruiseal\nsailcirc\nsalmond\nseadh\nseadhg\nseagha\nseaghach\nseathanach\nsgèin\nsginnearach\nsgot\nsingleir\nsiosal\nsiosalach\nsmios\nstiùbhart\nstiùbhartach\nsùdrach\nsutharlainn\nsutharlan\nsuthurlanach\ntod\ntodt\ntalmhach\ntolmach\ntuairnear\ntàileach\ntàillear\ntulach\nualas\numphraidh\nurchadainn\nurchardan".split("\n"));
	this.trainingData.set("irish_forenames","ainm\naibhilín\neibhlín\naffraic\naifric\naíbhinn\naoibhin\nailbhe\náine\nanne\naisling\naislin\naislinn\naithche\naodhamair\naodhnait\naoibheann\naoibhinn\naoibhe\naoife\nathracht\nbarrdhubh\nbébhinn\nvivian\nbláth\nbláthnaid\nflora\nblinne\nblanche\nbríd\nbrighid\nbrídín\nbrighdín\nbrónach\nbuadhnait\ncacht\ncaoimhe\ncaoilfhionn\nciamhnait\nciannait\nciara\nclíona\ncliodhna\nclodagh\ncobhlaith\ncobhfhlaith\ndamhnait\ndymphna\ndearbháil\ndervilia\ndearbhfhorgaill\ndearbhfhorghaill\ndearbhla\ndeirdre\ndianaimh\ndoireann\ndorothy\ndubhchobhlaigh\ndubhóg\nearnait\neasnadh\neithne\néimhear\neimhear\neimear\neimer\némer\néadaoin\nétaín\nedwina\nfaoiltighearna\nfeidhelm\nféthnaid\nféthnat\nfiadhnait\nfíona\nfionnuala\nfionnghuala\nflann\nflannait\nfodhla\nforbhlaith\nfíneamhain\ngeiléis\ngobnait\ngormlaith\ngormfhlaith\ngráinne\ngranya\ngrace\niodhnait\níde\nlann\nlasairfhíona\nmeabh\nmeadhbh\nmeibhín\nmeidhbhín\nmeaveen\nmealla\nmíde\nmór\nsarah\nmóirín\nmiodhnait\nmuadhnait\nmuireann\nmuirinn\nmarion\nmuirgheal\nmuirne\nniamh\nnuala\nnóra\nnóirín\nodharnait\nonóra\nhonora\nórla\nórlaith\nórfhlaith\npeig\npeigi\npeigín\nrathnait\nríona\nríonach\nríoghnach\nsadhbh\nsaev\nsaoirse\nsaorla\nsaorlaith\nsaorfhlaith\nsíthmaith\nsláine\nsorcha\ntuathflaith\nuallach\nuasal\núna\nabbán\naibhne\nailín\nainníleas\namhalgaidh\nanluan\nanmchadh\naodh\naodhán\naogán\naodhagán\naonghus\nárdghal\nardghal\nardghar\nart\nbarra\nbairre\nbearach\nbaothghalach\nbeacán\nbearchán\nbran\nbreasal\nbasil\nbreandán\nbreanndán\nbréanainn\nbrian\nbrochadh\nbuadhach\ncailean\ncoilean\ncoileán\ncoilín\ncuileán\ncairbre\ncalbhach\ncaoimhín\ncaoimhghín\ncaolán\nkyle\ncaomhán\ncarraig\ncárthach\ncathal\ncharles\ncathaoir\ncharles\ncathbharr\nceallach\nceallachán\ncearbhall\ncharles\ncian\ncianán\nciarán\ncinnéididh\ncinnéidigh\ncionaodh\nciothruadh\ncillian\ncoinneach\ncainneach\ncanice\ncoireall\ncyril\ncolla\ncolm\ncolum\ncolmán\ncomán\ncomhghall\ncomhghan\nconall\nconán\nconaire\nconchúr\nconchobhar\nconchubhar\nconghalach\nconmhac\nconn\nconnla\nconnlaodh\ncormac\ncosnamhach\ncriomthann\ncróchán\ncrónán\ncuan\ncúchonnacht\ncuimín\ncúmhaighe\ncúmheadha\ndabhag\ndabhóg\ndáithí\ndavid\ndamháin\ndara\ndaire\ndéaglán\ndeaglán\ndeclan\ndeasmhumhnach\ndiarmaid\ndiarmait\njeremiah\ndónall\ndomhnall\ndaniel\ndonn\ndonnán\ndonnchadh\ndonnchadha\ndenis\ndubhaltach\ndubhán\ndubhghall\ndubhghlas\ndúnlang\neachaidh\neachann\neachdhonn\neachthighearn\néanán\néanna\néinde\nearcán\nearnán\neirnín\néibhear\néignach\neignach\néigneachán\neigneachán\néimhín\néireamhón\neireamhón\neireamhán\neochaidh\neoghan\neoghainín\nfachtna\nfáilbhe\nfaolán\nfearadhach\nfearchar\nfearganainm\nfearghal\nfeichín\nféilim\nfeidhlim\nfelix\nfergus\nfeargus\nfearghus\nfiach\nfiacha\nfiachra\nfeary\nfinghin\nfionghuine\nfionn\nfionntán\nfinnian\nfintan\nfinian\nfionnbharr\nfitheal\nflann\nflannán\ngarbhán\nglaisne\niarlaith\niarfhlaith\nirial\nlachtna\nlaoiseach\nlaoighseach\nlewis\nlasairian\nlochlann\nlochlainn\nlomán\nlonán\nlorcán\nlaurence\nlughaidh\nlewis\nmaeleachlainn\nmaelsheachlainn\nmalachy\nmaelíosa\nmainchín\nmaodhóg\nmaoilín\nmaoilir\nmaolcholm\nmaolcholuim\nmaolmórdha\nmaolmhuire\nmaolruadháin\nmathghamhain\nmuircheartach\nmortimer\nmuireadhach\nmuireach\nmuirgheas\nmuiris\nmurchadh\nnaomhán\nnaos\nneachtan\nneasán\nniall\nniallán\nodhrán\noireachtach\noisín\noscar\nriain\nroibhilín\nraibhilín\nruibhilín\nrónán\nros\nruadhán\nruairi\nruari\nruairí\nruarí\nruaidhri\nruaridh\nroger\nsaerbhreathach\nseachnasach\nséadna\nsenán\nsiadhal\nsiaghal\nsioda\nsuibhne\ntadhg\ntimothy\ntaichleach\ntighernach\ntighearnán\ntiarnach\ntiarnán\ntiernan\ntoirdhealbhach\ntoirleach\nterry\ntorna\ntreabhair\ntuathal\nuaitéar\nuaithne\nualgharg\nultán\ncaitlín\ncatraoine\ncaitríona\ncaitrín\néabha\neibhlín\neilín\neilís\náilís\nmáire\nmairéad\nmairghréad\nmáirín\nráichéal\nraghnailt\nrós\nróis\nróisín\nsíle\nsinéad\nsiobhán\nambrós\namhlaoibh\nárón\nailin\naindriú\naindréas\nartúr\nagaistín\nágastas\nantóin\nbearnárd\nbeinidict\ncríostóir\ndainéal\néadbhárd\neamon\néamon\neoin\neóin\njohn\ngearóid\ngréagóir\ngreagoir\niúdás\nlabhrás\nlubhrás\nliam\nuilliam\nmáirtín\nmaitiú\nmícheál\nnioclás\noilibhéar\npádraig\npeadar\npilib\nproinsias\nfroinsias\npól\npóil\nristeárd\nristéard\nréamann\nréamonn\nroibéard\nroibeárd\nroibeard\nseán\nséan\nseathan\nséaonin\nséafra\nséamus\nséamas\nseárlas\nseoirse\nseosamh\niósaf\nióseph\nsíomón\nstíofán\ntéodóir\ntiobóid\ntomás\nuinseann".split("\n"));
	this.trainingData.set("icelandic_forenames","aagot\nabela\nabigael\nada\nadda\naddú\naddý\nadela\nadelía\nadríana\naðalbjörg\naðalbjört\naðalborg\naðaldís\naðalfríður\naðalheiður\naðalrós\naðalsteina\naðalsteinunn\naðalveig\nagata\nagatha\nagða\nagla\nagnea\nagnes\nagneta\nágústa\nágústína\nakira\nalanta\nalba\nalberta\nalbína\nalda\naldís\naldný\nalena\naleta\naletta\nalexa\nalexandra\nalexandría\nalexis\nalexía\nalexstrasa\nalfa\nálfdís\nálfey\nálfgerður\nálfheiður\nálfhildur\nalfífa\nálfrós\nálfrún\nálfsól\nalice\nalida\nalída\nalína\nalís\nalísa\nalla\nallý\nalma\nalrún\nalva\nalvilda\namadea\namal\namalía\namanda\namelía\namilía\namíra\namy\namý\nanalía\nanastasía\nandra\nandrá\nandrea\nandríana\nanetta\nangela\nangelía\nangelíka\nanika\naníka\nanína\nanita\naníta\nanja\nann\nanna\nannabella\nannalísa\nanne\nannelí\nannetta\nanney\nannika\nannía\nanný\nantonía\napríl\nara\nárbjörg\nárbjört\nardís\nárdís\nárelía\narey\naría\naríaðna\naríana\naríanna\naríela\naríella\narín\narína\narinbjörg\naris\narís\narisa\narja\nárlaug\narmenía\nármey\narna\nárna\narnbjörg\narnborg\narndís\nárndís\narney\nárney\narnfinna\narnfríður\narngerður\narngunnur\narnheiður\nárnheiður\narnhildur\narnika\nárnína\narnkatla\narnlaug\narnleif\narnlín\narnljót\narnóra\narnrós\narnrún\nárný\narnþóra\narnþrúður\náróra\nársól\nársæl\nárún\nárveig\nárvök\nárþóra\nása\násbjörg\násborg\násdís\násfríður\násgerður\náshildur\nasía\nasírí\náskatla\naskja\násla\náslaug\násleif\násný\násrós\násrún\nassa\nást\násta\nástbjörg\nástbjört\nástdís\nástfríður\nástgerður\nástheiður\násthildur\nastrid\nástríður\nástrós\nástrún\nástveig\nástþóra\nástþrúður\násvör\natalía\natena\nathena\natla\natlanta\nauðbjörg\nauðbjört\nauðdís\nauðlín\nauðna\nauðný\nauðrún\nauður\naurora\naxelía\naxelma\naþena\nbaldey\nbaldrún\nbaldvina\nbarbara\nbarbára\nbassí\nbára\nbebba\nbegga\nbelinda\nbella\nbenedikta\nbengta\nbenidikta\nbenía\nbeníta\nbenna\nbenney\nbenný\nbenta\nbentey\nbentína\nbera\nbergdís\nbergey\nbergfríður\nbergheiður\nberghildur\nberglaug\nberglind\nberglín\nbergljót\nbergmannía\nbergný\nbergrán\nbergrín\nbergrós\nbergrún\nbergsveina\nbergþóra\nberit\nbernódía\nberta\nbertha\nbessí\nbestla\nbeta\nbetanía\nbetsý\nbettý\nbíbí\nbil\nbína\nbirgit\nbirgitta\nbirna\nbirta\nbirtna\nbjargdís\nbjargey\nbjargheiður\nbjarghildur\nbjarglind\nbjarkey\nbjarklind\nbjarma\nbjarndís\nbjarney\nbjarnfríður\nbjarngerður\nbjarnheiður\nbjarnhildur\nbjarnlaug\nbjarnrún\nbjarnveig\nbjarný\nbjarnþóra\nbjarnþrúður\nbjartey\nbjartmey\nbjörg\nbjörgey\nbjörgheiður\nbjörghildur\nbjörk\nbjörney\nbjörnfríður\nbjört\nbláey\nbláklukka\nblíða\nblín\nblómey\nblædís\nblær\nbobba\nbóel\nboga\nbogdís\nbogey\nbogga\nboghildur\nborg\nborgdís\nborghildur\nborgný\nborgrún\nborgþóra\nbót\nbóthildur\nbotnía\nbrá\nbraga\nbraghildur\nbrák\nbranddís\nbrandís\nbríana\nbríanna\nbriet\nbríet\nbrigitta\nbrimdís\nbrimhildur\nbrimrún\nbrit\nbritt\nbritta\nbryndís\nbrynfríður\nbryngerður\nbrynheiður\nbrynhildur\nbrynja\nbrynný\nburkney\nbylgja\ncamilla\ncaritas\ncarla\ncarmen\ncathinca\ncecilia\ncecilía\ncharlotta\ncharlotte\nchrista\nchristel\nchristina\nchristine\nclara\ndaðey\ndaðína\ndagbjörg\ndagbjört\ndagfríður\ndaggrós\ndagheiður\ndagmar\ndagmey\ndagný\ndagrún\ndaldís\ndaley\ndalía\ndalla\ndallilja\ndalrós\ndana\ndaney\ndanfríður\ndanheiður\ndanhildur\ndanía\ndaníela\ndaníella\ndara\ndaría\ndebora\ndebóra\ndendý\ndía\ndíana\ndíanna\ndidda\ndilja\ndiljá\ndíma\ndimma\ndimmblá\ndimmey\ndís\ndísa\ndísella\ndóa\ndómhildur\ndonna\ndóra\ndórey\ndoris\ndóris\ndórótea\ndorothea\ndórothea\ndóróthea\ndrauma\ndraumey\ndrífa\ndroplaug\ndrótt\ndröfn\ndúa\ndúfa\ndúna\ndúnna\ndýrborg\ndýrfinna\ndýrleif\ndýrley\ndýrunn\ndæja\ndögg\ndögun\nebba\nebonney\nedda\nedel\nedil\nedit\nedith\neðna\nefemía\negedía\neggrún\negla\neiðný\neiðunn\neik\neileiþía\neinbjörg\neindís\neiney\neinfríður\neinhildur\neinína\neinrún\neir\neirdís\neirfinna\neiríka\neirný\neirún\neivör\nelba\neldbjörg\neldey\neldlilja\neldrún\neldþóra\neleina\nelektra\nelena\nelenborg\nelfa\nelfur\nelía\nelíana\nelín\nelina\nelína\nelíná\nelínbet\nelínbjörg\nelínbjört\nelinborg\nelínborg\nelíndís\nelíngunnur\nelínheiður\nelínrós\nelírós\nelísa\nelísabet\nelisabeth\nelísabeth\nelíza\nelka\nella\nellen\nelley\nellisif\nellín\nelly\nellý\nelma\nelna\nelsa\nelsabet\nelsie\nelsí\nelsý\nelva\nelvi\nelvira\nelvíra\nelvý\nembla\nemelía\nemelíana\nemelína\nemeralda\nemilía\nemilíana\nemilíanna\nemilý\nemma\nemmý\nemý\nenea\neneka\nengilbjört\nengilráð\nengilrós\nengla\nenika\neníta\nenja\nenóla\neres\nerika\nerin\nerla\nerlen\nerlín\nerna\nesja\neskja\nesmeralda\nester\nesther\nestiva\nethel\netna\neufemía\neva\nevelyn\nevey\nevfemía\nevgenía\nevíta\nevlalía\ney\neybjörg\neybjört\neyborg\neydís\neyfríður\neygerður\neygló\neyhildur\neyja\neyjalín\neyleif\neylín\neyrós\neyrún\neyveig\neyvör\neyþóra\neyþrúður\nfanndís\nfanney\nfannlaug\nfanny\nfanný\nfebrún\nfema\nfía\nfídes\nfífa\nfilipía\nfilippa\nfilippía\nfinna\nfinnbjörg\nfinnbjörk\nfinnboga\nfinnborg\nfinndís\nfinney\nfinnfríður\nfinnlaug\nfinnrós\nfjalldís\nfjóla\nflóra\nfolda\nfrán\nfransiska\nfranziska\nfregn\nfreydís\nfreygerður\nfreyja\nfreylaug\nfreyleif\nfríða\nfriðbjörg\nfriðbjört\nfriðborg\nfriðdís\nfriðdóra\nfriðey\nfriðfinna\nfriðgerður\nfriðjóna\nfriðlaug\nfriðleif\nfriðlín\nfriðmey\nfriðný\nfriðrika\nfriðrikka\nfriðrós\nfriðrún\nfriðsemd\nfríður\nfriðveig\nfriðþóra\nfrigg\nfróðný\nfrostrós\nfura\nfönn\ngabríela\ngabríella\ngauja\ngauthildur\ngefjun\ngefn\ngeira\ngeirbjörg\ngeirdís\ngeirfinna\ngeirfríður\ngeirhildur\ngeirlaug\ngeirlöð\ngeirný\ngeirríður\ngeirrún\ngeirþrúður\ngeorgía\ngerða\ngerður\ngestheiður\ngestný\ngestrún\ngía\ngígja\ngillý\ngilslaug\ngísela\ngísla\ngísley\ngíslína\ngíslný\ngíslrún\ngíslunn\ngissunn\ngíta\ngjaflaug\ngló\nglóa\nglóbjört\nglóð\nglódís\nglóey\ngloría\ngná\ngóa\ngógó\ngrein\ngrélöð\ngret\ngrét\ngreta\ngréta\ngrethe\ngríma\ngrímey\ngrímheiður\ngrímhildur\ngróa\ngúa\nguðbjörg\nguðbjört\nguðborg\nguðdís\nguðfinna\nguðfríður\nguðjóna\nguðlaug\nguðleif\nguðlín\nguðmey\nguðmunda\nguðmundína\nguðný\nguðríður\nguðrún\nguðsteina\nguðveig\ngullbrá\ngullveig\ngullý\ngumma\ngunnbjörg\ngunnbjört\ngunnborg\ngunndís\ngunndóra\ngunnella\ngunnfinna\ngunnfríður\ngunnharða\ngunnheiður\ngunnhildur\ngunnjóna\ngunnlaug\ngunnleif\ngunnlöð\ngunnrún\ngunnur\ngunnveig\ngunnvör\ngunný\ngunnþóra\ngunnþórunn\ngurrý\ngyða\ngyðja\ngyðríður\ngytta\ngæfa\ngæflaug\nhadda\nhaddý\nhafbjörg\nhafborg\nhafdís\nhafey\nhafliða\nhaflína\nhafný\nhafrós\nhafrún\nhafsteina\nhafþóra\nhákonía\nhalla\nhallbera\nhallbjörg\nhallborg\nhalldís\nhalldóra\nhalley\nhallfríður\nhallgerður\nhallgunnur\nhallkatla\nhallný\nhallrún\nhallveig\nhallvör\nhanna\nhanney\nhansa\nhansína\nharpa\nhauður\nheba\nhebba\nhedda\nhedí\nheida\nheiða\nheiðbjörg\nheiðbjörk\nheiðbjört\nheiðbrá\nheiðdís\nheiðlaug\nheiðlóa\nheiðný\nheiðrós\nheiðrún\nheiður\nheiðveig\nhekla\nhelen\nhelena\nhelga\nhella\nhelma\nhendrikka\nhenný\nhenrietta\nhenrika\nhenríetta\nhera\nherbjörg\nherbjört\nherborg\nherdís\nherfríður\nhergerður\nherlaug\nhermína\nhersilía\nherta\nhertha\nhervör\nherþrúður\nhilda\nhildegard\nhildibjörg\nhildigerður\nhildigunnur\nhildiríður\nhildisif\nhildur\nhilma\nhiminbjörg\nhind\nhinrika\nhinrikka\nhjalta\nhjaltey\nhjálmdís\nhjálmey\nhjálmfríður\nhjálmgerður\nhjálmrós\nhjálmrún\nhjálmveig\nhjördís\nhjörfríður\nhjörleif\nhjörný\nhjörtfríður\nhlaðgerður\nhlédís\nhleiður\nhlíf\nhlín\nhlökk\nhólmbjörg\nhólmdís\nhólmfríður\nhrafna\nhrafnborg\nhrafndís\nhrafney\nhrafnfífa\nhrafngerður\nhrafnheiður\nhrafnhildur\nhrafnkatla\nhrafnlaug\nhrafntinna\nhraundís\nhrefna\nhreindís\nhróðný\nhrólfdís\nhrund\nhrönn\nhugbjörg\nhugbjört\nhugborg\nhugdís\nhugljúf\nhugrún\nhuld\nhulda\nhuldís\nhuldrún\nhúna\nhúnbjörg\nhúndís\nhúngerður\nhvönn\nhödd\nhögna\nhörn\nida\nída\nidda\niða\niðunn\nilmur\nilse\níma\nimmý\nina\nína\ninda\nindí\nindia\nindía\nindiana\nindíana\nindíra\nindra\ninga\ningdís\ningeborg\ninger\ningey\ningheiður\ninghildur\ningibjörg\ningibjört\ningiborg\ningifinna\ningifríður\ningigerður\ningilaug\ningileif\ningilín\ningimaría\ningimunda\ningiríður\ningirós\ningisól\ningiveig\ningrid\ningrún\ningunn\ningveldur\ninna\nír\níren\nirena\nírena\nirene\níris\nirja\nirma\nirmelín\nirmý\nirpa\nírunn\nisabel\nísabel\nisabella\nísabella\nísadóra\nísafold\nísalind\nísbjörg\nísdís\nísey\nísfold\nísgerður\níshildur\nísidóra\nísis\níslaug\nísleif\níslilja\nísmey\nísold\nísól\nísrún\níssól\nísveig\níunn\níva\njakobína\njana\njane\njanetta\njannika\njara\njarla\njárnbrá\njárngerður\njarún\njarþrúður\njasmín\njenetta\njenna\njenny\njenný\njensína\njessý\njóa\njóanna\njódís\njófríður\njóhanna\njólín\njóna\njónanna\njónasína\njónbjörg\njónbjört\njóndís\njóndóra\njóney\njónfríður\njóngerð\njónheiður\njónhildur\njónída\njónína\njóninna\njónný\njóný\njóra\njóríður\njórlaug\njórunn\njósebína\njósefín\njósefína\njovina\njúdea\njúdit\njudith\njúlía\njúlíana\njúlíanna\njúlíetta\njúlíhuld\njúlína\njúlírós\njúní\njúnía\njúníana\njökla\njökulrós\njörgína\nkaðlín\nkaja\nkala\nkalla\nkamí\nkamilla\nkamma\nkapitola\nkapítóla\nkara\nkára\nkaren\nkarí\nkarin\nkarín\nkarína\nkaritas\nkarítas\nkarla\nkarlína\nkarlinna\nkarlotta\nkarmen\nkaró\nkarol\nkarólín\nkarolína\nkarólína\nkarún\nkassandra\nkata\nkatarína\nkaterína\nkatharina\nkathinka\nkatinka\nkatla\nkatrín\nkatrína\nkatý\nkellý\nkendra\nketilbjörg\nketilfríður\nketilríður\nkiddý\nkira\nkirsten\nkirstín\nkittý\nkjalvör\nkládía\nklara\nklementína\nkleópatra\nkókó\nkolbjörg\nkolbrá\nkolbrún\nkoldís\nkolfinna\nkolfreyja\nkolgríma\nkolka\nkonkordía\nkonný\nkorka\nkormlöð\nkornelía\nkría\nkrista\nkristbjörg\nkristborg\nkristel\nkristensa\nkristey\nkristfríður\nkristgerður\nkristíana\nkristíanna\nkristin\nkristín\nkristína\nkristine\nkristjana\nkristjóna\nkristlaug\nkristlín\nkristlind\nkristný\nkristólína\nkristrós\nkristrún\nkristveig\nkristvina\nkristý\nkristþóra\nkrumma\nkæja\nlaila\nlaíla\nlana\nlara\nlára\nlárensína\nláretta\nlárey\nlaufey\nlaufheiður\nlaufhildur\nlauga\nlaugey\nlaugheiður\nlea\nleikný\nleila\nlena\nleóna\nleonóra\nleónóra\nlexí\nleyla\nlíba\nlíf\nlífdís\nlilja\nliljá\nliljurós\nlill\nlilla\nlillian\nlilly\nlillý\nlily\nlilý\nlílý\nlín\nlína\nlínbjörg\nlind\nlinda\nlinddís\nlíndís\nlíneik\nlíney\nlingný\nlínhildur\nlísa\nlísabet\nlísandra\nlísbet\nlisbeth\nlísebet\nlistalín\nliv\nlív\nljósbjörg\nljósbrá\nljótunn\nlóa\nlofn\nloftveig\nlogey\nlokbrá\nlóreley\nlotta\nlouisa\nlouise\nlovísa\nlúcía\nlúðvíka\nlúísa\nlukka\nlúna\nlúsinda\nlúsía\nlúvísa\nlydia\nlýdía\nlydía\nlyngheiður\nlýra\nlæla\nmábil\nmaddý\nmagda\nmagdalena\nmagðalena\nmagga\nmaggey\nmaggý\nmagna\nmagndís\nmagnea\nmagnes\nmagney\nmagnfríður\nmagnheiður\nmagnhildur\nmagnúsína\nmagný\nmagnþóra\nmaía\nmaídís\nmaísól\nmaj\nmaja\nmalen\nmalena\nmálfríður\nmálhildur\nmalía\nmalika\nmalín\nmalína\nmalla\nmálmfríður\nmánadís\nmanda\nmáney\nmanúela\nmanúella\nmara\nmára\nmardís\nmarela\nmarella\nmaren\nmarey\nmarfríður\nmargit\nmargot\nmargret\nmargrét\nmargrjet\nmargunnur\nmarheiður\nmarí\nmaria\nmaría\nmaríam\nmarían\nmaríana\nmaríanna\nmarie\nmarikó\nmarín\nmarína\nmarinella\nmarínella\nmaríon\nmarísa\nmarísól\nmarit\nmarít\nmaríuerla\nmarja\nmarkrún\nmarlaug\nmarlena\nmarlín\nmarlís\nmarólína\nmarsa\nmarselía\nmarselína\nmarsibil\nmarsilía\nmarsý\nmarzibil\nmarta\nmartha\nmartína\nmary\nmarý\nmathilda\nmatta\nmattea\nmatthea\nmatthía\nmattíana\nmatthilda\nmatthildur\nmattína\nmattý\nmaxima\nmeda\nmekkin\nmekkín\nmelinda\nmelissa\nmelkorka\nmelrós\nmessíana\nmetta\nmey\nmía\nmikaela\nmikaelína\nmikkalína\nmíla\nmilda\nmildríður\nmilla\nmillý\nmímósa\nminerva\nmínerva\nminna\nminney\nminný\nmíra\nmíranda\nmiriam\nmíríel\nmirja\nmirjam\nmirra\nmist\nmítra\nmjaðveig\nmjalldís\nmjallhvít\nmjöll\nmóa\nmódís\nmóeiður\nmóey\nmóheiður\nmona\nmóna\nmonika\nmónika\nmóníka\nmorgunsól\nmunda\nmundheiður\nmundhildur\nmundína\nmyrra\nmýr\nmýra\nmyrk\nmýrún\nmörk\nnáð\nnadia\nnadía\nnadja\nnana\nnanna\nnanný\nnansý\nnaomí\nnaómí\nnatalía\nnatalie\nnáttsól\nnella\nnellý\nnenna\nnicole\nniðbjörg\nnikíta\nnikoletta\nnikólína\nnína\nníní\nninja\nninna\nnjála\nnjóla\nnóa\nnóra\nnorma\nnótt\nnýbjörg\nobba\nóda\nodda\noddbjörg\noddfreyja\noddfríður\noddgerður\noddhildur\noddlaug\noddleif\noddný\noddrún\noddveig\noddvör\nóðný\nófelía\noktavía\noktóvía\nóla\nólafía\nólafína\nólavía\nolga\nólína\nolivia\nólivía\nollý\nólöf\nora\norka\normheiður\normhildur\nósa\nósk\nósklín\notkatla\notta\nótta\npála\npáldís\npáley\npálfríður\npálhanna\npálheiður\npálhildur\npálín\npálína\npálmey\npálmfríður\npálrún\npamela\nparís\npatricia\npatrisía\nperla\npeta\npetra\npetrea\npetrína\npétrína\npetronella\npetrónella\npetrós\npetrún\npétrún\npetrúnella\npía\npolly\npollý\npría\nráðhildur\nrafney\nrafnhildur\nragna\nragnbjörg\nragney\nragnfríður\nragnheiður\nragnhildur\nrakel\nramóna\nrán\nrandalín\nrandíður\nrandý\nranka\nrannva\nrannveig\nrea\nrebekka\nreginbjörg\nregína\nrein\nrenata\nreyn\nreyndís\nreynheiður\nreynhildur\nríkey\nrikka\nrín\nripley\nrita\nríta\nróberta\nróbjörg\nronja\nrorí\nrós\nrósa\nrósalía\nrósalind\nrósanna\nrósbjörg\nrósborg\nróselía\nrósey\nrósfríður\nróshildur\nrósinkara\nrósinkransa\nróska\nróslaug\nróslind\nróslinda\nróslín\nrósmary\nrósmarý\nrósmunda\nrósný\nroxanna\nrúbý\nrún\nrúna\nrúndís\nrúnhildur\nrunný\nrúrí\nrut\nruth\nröfn\nrögn\nröskva\nsabína\nsabrína\nsaga\nsalbjörg\nsaldís\nsalgerður\nsalín\nsalína\nsalka\nsalma\nsalný\nsalome\nsalóme\nsalvör\nsandra\nsanna\nsantía\nsara\nsarína\nsefanía\nselena\nselja\nselka\nselma\nsenía\nseptíma\nsera\nserena\nseselía\nsesilía\nsesselía\nsesselja\nsessilía\nsía\nsif\nsigdís\nsigdóra\nsigfríð\nsigfríður\nsigga\nsiggerður\nsigmunda\nsigna\nsignhildur\nsigný\nsigrid\nsigríður\nsigrún\nsigurást\nsigurásta\nsigurbára\nsigurbirna\nsigurbjörg\nsigurbjört\nsigurborg\nsigurdís\nsigurdóra\nsigurdríf\nsigurdrífa\nsigurða\nsigurey\nsigurfinna\nsigurfljóð\nsigurgeira\nsigurhanna\nsigurhelga\nsigurhildur\nsigurjóna\nsigurlaug\nsigurleif\nsigurlilja\nsigurlinn\nsigurlín\nsigurlína\nsigurmunda\nsigurnanna\nsigurósk\nsigurrós\nsigursteina\nsigurunn\nsigurveig\nsigurvina\nsigurþóra\nsigvalda\nsigyn\nsigþóra\nsigþrúður\nsilfa\nsilfá\nsilfrún\nsilja\nsilka\nsilla\nsilva\nsilvana\nsilvía\nsímona\nsímonía\nsirra\nsirrí\nsirrý\nsísí\nsíta\nsiv\nsivía\nsjana\nsjöfn\nskarpheiður\nskugga\nskúla\nskuld\nskúlína\nsnjáfríður\nsnjáka\nsnjófríður\nsnjólaug\nsnorra\nsnót\nsnæbjörg\nsnæbjört\nsnæborg\nsnæbrá\nsnædís\nsnæfríður\nsnælaug\nsnærós\nsnærún\nsoffía\nsofía\nsofie\nsól\nsóla\nsólbjörg\nsólbjört\nsólborg\nsólbrá\nsólbrún\nsóldís\nsóldögg\nsóley\nsólfríður\nsólgerður\nsólhildur\nsólín\nsólkatla\nsóllilja\nsólný\nsólrós\nsólrún\nsolveig\nsólveig\nsólvör\nsónata\nsonja\nsonný\nsophia\nsophie\nstasía\nstefana\nstefanía\nstefánný\nsteina\nsteinbjörg\nsteinborg\nsteindís\nsteindóra\nsteiney\nsteinfríður\nsteingerður\nsteinhildur\nsteinlaug\nsteinrós\nsteinrún\nsteinunn\nsteinvör\nsteinþóra\nstella\nstígheiður\nstígrún\nstína\nstjarna\nstjarney\nstyrgerður\nsúla\nsúlamít\nsumarlína\nsumarrós\nsunna\nsunnefa\nsunneva\nsunniva\nsunníva\nsusan\nsúsan\nsúsanna\nsvafa\nsvala\nsvalrún\nsvana\nsvanbjörg\nsvanbjört\nsvanborg\nsvandís\nsvaney\nsvanfríður\nsvanheiður\nsvanhildur\nsvanhvít\nsvanlaug\nsvanrós\nsvanþrúður\nsvava\nsvea\nsveina\nsveinbjörg\nsveinborg\nsveindís\nsveiney\nsveinfríður\nsveingerður\nsveinhildur\nsveinlaug\nsveinrós\nsveinrún\nsveinsína\nsveinveig\nsylgja\nsylva\nsylvia\nsylvía\nsæbjörg\nsæbjört\nsæborg\nsæbrá\nsædís\nsæfinna\nsæfríður\nsæhildur\nsæla\nsælaug\nsæmunda\nsæný\nsærós\nsærún\nsæsól\nsæunn\nsævör\nsölva\nsölvey\nsölvína\ntala\ntalía\ntamar\ntamara\ntanía\ntanja\ntanya\ntanya\ntara\ntea\nteitný\ntekla\ntelma\ntera\nteresa\nteresía\nthea\nthelma\ntheodóra\ntheódóra\ntheresa\ntía\ntíalilja\ntíbrá\ntína\ntindra\ntinna\ntirsa\ntóbý\ntodda\ntóka\ntorbjörg\ntorfey\ntorfheiður\ntorfhildur\ntóta\ntristana\ntrú\ntryggva\ntryggvína\ntýra\núa\nugla\núlfa\núlfdís\núlfey\núlfheiður\núlfhildur\núlfrún\núlla\nuna\núna\nundína\núndína\nunna\nunnbjörg\nunndís\nunnur\núranía\nurður\núrsúla\nvagna\nvagnbjörg\nvagnfríður\nvaka\nvala\nvalbjörg\nvalbjörk\nvalbjört\nvalborg\nvaldheiður\nvaldís\nvalentína\nvalería\nvaley\nvalfríður\nvalgerða\nvalgerður\nvalgý\nvalhildur\nvalka\nvalkyrja\nvallý\nvalný\nvalrós\nvalrún\nvalva\nvalý\nvalþrúður\nvanda\nvár\nvarða\nvébjörg\nvédís\nvégerður\nveig\nveiga\nvélaug\nvenný\nvenus\nvéný\nvera\nveronika\nverónika\nveróníka\nvetrarrós\nvibeka\nvíbekka\nvictoría\nviðja\nvíf\nvigdís\nvígdögg\nvíggunnur\nviglín\nvigný\nviktoria\nviktoría\nvilborg\nvildís\nvilfríður\nvilgerður\nvilhelmína\nvilla\nvillimey\nvilma\nvilný\nvinbjörg\nvinný\nvinsý\nvíóla\nvíóletta\nvirginía\nvísa\nvon\nvoney\nvordís\nýja\nylfa\nylfur\nylja\nylva\nýma\nynja\nýr\nyrja\nýrr\nyrsa\nþalía\nþeba\nþeódís\nþeódóra\nþingey\nþjóðbjörg\nþjóðhildur\nþoka\nþollý\nþóra\nþóranna\nþórarna\nþorbjörg\nþórbjörg\nþórða\nþórdís\nþórelfa\nþórelfur\nþórey\nþorfinna\nþórfríður\nþorgerður\nþorgríma\nþórgunna\nþórgunnur\nþórhalla\nþórhanna\nþórheiður\nþórhildur\nþorkatla\nþórkatla\nþorlaug\nþórlaug\nþorleif\nþórleif\nþórný\nþórodda\nþorsteina\nþórsteina\nþórsteinunn\nþorstína\nþórstína\nþórunn\nþórveig\nþórvör\nþrá\nþrúða\nþrúður\nþúfa\nþula\nþura\nþurí\nþuríður\nþurý\nþyri\nþyrí\nþyrnirós\nþöll\nægileif\næsa\næsgerður\nævör\nögmunda\nögn\nölrún\nölveig\nörbrún\nörk\nösp\naage\naaron\nabel\nabraham\naðalberg\naðalbergur\naðalbert\naðalbjörn\naðalborgar\naðalgeir\naðalmundur\naðalráður\naðalsteinn\naðalvíkingur\nadam\naddi\nadel\nadíel\nadólf\naðólf\nadrían\nadríel\nagnar\nagni\nágúst\náki\nalbert\naldar\nalex\nalexander\nalexíus\nálfar\nálfgeir\nálfgrímur\nalfons\nalfred\nalfreð\nálfur\nálfþór\nali\nallan\nalli\nalmar\nalrekur\nalvar\nalvin\namil\namír\namos\námundi\nanders\nandreas\nandré\nandrés\nandri\nanes\nanfinn\nangantýr\nangi\nannar\nannarr\nannas\nannel\nannes\nanthony\nanton\nantoníus\nantóníus\naran\nárbjartur\nárbjörn\nárelíus\narent\nares\nárgeir\nárgils\nari\narilíus\narinbjörn\naríel\naríus\nármann\narnald\narnaldur\narnar\narnberg\narnbergur\narnbjörn\narndór\narnes\narnfinnur\narnfreyr\narngarður\narngeir\narngils\narngrímur\nárni\narnkell\narnlaugur\narnleifur\narnljótur\narnmóður\narnmundur\narnoddur\narnold\narnór\narnsteinn\narnúlfur\narnviður\narnþór\naron\nársæll\narthur\narthúr\nartúr\nás\nasael\násberg\násbergur\násbjörn\násdór\násgautur\násgeir\násgils\násgrímur\nási\náskell\naskur\náslaugur\náslákur\násmar\násmundur\násólfur\naspar\násröður\nástbjörn\nástgeir\nástmar\nástmundur\nástráður\nástríkur\nástvald\nástvaldur\nástvar\nástvin\nástþór\násvaldur\násvarður\násþór\natlas\natli\nauðberg\nauðbergur\nauðbert\nauðbjörn\nauðgeir\nauðkell\nauðmundur\nauðólfur\nauðun\nauðunn\nauður\naustar\naustmann\naustmar\naustri\naxel\nbaldur\nbaldvin\nbaldwin\nbaltasar\nbambi\nbarði\nbarri\nbassi\nbastían\nbaugur\nbárður\nbeinir\nbeinteinn\nbeitir\nbekan\nbenedikt\nbenidikt\nbenjamín\nbenoný\nbenóní\nbenóný\nbent\nbenvý\nberent\nberg\nbergfinnur\nberghreinn\nbergjón\nbergmann\nbergmar\nbergmundur\nbergsteinn\nbergsveinn\nbergur\nbergvin\nbergþór\nbernhard\nbernharð\nbernharður\nberni\nbernódus\nbersi\nbertel\nbertram\nbessi\nbetúel\nbill\nbirgir\nbirkir\nbirnir\nbirtingur\nbirtir\nbjargar\nbjargmundur\nbjargþór\nbjarkan\nbjarkar\nbjarki\nbjarmar\nbjarmi\nbjarnar\nbjarnfinnur\nbjarnfreður\nbjarnharður\nbjarnhéðinn\nbjarni\nbjarnlaugur\nbjarnleifur\nbjarnólfur\nbjarnsteinn\nbjarnþór\nbjartmann\nbjartmar\nbjartur\nbjartþór\nbjólan\nbjólfur\nbjörgmundur\nbjörgólfur\nbjörgúlfur\nbjörgvin\nbjörn\nbjörnólfur\nblængur\nblær\nblævar\nboði\nbogi\nbolli\nborgar\nborgúlfur\nborgþór\nbóas\nbói\nbótólfur\nbragi\nbrandur\nbreki\nbresi\nbrestir\nbrimar\nbrimi\nbrími\nbrimir\nbrímir\nbrjánn\nbroddi\nbruno\nbryngeir\nbrynjar\nbrynjólfur\nbrynjúlfur\nbrynleifur\nbrynmar\nbrynsteinn\nbryntýr\nbrynþór\nburkni\nbúi\nbúri\nbæring\nbæringur\nbæron\nböðvar\nbörkur\ncarl\ncecil\ncesar\nchristian\nchristopher\ncýrus\ncæsar\ndaði\ndagbjartur\ndagfari\ndagfinnur\ndaggeir\ndagmann\ndagnýr\ndagur\ndagþór\ndalbert\ndalli\ndalmann\ndalmar\ndalvin\ndamjan\ndamon\ndan\ndanelíus\ndaniel\ndaníel\ndanival\ndaníval\ndante\ndaríus\ndarri\ndavíð\ndemus\ndeníel\ndennis\ndiðrik\ndíómedes\ndofri\ndolli\ndómald\ndómaldi\ndómaldur\ndominik\ndónald\ndónaldur\ndór\ndóri\ndósóþeus\ndraupnir\ndreki\ndrengur\ndufgus\ndufþakur\ndugfús\ndúi\ndúnn\ndvalinn\ndynþór\ndýri\ndýrmundur\nebbi\nebeneser\nebenezer\neberg\neddi\nedgar\nedilon\nedílon\nedvard\nedvin\nedward\neðvald\neðvar\neðvarð\nefraím\neggert\neggþór\negill\neiðar\neiður\neikar\neilífur\neinar\neinir\neinvarður\neinþór\neiríkur\neivin\nelberg\nelbert\neldar\neldgrímur\neldjárn\neldmar\neldon\neldór\neldur\nelentínus\nelfar\nelfráður\nelí\nelía\nelías\nelíeser\nelimar\nelímar\nelínbergur\nelínmundur\nelinór\nelínór\nelis\nelís\nellert\nelli\nelliði\nellís\nelmar\nelvar\nelvin\nelvis\nemanúel\nembrek\nemerald\nemil\nemmanúel\nengilbert\nengilbjartur\nengiljón\nengill\nenok\neric\nerik\nerlar\nerlendur\nerling\nerlingur\nermenrekur\nernestó\nernir\nernst\neron\nerpur\nesekíel\nesjar\nesra\nestefan\nevald\nevan\nevert\nevían\neyberg\neyjólfur\neylaugur\neyleifur\neymar\neymundur\neyríkur\neysteinn\neyvar\neyvindur\neyþór\nfabrisíus\nfáfnir\nfalgeir\nfálki\nfalur\nfannar\nfannberg\nfanngeir\nfelix\nfengur\nfenrir\nferdinand\nferdínand\nfertram\nfeykir\nfífill\nfilip\nfilippus\nfinn\nfinnbjörn\nfinnbogi\nfinngeir\nfinnjón\nfinnlaugur\nfinnur\nfinnvarður\nfjalar\nfjarki\nfjólar\nfjólmundur\nfjölnir\nfjölvar\nfjörnir\nflemming\nflóki\nflórent\nflosi\nflóvent\nfólki\nforni\nfossmar\nfrancis\nfrank\nfranklín\nfránn\nfrans\nfranz\nfrár\nfreybjörn\nfreygarður\nfreymar\nfreymóður\nfreymundur\nfreyr\nfreysteinn\nfreyviður\nfreyþór\nfriðberg\nfriðbergur\nfriðbert\nfriðbjörn\nfriðfinnur\nfriðgeir\nfriðjón\nfriðlaugur\nfriðleifur\nfriðmann\nfriðmar\nfriðmundur\nfriðrik\nfriðsteinn\nfríðsteinn\nfriður\nfriðvin\nfriðþjófur\nfriðþór\nfriedrich\nfrímann\nfritz\nfróði\nfróðmar\nfrosti\nfuni\nfúsi\nfylkir\ngabriel\ngabríel\ngael\ngaldur\ngamalíel\ngarðar\ngaribaldi\ngarpur\ngarri\ngaui\ngaukur\ngauti\ngautrekur\ngautur\ngautviður\ngeir\ngeirarður\ngeirfinnur\ngeirharður\ngeirhjörtur\ngeirhvatur\ngeiri\ngeirlaugur\ngeirleifur\ngeirmundur\ngeirólfur\ngeirröður\ngeirtryggur\ngeirvaldur\ngeirþjófur\ngeisli\ngellir\ngeorg\ngerald\ngerðar\ngeri\ngestur\ngígur\ngilbert\ngill\ngilmar\ngils\ngissur\ngizur\ngídeon\ngígjar\ngísli\ngjúki\nglói\nglúmur\ngneisti\ngnúpur\ngnýr\ngoði\ngóði\ngoðmundur\ngói\ngottskálk\ngottsveinn\ngrani\ngrankell\ngregor\ngreipur\ngreppur\ngretar\ngrettir\ngrétar\ngrímar\ngrímkell\ngrímlaugur\ngrímnir\ngrímólfur\ngrímur\ngrímúlfur\nguðberg\nguðbergur\nguðbjarni\nguðbjartur\nguðbjörn\nguðbrandur\nguðfinnur\nguðfreður\nguðgeir\nguðjón\nguðlaugur\nguðleifur\nguðleikur\nguðmann\nguðmar\nguðmon\nguðmundur\nguðni\nguðráður\nguðröður\nguðsteinn\nguðvarður\nguðveigur\nguðvin\nguðþór\ngulli\ngumi\ngunnar\ngunnberg\ngunnbjörn\ngunndór\ngunngeir\ngunnhallur\ngunnlaugur\ngunnleifur\ngunnólfur\ngunnóli\ngunnröður\ngunnsteinn\ngunnvaldur\ngunnþór\ngustav\ngutti\nguttormur\ngústaf\ngústav\ngýgjar\ngylfi\ngýmir\ngyrðir\nhaddi\nhaddur\nhafberg\nhafgrímur\nhafliði\nhafnar\nhafni\nhafsteinn\nhafþór\nhagalín\nhagbarður\nhagbert\nhaki\nhallberg\nhallbjörn\nhalldór\nhallfreður\nhallgarður\nhallgeir\nhallgils\nhallgrímur\nhallkell\nhallmann\nhallmar\nhallmundur\nhallsteinn\nhallur\nhallvarður\nhallþór\nhamar\nhannes\nhannibal\nhans\nharald\nharaldur\nharri\nharry\nharrý\nhartmann\nhartvig\nhauksteinn\nhaukur\nhaukvaldur\nhákon\nháleygur\nhálfdan\nhálfdán\nhámundur\nhárekur\nhárlaugur\nhásteinn\nhávar\nhávarður\nhávarr\nheiðar\nheiðarr\nheiðberg\nheiðbert\nheiðlindur\nheiðmann\nheiðmar\nheiðmundur\nheiðrekur\nheikir\nheilmóður\nheimir\nheinrekur\nheisi\nhektor\nhelgi\nhelmút\nhemmert\nhendrik\nhenning\nhenrik\nhenry\nhenrý\nherbert\nherbjörn\nherfinnur\nhergeir\nhergill\nhergils\nherjólfur\nherlaugur\nherleifur\nherluf\nhermann\nhermóður\nhermundur\nhersir\nhersteinn\nhersveinn\nhervar\nhervarður\nhervin\nhéðinn\nhilaríus\nhilbert\nhildar\nhildibergur\nhildibrandur\nhildigeir\nhildiglúmur\nhildimar\nhildimundur\nhildingur\nhildir\nhildiþór\nhilmar\nhilmir\nhimri\nhinrik\nhíram\nhjallkár\nhjalti\nhjarnar\nhjálmar\nhjálmgeir\nhjálmtýr\nhjálmur\nhjálmþór\nhjaltalín\nhjörleifur\nhjörtur\nhjörtþór\nhjörvar\nhleiðar\nhlégestur\nhlér\nhlini\nhlíðar\nhlíðberg\nhlífar\nhljómur\nhlynur\nhlöðmundur\nhlöður\nhlöðvarður\nhlöðver\nhnefill\nhnikar\nhnikarr\nholgeir\nholger\nholti\nhólm\nhólmar\nhólmbert\nhólmfastur\nhólmgeir\nhólmgrímur\nhólmkell\nhólmsteinn\nhólmþór\nhóseas\nhrafn\nhrafnar\nhrafnbergur\nhrafnkell\nhrafntýr\nhrannar\nhrappur\nhraunar\nhreggviður\nhreiðar\nhreiðmar\nhreimur\nhreinn\nhringur\nhrímnir\nhrollaugur\nhrolleifur\nhróaldur\nhróar\nhróbjartur\nhróðgeir\nhróðmar\nhróðólfur\nhróðvar\nhrói\nhrólfur\nhrómundur\nhrútur\nhrærekur\nhúbert\nhugberg\nhugi\nhuginn\nhugleikur\nhugo\nhugó\nhúgó\nhuldar\nhúmi\nhúnbogi\nhúni\nhúnn\nhúnröður\nhuxley\nhvannar\nhyltir\nhylur\nhængur\nhænir\nhöður\nhögni\nhörður\nhöskuldur\nían\nígor\nilías\nillugi\ními\nimmanúel\nindriði\ningberg\ningi\ningiberg\ningibergur\ningibert\ningibjartur\ningibjörn\ningileifur\ningimagn\ningimar\ningimundur\ningivaldur\ningiþór\ningjaldur\ningmar\ningólfur\ningvaldur\ningvar\ningvi\ningþór\nísak\nísar\nísarr\nísbjörn\níseldur\nísgeir\nísidór\nísleifur\nismael\nísmael\nísmar\nísólfur\nísrael\nissi\nívan\nívar\njack\njafet\njagger\njaki\njakob\njakop\njamil\njan\njanus\njarfi\njarl\njárngrímur\njason\njátgeir\njátmundur\njátvarður\njenni\njens\njeremías\njes\njesper\njóakim\njóann\njochum\njóel\njohan\njóhann\njóhannes\njohn\njói\njómar\njómundur\njón\njónar\njónas\njónatan\njónbjörn\njóndór\njóngeir\njónmundur\njónsteinn\njónþór\njósafat\njósavin\njósef\njoshua\njósep\njósteinn\njósúa\njóvin\njúlí\njulian\njúlían\njúlíus\njúní\njúníus\njúrek\njökull\njörfi\njörgen\njörmundur\njörri\njörundur\njörvar\njörvi\nkai\nkaj\nkakali\nkaktus\nkaldi\nkaleb\nkali\nkalman\nkalmann\nkalmar\nkamal\nkaprasíus\nkarel\nkarim\nkarkur\nkarl\nkarles\nkarli\nkarvel\nkaspar\nkasper\nkastíel\nkatarínus\nkató\nkár\nkári\nkeran\nketilbjörn\nketill\nkilían\nkiljan\nkjalar\nkjallakur\nkjaran\nkjartan\nkjarval\nkjárr\nkjói\nklemens\nklemenz\nklængur\nknútur\nknörr\nkoðrán\nkoggi\nkolbeinn\nkolbjörn\nkolfinnur\nkolgrímur\nkolmar\nkolskeggur\nkolur\nkolviður\nkonráð\nkonstantínus\nkópur\nkórekur\nkormákur\nkornelíus\nkort\nkraki\nkris\nkristall\nkristberg\nkristbergur\nkristbjörn\nkristdór\nkristens\nkrister\nkristfinnur\nkristgeir\nkristian\nkristinn\nkristján\nkristjón\nkristlaugur\nkristleifur\nkristmann\nkristmar\nkristmundur\nkristofer\nkristófer\nkristvaldur\nkristvarður\nkristvin\nkristþór\nkrummi\nkvasir\nkveldúlfur\nlambert\nlár\nlárent\nlárentíus\nlars\nlárus\nlaufar\nlaugi\nlauritz\nleiðólfur\nleif\nleifur\nleiknir\nleo\nleó\nleon\nleonard\nleonhard\nleópold\nlér\nleví\nlíam\nliljar\nlínberg\nlindar\nlindberg\nlíni\nljósálfur\nljótur\nljúfur\nloðmundur\nloftur\nlogi\nloki\nlórens\nlórenz\nlótus\nludvig\nlúðvíg\nlúðvík\nlúkas\nlundi\nlúter\nlúther\nlýður\nlyngar\nlýtingur\nmaggi\nmagngeir\nmagni\nmagnús\nmagnþór\nmakan\nmanfred\nmanfreð\nmáni\nmanúel\nmar\nmár\nmarbjörn\nmarel\nmargeir\nmargrímur\nmari\nmarijón\nmarinó\nmarías\nmarínó\nmarís\nmaríus\nmarjón\nmark\nmarkó\nmarkús\nmarkþór\nmaron\nmarri\nmars\nmarsellíus\nmarteinn\nmarten\nmarthen\nmartin\nmárus\nmarvin\nmarzilíus\nmathías\nmatthías\nmatti\nmattías\nmax\nmaximus\nmekkinó\nmelkíor\nmelkólmur\nmelrakki\nmensalder\nmerkúr\nmethúsalem\nmetúsalem\nmeyvant\nmías\nmichael\nmikael\nmikjáll\nmikkael\nmikkel\nmildinberg\nmímir\nmíó\nmír\nmjöllnir\nmjölnir\nmóði\nmói\nmoli\nmorgan\nmóri\nmórits\nmoritz\nmóses\nmosi\nmuggur\nmúli\nmuni\nmuninn\nmýrkjartan\nmyrkvi\nmörður\nnarfi\nnatan\nnatanael\nnataníel\nnathan\nnáttmörður\nnáttúlfur\nneisti\nnenni\nneptúnus\nnicolas\nníels\nnikanor\nnikolai\nnikolas\nnikulás\nnils\nníls\nnjáll\nnjörður\nnóam\nnóel\nnói\nnóni\nnonni\nnorbert\nnorðmann\nnóri\nnormann\nnóvember\nnúmi\nnývarð\nnökkvi\noddbergur\noddbjörn\noddfreyr\noddgeir\noddi\noddkell\noddleifur\noddmar\noddsteinn\noddur\noddvar\noddþór\nóðinn\nófeigur\noktavíus\noktó\noktóvíus\nolaf\nólaf\nólafur\nolav\nolgeir\nóli\noliver\nóliver\nólíver\nolivert\nómar\nómi\norfeus\normar\normur\norri\norvar\nóskar\nósvald\nósvaldur\nósvífur\notkell\notri\nóttar\nóttarr\notti\nottó\notur\nparmes\npatrek\npatrekur\npatrick\npatrik\npáll\npálmar\npálmi\npedró\nper\npeter\npétur\npjetur\npríor\nrafael\nrafn\nrafnar\nrafnkell\nragnar\nragúel\nrandver\nrannver\nrasmus\nráðgeir\nráðvarður\nrefur\nreginbaldur\nreginn\nreidar\nreifnir\nreimar\nreinar\nreinhart\nreinhold\nremek\nrex\nreykdal\nreynald\nreynar\nreynir\nreyr\nrichard\nríkarður\nrikharð\nríkharð\nrikharður\nríkharður\nríó\nrobert\nróbert\nrólant\nrolf\nróman\nrómeó\nronald\nrósant\nrósar\nrósberg\nrósenberg\nrósi\nrósinberg\nrósinkar\nrósinkrans\nrósmann\nrósmundur\nrúbar\nrúben\nrudolf\nrúdólf\nrúnar\nruni\nrunólfur\nrúrik\nrútur\nröðull\nrögnvald\nrögnvaldur\nrögnvar\nrökkvi\nsafír\nsakarías\nsalmann\nsalmar\nsalómon\nsalvar\nsamson\nsamúel\nsandel\nsandri\nsandur\nsaxi\nsebastian\nsebastían\nseifur\nseimur\nsesar\nsesil\nsigbergur\nsigbert\nsigbjartur\nsigbjörn\nsigdór\nsigfastur\nsigfinnur\nsigfreður\nsigfús\nsiggeir\nsighvatur\nsigjón\nsiglaugur\nsigmann\nsigmar\nsigmundur\nsignar\nsigri\nsigríkur\nsigsteinn\nsigtryggur\nsigtýr\nsigur\nsigurbaldur\nsigurberg\nsigurbergur\nsigurbjarni\nsigurbjartur\nsigurbjörn\nsigurbrandur\nsigurdór\nsigurður\nsigurfinnur\nsigurgeir\nsigurgestur\nsigurgísli\nsigurgrímur\nsigurhans\nsigurhjörtur\nsigurjón\nsigurkarl\nsigurlaugur\nsigurlás\nsigurleifur\nsigurliði\nsigurlinni\nsigurlogi\nsigurmann\nsigurmar\nsigurmon\nsigurmundur\nsigurnýas\nsigurnýjas\nsiguroddur\nsiguróli\nsigurpáll\nsigursteinn\nsigursveinn\nsigurvaldi\nsigurvin\nsigurþór\nsigurörn\nsigvaldi\nsigvarður\nsigþór\nsilli\nsímon\nsindri\nsírnir\nsírus\nsívar\nsjafnar\nskafti\nskapti\nskarphéðinn\nskefill\nskeggi\nskellir\nskíði\nskírnir\nskjöldur\nskorri\nskröggur\nskuggi\nskúli\nskúta\nskær\nskæringur\nsmári\nsmiður\nsmyrill\nsnjóki\nsnjólaugur\nsnjólfur\nsnorri\nsnæbjartur\nsnæbjörn\nsnæhólm\nsnælaugur\nsnær\nsnæringur\nsnævar\nsnævarr\nsnæþór\nsoffanías\nsophanías\nsophus\nsófónías\nsófus\nsókrates\nsólberg\nsólbergur\nsólbjartur\nsólbjörn\nsólimann\nsólmar\nsólmundur\nsólon\nsólver\nsólvin\nspartakus\nspói\nsporði\nstanley\nstapi\nstarkaður\nstarri\nstefan\nstefán\nstefnir\nsteinar\nsteinarr\nsteinberg\nsteinbergur\nsteinbjörn\nsteindór\nsteinfinnur\nsteingrímur\nsteini\nsteinkell\nsteinmann\nsteinmar\nsteinmóður\nsteinn\nsteinólfur\nsteinröður\nsteinvarður\nsteinþór\nstirnir\nstígur\nstormur\nstórólfur\nsturla\nsturlaugur\nsturri\nstyr\nstyrbjörn\nstyrkár\nstyrmir\nstyrr\nsumarliði\nsvafar\nsvali\nsvan\nsvanberg\nsvanbergur\nsvanbjörn\nsvangeir\nsvanhólm\nsvani\nsvanlaugur\nsvanmundur\nsvanur\nsvanþór\nsvavar\nsváfnir\nsveinar\nsveinberg\nsveinbjartur\nsveinbjörn\nsveinjón\nsveinlaugur\nsveinmar\nsveinn\nsveinungi\nsveinþór\nsvend\nsverre\nsverrir\nsvölnir\nsvörfuður\nsýrus\nsæberg\nsæbergur\nsæbjartur\nsæbjörn\nsæi\nsælaugur\nsæmann\nsæmi\nsæmundur\nsær\nsævald\nsævaldur\nsævar\nsævarr\nsævin\nsæþór\nsölmundur\nsölvar\nsölvi\nsören\nsörli\ntandri\ntarfur\nteitur\ntheodór\ntheódór\nthomas\nthor\nthorberg\nthór\ntíbor\ntindar\ntindri\ntindur\ntinni\ntími\ntímon\ntímoteus\ntímóteus\ntístran\ntjaldur\ntjörfi\ntjörvi\ntobías\ntóbías\ntói\ntóki\ntolli\ntómas\ntonni\ntór\ntorfi\ntrausti\ntristan\ntrostan\ntrúmann\ntryggvi\ntumas\ntumi\ntýr\ntyrfingur\nubbi\núddi\nuggi\núlfar\núlfgeir\núlfhéðinn\núlfkell\núlfljótur\núlftýr\núlfur\nulrich\núlrik\nuni\nunnar\nunnbjörn\nunndór\nunnsteinn\nunnþór\núranus\nurðar\nuxi\nvagn\nvakur\nvalberg\nvalbergur\nvalbjörn\nvalbrandur\nvaldemar\nvaldi\nvaldimar\nvaldór\nvalentín\nvalentínus\nvalgarð\nvalgarður\nvalgeir\nváli\nvalíant\nvallaður\nvalmar\nvalmundur\nvalsteinn\nvalter\nwalter\nvaltýr\nvalur\nvalves\nvalþór\nvápni\nvarmar\nvatnar\nvébjörn\nvégeir\nveigar\nveigur\nvékell\nvélaugur\nvémundur\nver\nvermundur\nwerner\nvernharð\nvernharður\nvestar\nvésteinn\nvestmar\nveturliði\nvictor\nviðar\nvíðar\nvíðir\nviðjar\nvífill\nvígberg\nvigfús\nviggó\nvíglundur\nvígmar\nvígmundur\nvignir\nvigri\nvígsteinn\nvigtýr\nvigur\nvígþór\nvikar\nvíkingur\nviktor\nvilberg\nvilbergur\nvilbert\nvilbjörn\nvilbogi\nvilbrandur\nvilgeir\nvilhelm\nwilhelm\nvilhjálmur\nvili\nviljar\nvilji\nwillard\nvilli\nwilliam\nwillum\nwilly\nvilmar\nvilmundur\nvincent\nvindar\nvinjar\nvirgill\nvopni\nvorm\nvöggur\nvölundur\nvörður\nvöttur\nylur\nymir\nýmir\nyngvar\nyngvi\nýrar\nyrkill\nzakaría\nzakarías\nzophanías\nzóphanías\nzophonías\nzóphonías\nþangbrandur\nþengill\nþeyr\nþiðrandi\nþiðrik\nþinur\nþjálfi\nþjóðann\nþjóðar\nþjóðbjörn\nþjóðgeir\nþjóðleifur\nþjóðmar\nþjóðólfur\nþjóðrekur\nþjóðvarður\nþjóstar\nþjóstólfur\nþór\nþórar\nþórarinn\nþorberg\nþorbergur\nþórbergur\nþórbjarni\nþorbjörn\nþórbjörn\nþorbrandur\nþórður\nþorfinnur\nþorgarður\nþorgautur\nþorgeir\nþorgestur\nþorgils\nþorgísl\nþorgnýr\nþórgnýr\nþorgrímur\nþórgrímur\nþórhaddur\nþórhalli\nþórhallur\nþóri\nþórinn\nþórir\nþorkell\nþorlákur\nþorlaugur\nþórlaugur\nþorleifur\nþórleifur\nþorleikur\nþórlindur\nþormar\nþórmar\nþormóður\nþormundur\nþórmundur\nþóroddur\nþórormur\nþórólfur\nþorri\nþorsteinn\nþórsteinn\nþorvaldur\nþorvar\nþorvarður\nþórörn\nþráinn\nþrándur\nþrastar\nþróttur\nþrúðmar\nþrymur\nþröstur\nþyrill\nþyrnir\nægir\næsir\nævar\nævarr\nögmundur\nögri\nölnir\nölver\nölvir\nöndólfur\nönundur\nörlaugur\nörlygur\nörn\nörnólfur\nörvar\nössur\nöxar".split("\n"));
	this.trainingData.set("theological_angels","abaddon\nabathar\nadriel\nahriman\nambriel\namesha\nanael\narariel\narchangel\nariel\nazazel\nazrael\nbarachiel\nbene\ncassiel\ncherub\ncherubim\ncamael\ndaniel\ndardail\ndominions\ndumah\neremiel\ngabriel\ngadreel\ngrigori\nhadraniel\nhahasiah\nhaniel\nharut\nhashmal\nhesediel\nimamiah\nhamalat\nisrafil\njegudiel\njehoel\njequn\njerahmeel\njophiel\nkerubiel\nkiraman\nkushiel\nleliel\nlucifer\nmaalik\nmarut\nmebahiah\nmetatron\nmichael\nangel\nmunkar\nmuaqqibat\nmuriel\nnakir\nnanael\nnetzach\nnithael\nnuriel\npahaliah\npenemue\nphanuel\npowers\nprincipalities\npoyel\npuriel\nqaphsiel\nraguel\nraphael\nraziel\nremiel\nsachiel\nsamael\nsandalphon\nsariel\nselaphiel\nseraph\nseraphim\nseraphiel\nsimiel\nshamsiel\nschemhampharae\ntennin\nthrones\ntzaphqiel\ntemeluchus\nuriel\nuzziel\nvirtues\nvehuel\nwormwood\nzachariel\nzadkiel\nzephon\nzaphkiel\nzophiel".split("\n"));
	this.trainingData.set("japanese_forenames","akifumi\nakihiko\nakihiro\nakihisa\nakihito\nakimasa\nakimitsu\nakinobu\nakinori\nakio\nakisada\nakishige\nakito\nakitoshi\nakitsugu\nakiyoshi\nakiyuki\narata\narihiro\narinaga\narinobu\naritomo\nasao\nasuka\natomu\natsuhiko\natsuhiro\natsuo\natsushi\natsuto\natsuya\nazuma\nbanri\nbunji\nbunta\nchikara\nchikayoshi\nchōei\nchoki\nchūichi\ndai\ndaichi\ndaigo\ndaiki\ndairoku\ndaishin\ndaisuke\ndaizō\neiichi\neiichiro\neiji\neijirō\neikichi\neinosuke\neishun\neisuke\neizō\netsuji\nfujio\nfumiaki\nfumihiko\nfumihiro\nfumio\nfumito\nfumiya\nfusanosuke\nfusazane\nfutoshi\nfuyuki\ngaku\ngakuto\ngen'ichi\ngen'ichirō\ngenjiro\ngenta\ngentarō\ngenzo\ngiichi\ngin\ngoichi\ngoro\nhachirō\nhakaru\nharuaki\nharuchika\nharuhiko\nharuhiro\nharuhisa\nharuki\nharunobu\nharuo\nharutaka\nharuto\nharuyoshi\nhatsuo\nhayanari\nhayato\nheihachirō\nheisuke\nhideaki\nhideharu\nhidehiko\nhidehito\nhideji\nhidekazu\nhideki\nhidemasa\nhidemi\nhidemitsu\nhidenobu\nhidenori\nhideo\nhideshi\nhidetaka\nhideto\nhidetoshi\nhidetsugu\nhideyo\nhideyoshi\nhideyuki\nhiro\nhiroaki\nhirofumi\nhirohide\nhirohisa\nhiroji\nhirokatsu\nhirokazu\nhiroki\nhirokuni\nhiromasa\nhiromichi\nhiromitsu\nhiromori\nhironari\nhironobu\nhironori\nhiroshi\nhiroshige\nhirotaka\nhirotami\nhiroto\nhirotoki\nhirotomo\nhirotoshi\nhirotsugu\nhiroya\nhiroyasu\nhiroyoshi\nhiroyuki\nhisahito\nhisamitsu\nhisamoto\nhisanobu\nhisanori\nhisao\nhisashi\nhisataka\nhisateru\nhisato\nhisaya\nhisayasu\nhisayoshi\nhisayuki\nhitoshi\nhokuto\nhozumi\nichiei\nichirō\nichizō\niehisa\niemasa\niemon\niesada\nikko\nikuo\nikurō\nippei\nisami\nisamu\nisao\nissei\nitaru\niwao\njiichirō\njin\njin'ichi\njinpachi\njiro\njōichirō\njōji\njōkichi\njōtarō\njūbei\njūkichi\njunichi\njun'ichirō\njunji\njunki\njunpei\njun'ya\njunzō\njūshirō\njūtarō\njūzō\nkagemori\nkagetaka\nkaiji\nkaito\nkakichi\nkaku\nkakuji\nkanehira\nkanehiro\nkanematsu\nkanemoto\nkanesuke\nkanetake\nkaneto\nkanetsugu\nkaneyoshi\nkan'ichi\nkankuro\nkansuke\nkatsuaki\nkatsuei\nkatsuhiko\nkatsuhiro\nkatsuhisa\nkatsuhito\nkatsuji\nkatsuki\nkatsukiyo\nkatsumasa\nkatsumoto\nkatsunaga\nkatsunari\nkatsunori\nkatsunosuke\nkatsuo\nkatsushi\nkatsusuke\nkatsutarō\nkatsuteru\nkatsutomo\nkatsutoshi\nkatsuya\nkatsuyoshi\nkatsuyuki\nkazuaki\nkazuharu\nkazuhiko\nkazuhiro\nkazuhisa\nkazuhito\nkazuki\nkazuma\nkazumasa\nkazunari\nkazunori\nkazuo\nkazuoki\nkazurō\nkazushi\nkazushige\nkazutaka\nkazuto\nkazutoki\nkazutoshi\nkazuya\nkazuyoshi\nkazuyuki\nkeigo\nkeiichi\nkeiichirō\nkeiji\nkeijirō\nkeijū\nkeiki\nkeinosuke\nkeishi\nkeisuke\nkeita\nkeizō\nken\nken'ichi\nkengo\nken'ichirō\nkenji\nkenjirō\nkenki\nkenkichi\nkensaku\nkenshin\nkensuke\nkenta\nkentaro\nkento\nken'yū\nkenzo\nkesao\nkihachi\nkihachirō\nkihei\nkiichirō\nkikuo\nkimio\nkimiya\nkin'ichi\nkin'ichirō\nkinji\nkinjirō\nkintaro\nkin'ya\nkisaburō\nkishō\nkiyoaki\nkiyofumi\nkiyohide\nkiyohiko\nkiyohiro\nkiyoji\nkiyokazu\nkiyomoto\nkiyonari\nkiyonori\nkiyoshi\nkiyosue\nkiyotaka\nkiyotake\nkiyoyuki\nkogorō\nkōhei\nkōichi\nkōichirō\nkoji\nkojiro\nkōki\nkōkichi\nkōnosuke\nkōsaku\nkōsei\nkōshirō\nkoson\nkōsuke\nkotaro\nkouta\nkoya\nkōzō\nkumatarō\nkuniaki\nkunihiko\nkunihiro\nkunihisa\nkunimitsu\nkunio\nkunitake\nkuniyuki\nkuranosuke\nkusuo\nkyōhei\nkyōichi\nkyōji\nkyōsuke\nkyukichi\nmahiro\nmakio\nmamoru\nmanabu\nmanjirō\nmantarō\nmareo\nmasaaki\nmasabumi\nmasachika\nmasafumi\nmasaharu\nmasahide\nmasahiko\nmasahiro\nmasahisa\nmasahito\nmasaichi\nmasaie\nmasaji\nmasakage\nmasakatsu\nmasakazu\nmasaki\nmasakuni\nmasamichi\nmasamitsu\nmasamori\nmasamune\nmasamura\nmasanao\nmasanobu\nmasanori\nmasao\nmasaomi\nmasaru\nmasashi\nmasashige\nmasataka\nmasatake\nmasatane\nmasateru\nmasato\nmasatomo\nmasatoshi\nmasatsugu\nmasaya\nmasayoshi\nmasayuki\nmasazumi\nmasuo\nmasuzō\nmatabei\nmatsuchi\nmatsuki\nmatsuo\nmatsushige\nmichiaki\nmichiharu\nmichihiko\nmichihiro\nmichihisa\nmichinori\nmichio\nmichirō\nmichitaka\nmichitarō\nmichiya\nmichiyoshi\nmikio\nmikuni\nmineichi\nmineo\nmitsuaki\nmitsugi\nmitsugu\nmitsuharu\nmitsuhide\nmitsuhiko\nmitsuhira\nmitsuhiro\nmitsuhisa\nmitsumasa\nmitsumori\nmitsunobu\nmitsunori\nmitsuo\nmitsuomi\nmitsusuke\nmitsutaka\nmitsuteru\nmitsutoshi\nmitsuyasu\nmitsuyo\nmitsuyoshi\nmitsuyuki\nmochiaki\nmokichi\nmorihiko\nmorihiro\nmorikazu\nmorimasa\nmorio\nmoritaka\nmosuke\nmotoaki\nmotoharu\nmotohiko\nmotohiro\nmotoichi\nmotojirō\nmotoki\nmotomu\nmotonobu\nmotoshi\nmotoshige\nmotosuke\nmototada\nmototsugu\nmotoyasu\nmotoyuki\nmotozane\nmukuro\nmunehiro\nmunemori\nmunenobu\nmunenori\nmuneo\nmuneshige\nmunetaka\nmunetoki\nmunetoshi\nmurashige\nmutsuo\nnagaharu\nnagahide\nnagamasa\nnagamichi\nnaganao\nnaganori\nnagatoki\nnagatomo\nnamio\nnankichi\nnaofumi\nnaohiko\nnaohiro\nnaohisa\nnaohito\nnaoji\nnaokatsu\nnaoki\nnaomasa\nnaomichi\nnaomori\nnaoshi\nnaotaka\nnaotake\nnaoto\nnaoya\nnaoyuki\nnaozumi\nnariaki\nnariakira\nnaritaka\nnariyasu\nnariyuki\nnaruhisa\nnaruhito\nnoboru\nnobuaki\nnobuatsu\nnobuharu\nnobuhiko\nnobuhiro\nnobuhisa\nnobuhito\nnobukatsu\nnobukazu\nnobumasa\nnobumitsu\nnobumoto\nnobunao\nnobunari\nnobuo\nnobusada\nnobusuke\nnobutaka\nnobuteru\nnobutoki\nnobutomo\nnobutoshi\nnobutsuna\nnobuyasu\nnobuyoshi\nnobuyuki\nnoriaki\nnorifumi\nnorifusa\nnorihiko\nnorihiro\nnorihito\nnorikazu\nnorimasa\nnorio\nnoriyasu\nnoriyoshi\nnoriyuki\nnozomu\nokimoto\nokitsugu\nosamu\notohiko\nraizo\nreiichi\nreiji\nreizō\nrentarō\nriichi\nrikichi\nrikiya\nrinshō\nrokurō\nryōhei\nryōichi\nryōji\nryōma\nryōsei\nryōsuke\nryōta\nryōtarō\nryōzō\nryu\nryūhei\nryūichi\nryūji\nryūki\nryūnosuke\nryūsaku\nryūsei\nryūsuke\nryūta\nryūtarō\nryūya\nryūzō\nsaburō\nsachio\nsadaaki\nsadaharu\nsadahiko\nsadao\nsadatoshi\nsadayoshi\nsadazane\nsaiichi\nsakichi\nsatonari\nsatoru\nsatoshi\nsatsuo\nseigen\nseigo\nseihō\nseiichi\nseiichirō\nseiji\nseijin\nseijirō\nseikichi\nseishi\nseishirō\nseiya\nseizō\nsenkichi\nshichirō\nshigeaki\nshigefumi\nshigeharu\nshigehiro\nshigehisa\nshigekazu\nshigeki\nshigemasa\nshigematsu\nshigemi\nshigemitsu\nshigenaga\nshigenobu\nshigenori\nshigeo\nshigeru\nshigetada\nshigetaka\nshigeto\nshigetoshi\nshigeyasu\nshigeyoshi\nshigeyuki\nshikō\nshin\nshingo\nshin'ichi\nshin'ichirō\nshinji\nshinjirō\nshinjō\nshinkichi\nshinpei\nshinsaku\nshinsuke\nshinta\nshintarō\nshinya\nshinzō\nshizuo\nshō\nshōgo\nshōhei\nshōichi\nshōji\nshōjirō\nshōma\nshōsuke\nshōta\nshōtarō\nshōya\nshōzō\nshūgo\nshūhei\nshūichi\nshūji\nshuko\nshun\nshun'ichi\nshun'ichirō\nshunji\nshunkichi\nshunpei\nshunsaku\nshunsuke\nshuntarō\nshun'ya\nshunzō\nshūsaku\nshūsuke\nshūta\nshūzō\nsōgen\nsōichi\nsōichirō\nsōji\nsonosuke\nsōsuke\nsōtarō\nsuehiro\nsuguru\nsukehiro\nsukemasa\nsuketoshi\nsuketsugu\nsumio\nsumiyoshi\nsunao\nsusumu\ntadaaki\ntadachika\ntadafumi\ntadaharu\ntadahiko\ntadahiro\ntadahito\ntadakatsu\ntadamasa\ntadami\ntadamori\ntadanaga\ntadanao\ntadanari\ntadanobu\ntadanori\ntadao\ntadaoki\ntadashi\ntadataka\ntadateru\ntadatomo\ntadatoshi\ntadatsugu\ntadatsune\ntadayo\ntadayoshi\ntadayuki\ntaichi\ntaichirō\ntaiga\ntaiichi\ntaiji\ntaiki\ntaishi\ntaisuke\ntaka\ntakaaki\ntakafumi\ntakahide\ntakahiko\ntakahiro\ntakahisa\ntakahito\ntakaki\ntakamasa\ntakamitsu\ntakanobu\ntakanori\ntakao\ntakashi\ntakatomi\ntakatoshi\ntakatsugu\ntakauji\ntakaya\ntakayasu\ntakayoshi\ntakayuki\ntakeaki\ntakefumi\ntakeharu\ntakehiko\ntakehiro\ntakehisa\ntakehito\ntakeichi\ntakejirō\ntakenaga\ntakenori\ntakeo\ntakeru\ntakeshi\ntaketo\ntaketora\ntaketoshi\ntakeya\ntakeyoshi\ntakezō\ntaku\ntakuji\ntakuma\ntakumi\ntakuo\ntakurō\ntakuto\ntakuya\ntakuzō\ntamio\ntamotsu\ntarō\ntateo\ntatsuaki\ntatsuhiko\ntatsuhiro\ntatsuhito\ntatsuji\ntatsuma\ntatsumi\ntatsunori\ntatsuo\ntatsurō\ntatsushi\ntatsuya\ntatsuyoshi\ntatsuyuki\nteiji\nteijirō\nteiko\nteizō\nteppei\nteruaki\nteruhiko\nteruhisa\nterumasa\nterunobu\nteruo\nteruyoshi\nteruyuki\ntetsu\ntetsuharu\ntetsuji\ntetsumasa\ntetsuo\ntetsurō\ntetsushi\ntetsutarō\ntetsuya\ntetsuzō\ntogo\ntokihiko\ntokio\ntokuji\ntokujirō\ntokuo\ntokurō\ntokutarō\ntomio\ntomoaki\ntomochika\ntomoharu\ntomohide\ntomohiko\ntomohiro\ntomohisa\ntomohito\ntomoji\ntomokazu\ntomoki\ntomomichi\ntomonobu\ntomonori\ntomotaka\ntomoya\ntomoyasu\ntomoyoshi\ntomoyuki\ntorahiko\ntoru\ntoshi\ntoshiaki\ntoshiharu\ntoshihide\ntoshihiko\ntoshihiro\ntoshihisa\ntoshihito\ntoshikatsu\ntoshikazu\ntoshiki\ntoshimasa\ntoshimi\ntoshimichi\ntoshimitsu\ntoshinaga\ntoshinari\ntoshinobu\ntoshinori\ntoshio\ntoshirō\ntoshitada\ntoshitaka\ntoshitsugu\ntoshiya\ntoshiyasu\ntoshiyuki\ntoshizō\ntoyoaki\ntoyohiko\ntoyokazu\ntoyomatsu\ntoyoshige\ntoyozō\ntsugio\ntsuneharu\ntsunehisa\ntsunejirō\ntsunemi\ntsunenori\ntsuneo\ntsuneyoshi\ntsuneyuki\ntsutomu\ntsuyoshi\numanosuke\numeji\nwataru\nyahiko\nyahiro\nyanosuke\nyasuaki\nyasufumi\nyasuharu\nyasuhide\nyasuhiko\nyasuhiro\nyasuhisa\nyasuji\nyasujirō\nyasukazu\nyasuki\nyasumasa\nyasumi\nyasumichi\nyasunari\nyasunobu\nyasunori\nyasuo\nyasurō\nyasushi\nyasutaka\nyasutomo\nyasutoshi\nyasuyoshi\nyasuyuki\nyatarō\nyō\nyōhei\nyōichi\nyōichirō\nyōji\nyōjirō\nyorimitsu\nyorinobu\nyorishige\nyoritaka\nyoritsugu\nyoritsune\nyoriyuki\nyoshi\nyoshifumi\nyoshihide\nyoshihiko\nyoshihiro\nyoshihisa\nyoshihito\nyoshiie\nyoshikane\nyoshikatsu\nyoshikazu\nyoshiki\nyoshikiyo\nyoshikuni\nyoshimasa\nyoshimatsu\nyoshimichi\nyoshinaga\nyoshinao\nyoshinari\nyoshinobu\nyoshinori\nyoshio\nyoshirō\nyoshisada\nyoshishige\nyoshisuke\nyoshitaka\nyoshitake\nyoshitarō\nyoshiteru\nyoshito\nyoshitomo\nyoshitsugu\nyoshiya\nyoshiyasu\nyoshiyuki\nyōsuke\nyōta\nyōzō\nyūdai\nyugi\nyugo\nyūhei\nyūichi\nyūichirō\nyūji\nyūjirō\nyūkichi\nyukiharu\nyukihiko\nyukihiro\nyukimasa\nyukimura\nyukinobu\nyukinori\nyukio\nyukitaka\nyukito\nyukiya\nyūsaku\nyūsei\nyūshi\nyūsuke\nyūta\nyutaka\nyūtarō\nyūto\nyūya\nyūzō\nyuzuru\nzenjiro\nzenkichi\nzentarō\nzenzō\nai\naiko\naimi\nairi\nakane\nakari\nakemi\naki\nakie\nakiko\nakina\namane\nami\nanzu\naoi\nasako\nasami\nasuka\nasumi\nasuna\natsuko\natsumi\naya\nayaka\nayako\nayame\nayana\nayane\nayano\nayu\nayuka\nayumi\nazumi\nazusa\nchie\nchieko\nchiemi\nchiharu\nchiho\nchika\nchinami\nchinatsu\nchisato\nchiyako\nchiyo\nchiyoko\nchizuko\nchizuru\neiko\neimi\nemi\nemiko\nemiri\neri\nerika\neriko\netsuko\nfujiko\nfukumi\nfumie\nfumika\nfumiko\nfusako\nfuyuko\nhana\nhanae\nhanako\nharuhi\nharuko\nharuna\nharuyo\nhatsue\nhideko\nhidemi\nhimeko\nhiroe\nhiroko\nhiroyo\nhisae\nhisako\nhisaya\nhisayo\nhonami\nichiko\nikue\nikumi\nitsuko\nitsumi\njitsuko\njunko\nkaede\nkaguya\nkaho\nkahoru\nkana\nkanae\nkanako\nkaori\nkarin\nkasumi\nkatsuko\nkawai\nkayoko\nkazue\nkazuko\nkazusa\nkazuyo\nkeiki\nkeiko\nkiko\nkikue\nkikuko\nkimiko\nkira\nkiyoko\nkoharu\nkonomi\nkotomi\nkotori\nkozue\nkumi\nkumiko\nkuniko\nkurenai\nkyoko\nmaaya\nmachi\nmachiko\nmadoka\nmaho\nmaiko\nmaki\nmakiko\nmami\nmamiko\nmana\nmanami\nmao\nmari\nmarié\nmariko\nmasae\nmasako\nmatsuko\nmayako\nmayu\nmayuko\nmayumi\nmayura\nmegu\nmegumi\nmei\nmeiko\nmeisa\nmichiko\nmie\nmieko\nmiho\nmiiko\nmika\nmikako\nmiki\nmikiko\nmiku\nmikuru\nmimori\nmina\nminae\nminako\nmineko\nminori\nmisaki\nmisako\nmisato\nmitsuko\nmitsuyo\nmiu\nmiwa\nmiwako\nmiyabi\nmiyako\nmiyoko\nmiyu\nmiyuki\nmiyumi\nmiyū\nmizuho\nmizuki\nmizuko\nmoe\nmomo\nmomoe\nmomoka\nmomoko\nmotoko\nmutsuko\nmutsumi\nnagako\nnami\nnana\nnanako\nnanami\nnanase\nnao\nnaoko\nnarumi\nnatsue\nnatsuko\nnatsume\nnatsumi\nnoa\nnobuko\nnodoka\nnoriko\nnoriyo\nnozomi\nomi\notoha\notome\nran\nreika\nreiko\nrena\nrie\nrieko\nriho\nrika\nrina\nritsuko\nrumi\nrumiko\nruna\nruri\nruriko\nryōka\nryoko\nsachie\nsachiko\nsadako\nsaeko\nsaki\nsakie\nsakiko\nsakura\nsakurako\nsanae\nsaori\nsatoko\nsatomi\nsawako\nsaya\nsayaka\nsayako\nsayoko\nsayumi\nsayuri\nseiko\nsetsuko\nshigeko\nshiho\nshiina\nshimako\nshinako\nshino\nshiori\nshizue\nshizuko\nshoko\nshuko\nsumika\nsumiko\nsumire\nsuzue\nsuzuko\ntaeko\ntakako\ntakeko\ntamao\ntamiko\ntatsuko\nteiko\nteruko\nterumi\ntokiko\ntokuko\ntomiko\ntomoka\ntomoko\ntomoyo\ntoshiko\ntoyoko\ntsuneko\numeko\nwakako\nyaeko\nyasue\nyasuko\nyayoi\nyō\nyoko\nyoshiko\nyoshino\nyui\nyuka\nyukari\nyukie\nyukiko\nyukina\nyūko\nyumeko\nyumi\nyumika\nyumiko\nyuri\nyurie\nyurika\nyuriko\nyurina\nakimi\nakira\nanri\nayumu\nchiaki\nchihiro\nchitose\nhajime\nharu\nharue\nharuka\nharumi\nhatsu\nhayate\nhazuki\nhikari\nhikaru\nhinata\nhiromi\nhiromu\nhitomi\nhotaru\niori\nitsuki\nizumi\njun\nkagami\nkaname\nkaoru\nkatsumi\nkayo\nkazu\nkazumi\nkei\nkunie\nkurumi\nkyo\nmako\nmakoto\nmasami\nmasumi\nmichiru\nmichiyo\nmidori\nmikoto\nminami\nmirai\nmisao\nmitsuki\nmitsuru\nnagisa\nnaomi\nnatsuki\nrei\nren\nriku\nrin\nrisa\nryō\nsakae\nsatsuki\nsetsuna\nshigeri\nshinobu\nshion\nshizuka\nsora\nsubaru\ntamaki\nteru\ntomo\ntomoe\ntomomi\ntsubasa\ntsukasa\nyoshika\nyoshimi\nyū\nyuki".split("\n"));
	this.trainingData.set("french_forenames","adrien\nalain\nalbert\nalexandre\nalexis\nandré\nantoine\narnaud\narthur\naurélien\nbaptiste\nbenjamin\nbenoît\nbernard\nbertrand\nbruno\ncédric\ncharles\nchristian\nchristophe\nclaude\nclément\ncyril\ndamien\ndaniel\ndavid\ndenis\ndidier\ndominique\ndylan\nemmanuel\néric\nétienne\nenzo\nfabien\nfabrice\nflorent\nflorian\nfrancis\nfranck\nfrançois\nfrédéric\ngabriel\ngaétan\ngeorges\ngérard\ngilbert\ngilles\ngrégory\nguillaume\nguy\nhenri\nhervé\nhugo\njacques\njean\njeanclaude\njeanfrançois\njeanlouis\njeanluc\njeanmarc\njeanmarie\njeanmichel\njeanpaul\njeanpierre\njérôme\njoël\njonathan\njosé\njoseph\njulien\nkevin\nlaurent\nlionel\nloïc\nlouis\nluc\nlucas\nlucien\nludovic\nmarc\nmarcel\nmathieu\nmatthieu\nmaurice\nmaxime\nmichaël\nmichel\nmickaël\nmohamed\nnicolas\nolivier\npascal\npatrice\npatrick\npaul\nphilippe\npierre\nquentin\nraphaël\nraymond\nrégis\nrémi\nrémy\nrené\nrichard\nrobert\nroger\nroland\nromain\nsamuel\nsébastien\nserge\nsimon\nstéphane\nsylvain\nthéo\nthierry\nthomas\nvalentin\nvictor\nvincent\nwilliam\nyann\nyannick\nyves\nxavier\nagnès\nalexandra\nalice\naline\namandine\namélie\nandrée\nangélique\nanne\nanne-marie\nannick\nannie\narlette\naudrey\naurélie\naurore\nbéatrice\nbernadette\nbrigitte\ncamille\ncarole\ncaroline\ncatherine\ncécile\ncéline\nchantal\nchloé\nchristelle\nchristiane\nchristine\nclaire\nclara\nclaudine\nclémence\ncolette\ncoralie\ncorinne\ndanièle\ndanielle\ndelphine\ndenise\ndominique\néliane\nélisabeth\nélise\nélodie\némilie\nemma\nemmanuelle\nestelle\névelyne\nfabienne\nfanny\nflorence\nfrancine\nfrançoise\ngaëlle\ngeneviève\ngeorgette\ngermaine\nghislaine\nginette\ngisèle\nhélène\nhenriette\nhuguette\ninès\nirène\nisabelle\njacqueline\njanine\njeanne\njeannine\njennifer\njessica\njocelyne\njoëlle\njosette\njulie\njuliette\njustine\nkarine\nlaetitia\nlaura\nlaure\nlaurence\nléa\nliliane\nlouise\nlucie\nlucienne\nlydie\nmadeleine\nmagali\nmanon\nmarcelle\nmarguerite\nmaria\nmarie\nmariechristine\nmarieclaude\nmariethérèse\nmarine\nmarion\nmartine\nmathilde\nmélanie\nmélissa\nmichèle\nmicheline\nmichelle\nmireille\nmonique\nmorgane\nmuriel\nmyriam\nnadia\nnadine\nnathalie\nnicole\nnoémie\nocéane\nodette\nodile\npascale\npatricia\npaulette\npauline\npierrette\nraymonde\nrégine\nrenée\nsabine\nsabrina\nsandra\nsandrine\nsarah\nséverine\nsimone\nsolange\nsonia\nsophie\nstéphanie\nsuzanne\nsylvie\nthérèse\nvalérie\nvanessa\nvéronique\nvirginie\nyvette\nyvonne".split("\n"));
	this.trainingData.set("german_towns","aach\naachen\naalen\nabenberg\nabensberg\nachern\nachim\nadelsheim\nadenau\nadorf\nahaus\nahlen\nahrensburg\naichach\naichtal\naken\nalbstadt\nalfeld\nallendorf\nallstedt\nalpirsbach\nalsdorf\nalsfeld\nalsleben\naltdorf\naltena\naltenberg\naltenburg\naltenkirchen\naltensteig\naltentreptow\naltlandsberg\naltötting\nalzenau\nalzey\namberg\namöneburg\namorbach\nandernach\nangermünde\nanklam\nannaberg\nannaburg\nannweiler\nansbach\napolda\narendsee\narneburg\narnis\narnsberg\narnstadt\narnstein\narnstein\nartern\narzberg\naschaffenburg\naschersleben\nasperg\naßlar\nattendorn\naub\naue\nauerbach\nauerbach\naugsburg\naugustusburg\naulendorf\nauma\naurich\nbabenhausen\nbacharach\nbacknang\nbaden\nbaesweiler\nbaiersdorf\nbalingen\nballenstedt\nbalve\nbamberg\nbarby\nbargteheide\nbarmstedt\nbärnau\nbarntrup\nbarsinghausen\nbarth\nbaruth\nbassum\nbattenberg\nbaumholder\nbaunach\nbaunatal\nbautzen\nbayreuth\nbebra\nbeckum\nbedburg\nbeelitz\nbeerfelden\nbeeskow\nbeilngries\nbeilstein\nbelgern\nbendorf\nbensheim\nberching\nberga\nbergen\nbergen\nbergheim\nbergisch\nbergkamen\nbergneustadt\nberka\nberlin\nbernau\nbernburg\nbernkastel\nbernsdorf\nbernstadt\nbersenbrück\nbesigheim\nbetzdorf\nbetzenstein\nbeverungen\nbexbach\nbiberach\nbiedenkopf\nbielefeld\nbiesenthal\nbietigheim\nbillerbeck\nbingen\nbirkenfeld\nbischofsheim\nbischofswerda\nbismark\nbitburg\nbitterfeld\nblankenburg\nblankenhain\nblaubeuren\nblaustein\nbleckede\nbleicherode\nblieskastel\nblomberg\nblumberg\nbobingen\nböblingen\nbocholt\nbochum\nbockenem\nbodenwerder\nbogen\nböhlen\nboizenburg\nbonn\nbonndorf\nbönnigheim\nbopfingen\nboppard\nborgentreich\nborgholzhausen\nborken\nborken\nborkum\nborna\nbornheim\nbottrop\nboxberg\nbrackenheim\nbrake\nbrakel\nbramsche\nbrandenburg\nbrand\nbrandis\nbraubach\nbraunfels\nbraunlage\nbräunlingen\nbraunsbedra\nbraunschweig\nbreckerfeld\nbredstedt\nbreisach\nbremen\nbremerhaven\nbremervörde\nbretten\nbreuberg\nbrilon\nbrotterode\nbruchköbel\nbruchsal\nbrück\nbrüel\nbrühl\nbrunsbüttel\nbrüssow\nbuchen\nbuchholz\nbuchloe\nbückeburg\nbuckow\nbüdelsdorf\nbüdingen\nbühl\nbünde\nbüren\nburg\nburgau\nburgbernheim\nburgdorf\nbürgel\nburghausen\nburgkunstadt\nburglengenfeld\nburgstädt\nburg\nburgwedel\nburladingen\nburscheid\nbürstadt\nbuttelstedt\nbuttstädt\nbutzbach\nbützow\nbuxtehude\ncalau\ncalbe\ncalw\ncastrop\ncelle\ncham\nchemnitz\nclausthal\nclingen\ncloppenburg\ncoburg\ncochem\ncoesfeld\ncolditz\ncologne\ncoswig\ncoswig\ncottbus\ncrailsheim\ncreglingen\ncreußen\ncreuzburg\ncrimmitschau\ncrivitz\ncuxhaven\ndachau\ndahlen\ndahme\ndahn\ndamme\ndannenberg\ndargun\ndarmstadt\ndassel\ndassow\ndatteln\ndaun\ndeggendorf\ndeidesheim\ndelbrück\ndelitzsch\ndelmenhorst\ndemmin\ndessau\ndetmold\ndettelbach\ndieburg\ndiemelstadt\ndiepholz\ndierdorf\ndietenheim\ndietfurt\ndietzenbach\ndiez\ndillenburg\ndillingen\ndillingen\ndingelstädt\ndingolfing\ndinkelsbühl\ndinklage\ndinslaken\ndippoldiswalde\ndissen\nditzingen\ndöbeln\ndoberlug\ndöbern\ndohna\ndömitz\ndommitzsch\ndonaueschingen\ndonauwörth\ndonzdorf\ndorfen\ndormagen\ndornburg\ndornhan\ndornstetten\ndorsten\ndortmund\ndransfeld\ndrebkau\ndreieich\ndrensteinfurt\ndresden\ndrolshagen\nduderstadt\nduisburg\ndülmen\ndüren\ndüsseldorf\nebeleben\neberbach\nebermannstadt\nebern\nebersbach\nebersbach\nebersberg\neberswalde\neckartsberga\neckernförde\nedenkoben\negeln\neggenfelden\neggesin\nehingen\nehrenfriedersdorf\neibelstadt\neibenstock\neichstätt\neilenburg\neinbeck\neisenach\neisenberg\neisenberg\neisenhüttenstadt\neisfeld\neisleben\neislingen\nellingen\nellrich\nellwangen\nelmshorn\nelsdorf\nelsfleth\nelsterberg\nelsterwerda\nelstra\nelterlein\neltmann\neltville\nelzach\nelze\nemden\nemmelshausen\nemmendingen\nemmerich\nemsdetten\nendingen\nengen\nenger\nennepetal\nennigerloh\neppelheim\neppingen\neppstein\nerbach\nerbach\nerbendorf\nerding\nerftstadt\nerfurt\nerkelenz\nerkner\nerkrath\nerlangen\nerlenbach\nerlensee\nerwitte\neschborn\neschenbach\neschershausen\neschwege\neschweiler\nesens\nespelkamp\nessen\nesslingen\nettenheim\nettlingen\neuskirchen\neutin\nfalkenberg\nfalkensee\nfalkenstein\nfalkenstein\nfehmarn\nfellbach\nfelsberg\nfeuchtwangen\nfilderstadt\nfinsterwalde\nfladungen\nflensburg\nflöha\nflörsheim\nflorstadt\nforchheim\nforchtenberg\nforst\nfrankenau\nfrankenberg\nfrankenberg\nfrankenthal\nfrankfurt\nfrankfurt\nfranzburg\nfrauenstein\nfrechen\nfreiberg\nfreiberg\nfreiburg\nfreilassing\nfreinsheim\nfreising\nfreital\nfreren\nfreudenberg\nfreudenberg\nfreudenstadt\nfreyburg\nfreystadt\nfreyung\nfridingen\nfriedberg\nfriedberg\nfriedland\nfriedland\nfriedrichroda\nfriedrichsdorf\nfriedrichshafen\nfriedrichstadt\nfriedrichsthal\nfriesack\nfriesoythe\nfritzlar\nfrohburg\nfröndenberg\nfulda\nfürstenau\nfürstenberg\nfürstenfeldbruck\nfürstenwalde\nfürth\nfurth\nfurtwangen\nfüssen\ngadebusch\ngaggenau\ngaildorf\ngammertingen\ngarbsen\ngarching\ngardelegen\ngarding\ngartz\ngarz\ngau\ngebesee\ngedern\ngeesthacht\ngeestland\ngefell\ngefrees\ngehrden\ngehren\ngeilenkirchen\ngeisa\ngeiselhöring\ngeisenfeld\ngeisenheim\ngeisingen\ngeislingen\ngeislingen\ngeithain\ngeldern\ngelnhausen\ngelsenkirchen\ngemünden\ngemünden\ngengenbach\ngenthin\ngeorgsmarienhütte\ngera\ngerabronn\ngerbstedt\ngeretsried\ngeringswalde\ngerlingen\ngermering\ngermersheim\ngernsbach\ngernsheim\ngerolstein\ngerolzhofen\ngersfeld\ngersthofen\ngescher\ngeseke\ngevelsberg\ngeyer\ngiengen\ngießen\ngifhorn\nginsheim\ngladbeck\ngladenbach\nglashütte\nglauchau\nglinde\nglücksburg\nglückstadt\ngnoien\ngoch\ngoldberg\ngoldkronach\ngolßen\ngommern\ngöppingen\ngörlitz\ngoslar\ngößnitz\ngotha\ngöttingen\ngrabow\ngrafenau\ngräfenberg\ngräfenhainichen\ngräfenthal\ngrafenwöhr\ngrafing\ngransee\ngrebenau\ngrebenstein\ngreding\ngreifswald\ngreiz\ngreußen\ngreven\ngrevenbroich\ngrevesmühlen\ngriesheim\ngrimma\ngrimmen\ngröditz\ngroitzsch\ngronau\ngronau\ngröningen\ngroßalmerode\ngroß\ngroßbottwar\ngroßbreitenbach\ngroßenehrich\ngroßenhain\ngroß\ngroßräschen\ngroßröhrsdorf\ngroßschirma\ngroß\ngrünberg\ngrünhain\ngrünsfeld\ngrünstadt\nguben\ngudensberg\ngüglingen\ngummersbach\ngundelfingen\ngundelsheim\ngünzburg\ngunzenhausen\ngüsten\ngüstrow\ngütersloh\ngützkow\nhaan\nhachenburg\nhadamar\nhagen\nhagenbach\nhagenow\nhaiger\nhaigerloch\nhainichen\nhaiterbach\nhalberstadt\nhaldensleben\nhalle\nhalle\nhallenberg\nhallstadt\nhaltern\nhalver\nhamburg\nhameln\nhamm\nhammelburg\nhamminkeln\nhanau\nhanover\nharburg\nhardegsen\nharen\nharsewinkel\nhartenstein\nhartha\nharzgerode\nhaselünne\nhaslach\nhaßfurt\nhattersheim\nhattingen\nhatzfeld\nhausach\nhauzenberg\nhavelberg\nhavelsee\nhayingen\nhechingen\nhecklingen\nheide\nheideck\nheidelberg\nheidenau\nheidenheim\nheilbad\nheilbronn\nheiligenhafen\nheiligenhaus\nheilsbronn\nheimbach\nheimsheim\nheinsberg\nheitersheim\nheldrungen\nhelmbrechts\nhelmstedt\nhemau\nhemer\nhemmingen\nhemmoor\nhemsbach\nhennef\nhennigsdorf\nheppenheim\nherbolzheim\nherborn\nherbrechtingen\nherbstein\nherdecke\nherdorf\nherford\nheringen\nheringen\nhermeskeil\nhermsdorf\nherne\nherrenberg\nherrieden\nherrnhut\nhersbruck\nherten\nherzberg\nherzberg\nherzogenaurach\nherzogenrath\nhessisch\nhessisch\nhettingen\nhettstedt\nheubach\nheusenstamm\nhilchenbach\nhildburghausen\nhilden\nhildesheim\nhillesheim\nhilpoltstein\nhirschau\nhirschberg\nhirschhorn\nhitzacker\nhochheim\nhöchstadt\nhöchstädt\nhockenheim\nhof\nhofgeismar\nhofheim\nhofheim\nhohenberg\nhohenleuben\nhohenmölsen\nhohen\nhohenstein\nhohnstein\nhöhr\nhollfeld\nholzgerlingen\nholzminden\nhomberg\nhomberg\nhomburg\nhorb\nhornbach\nhorn\nhornberg\nhörstel\nhorstmar\nhöxter\nhoya\nhoyerswerda\nhückelhoven\nhückeswagen\nhüfingen\nhünfeld\nhungen\nhürth\nhusum\nibbenbüren\nichenhausen\nidar\nidstein\nillertissen\nilmenau\nilsenburg\nilshofen\nimmenhausen\nimmenstadt\ningelfingen\ningelheim\ningolstadt\niphofen\niserlohn\nisny\nisselburg\nitzehoe\njarmen\njena\njerichow\njessen\njever\njoachimsthal\njohanngeorgenstadt\njöhstadt\njülich\njüterbog\nkaarst\nkahla\nkaisersesch\nkaiserslautern\nkalbe\nkalkar\nkaltenkirchen\nkaltennordheim\nkamen\nkamenz\nkamp\nkandel\nkandern\nkappeln\nkarben\nkarlsruhe\nkarlstadt\nkassel\nkastellaun\nkatzenelnbogen\nkaub\nkaufbeuren\nkehl\nkelbra\nkelheim\nkelkheim\nkellinghusen\nkelsterbach\nkemberg\nkemnath\nkempen\nkempten\nkenzingen\nkerpen\nketzin\nkevelaer\nkiel\nkierspe\nkindelbrück\nkirchberg\nkirchberg\nkirchberg\nkirchen\nkirchenlamitz\nkirchhain\nkirchheimbolanden\nkirchheim\nkirn\nkirtorf\nkitzingen\nkitzscher\nkleve\nklingenberg\nklingenthal\nklötze\nklütz\nknittlingen\nkoblenz\nkohren\nkolbermoor\nkölleda\nkönigsberg\nkönigsbrück\nkönigsbrunn\nkönigsee\nkönigslutter\nkönigstein\nkönigstein\nkönigswinter\nkönigs\nkönnern\nkonstanz\nkonz\nkorbach\nkorntal\nkornwestheim\nkorschenbroich\nköthen\nkraichtal\nkrakow\nkranichfeld\nkrautheim\nkrefeld\nkremmen\nkrempe\nkreuztal\nkronach\nkronberg\nkröpelin\nkroppenstedt\nkrumbach\nkühlungsborn\nkulmbach\nkülsheim\nkünzelsau\nkupferberg\nkuppenheim\nkusel\nkyllburg\nkyritz\nlaage\nlaatzen\nladenburg\nlage\nlahnstein\nlahr\nlaichingen\nlambrecht\nlampertheim\nlandau\nlandau\nlandsberg\nlandsberg\nlandshut\nlandstuhl\nlangelsheim\nlangen\nlangenau\nlangenburg\nlangenfeld\nlangenhagen\nlangenselbold\nlangenzenn\nlangewiesen\nlassan\nlaubach\nlaucha\nlauchhammer\nlauchheim\nlauda\nlauenburg\nlauf\nlaufen\nlaufenburg\nlauffen\nlauingen\nlaupheim\nlauscha\nlauta\nlauter\nlauterbach\nlauterecken\nlauterstein\nlebach\nlebus\nleer\nlehesten\nlehrte\nleichlingen\nleimen\nleinefelde\nleinfelden\nleipheim\nleipzig\nleisnig\nlemgo\nlengenfeld\nlengerich\nlennestadt\nlenzen\nleonberg\nleun\nleuna\nleutenberg\nleutershausen\nleutkirch\nleverkusen\nlich\nlichtenau\nlichtenau\nlichtenberg\nlichtenfels\nlichtenfels\nlichtenstein\nliebenau\nliebenwalde\nlieberose\nliebstadt\nlimbach\nlimburg\nlindau\nlinden\nlindenberg\nlindenfels\nlindow\nlingen\nlinnich\nlinz\nlippstadt\nlöbau\nlöffingen\nlohmar\nlohne\nlöhne\nlohr\nloitz\nlollar\nlommatzsch\nlöningen\nlorch\nlorch\nlörrach\nlorsch\nlößnitz\nlöwenstein\nlübbecke\nlübben\nlübbenau\nlübeck\nlübtheen\nlübz\nlüchow\nlucka\nluckau\nluckenwalde\nlüdenscheid\nlüdinghausen\nludwigsburg\nludwigsfelde\nludwigshafen\nludwigslust\nludwigsstadt\nlugau\nlügde\nlüneburg\nlünen\nlunzenau\nlütjenburg\nlützen\nlychen\nmagdala\nmagdeburg\nmahlberg\nmainbernheim\nmainburg\nmaintal\nmainz\nmalchin\nmalchow\nmannheim\nmanderscheid\nmansfeld\nmarbach\nmarburg\nmarienberg\nmarienmünster\nmarkdorf\nmarkgröningen\nmärkisch\nmarkkleeberg\nmarkneukirchen\nmarkranstädt\nmarktbreit\nmarktheidenfeld\nmarktleuthen\nmarktoberdorf\nmarktredwitz\nmarktsteft\nmarl\nmarlow\nmarne\nmarsberg\nmaulbronn\nmaxhütte\nmayen\nmechernich\nmeckenheim\nmedebach\nmeerane\nmeerbusch\nmeersburg\nmeinerzhagen\nmeiningen\nmeisenheim\nmeißen\nmeldorf\nmelle\nmellrichstadt\nmelsungen\nmemmingen\nmenden\nmendig\nmengen\nmeppen\nmerkendorf\nmerseburg\nmerzig\nmeschede\nmeßkirch\nmeßstetten\nmettmann\nmetzingen\nmeuselwitz\nmeyenburg\nmichelstadt\nmiesbach\nmiltenberg\nmindelheim\nminden\nmirow\nmittenwalde\nmitterteich\nmittweida\nmöckern\nmöckmühl\nmoers\nmölln\nmönchengladbach\nmonheim\nmonheim\nmonschau\nmontabaur\nmoosburg\nmörfelden\nmoringen\nmosbach\nmössingen\nmücheln\nmügeln\nmühlacker\nmühlberg\nmühldorf\nmühlhausen\nmühlheim\nmühlheim\nmülheim\nmülheim\nmüllheim\nmüllrose\nmünchberg\nmüncheberg\nmünchenbernsdorf\nmunderkingen\nmunich\nmünnerstadt\nmünsingen\nmunster\nmünster\nmünstermaifeld\nmünzenberg\nmurrhardt\nmylau\nnabburg\nnagold\nnaila\nnassau\nnastätten\nnauen\nnaumburg\nnaumburg\nnaunhof\nnebra\nneckarbischofsheim\nneckargemünd\nneckarsteinach\nneckarsulm\nneresheim\nnetphen\nnettetal\nnetzschkau\nneu\nneubrandenburg\nneubukow\nneubulach\nneuburg\nneudenau\nneuenbürg\nneuenburg\nneuenhaus\nneuenrade\nneuenstadt\nneuenstein\nneuerburg\nneuffen\nneuhaus\nneu\nneukalen\nneukirchen\nneukirchen\nneukloster\nneumark\nneumarkt\nneumarkt\nneumünster\nneunburg\nneunkirchen\nneuötting\nneuruppin\nneusalza\nneusäß\nneuss\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustadt\nneustrelitz\nneutraubling\nneu\nneuwied\nnidda\nniddatal\nnidderau\nnideggen\nniebüll\nniedenstein\nniederkassel\nniedernhall\nnieder\nniederstetten\nniederstotzingen\nnieheim\nniemegk\nnienburg\nnienburg\nnierstein\nniesky\nnittenau\nnorden\nnordenham\nnorderney\nnorderstedt\nnordhausen\nnordhorn\nnördlingen\nnortheim\nnortorf\nnossen\nnuremberg\nnürtingen\noberasbach\noberharz\noberhausen\noberhof\noberkirch\noberkochen\noberlungwitz\nobermoschel\nobernburg\noberndorf\nobernkirchen\nober\noberriexingen\nobertshausen\noberursel\noberviechtach\noberweißbach\noberwesel\noberwiesenthal,\nochsenfurt\nochsenhausen\nochtrup\noderberg\noebisfelde\noederan\noelde\noelsnitz\noelsnitz\noer\noerlinghausen\noestrich\noettingen\noffenbach\noffenburg\nohrdruf\nöhringen\nolbernhau\nolching\noldenburg\noldenburg\nolfen\nolpe\nolsberg\noppenau\noppenheim\noranienbaum\noranienburg\norlamünde\nornbau\nortenberg\nortrand\noschatz\noschersleben\nosnabrück\nosterburg\nosterburken\nosterfeld\nosterhofen\nosterholz\nosterode\nosterwieck\nostfildern\nostheim\nosthofen\nöstringen\nostritz\notterberg\notterndorf\nottweiler\noverath\nowen\npaderborn\npapenburg\npappenheim\nparchim\nparsberg\npasewalk\npassau\npattensen\npausa\npegau\npegnitz\npeine\npeitz\npenig\npenkun\npenzberg\npenzlin\nperleberg\npetershagen\npfaffenhofen\npfarrkirchen\npforzheim\npfreimd\npfullendorf\npfullingen\npfungstadt\nphilippsburg\npinneberg\npirmasens\npirna\nplattling\nplau\nplaue\nplauen\nplettenberg\npleystein\nplochingen\nplön\npockau\npocking\npohlheim\npolch\nporta\npößneck\npotsdam\npottenstein\npreetz\npremnitz\nprenzlau\npressath\npreußisch\nprichsenstadt\npritzwalk\nprüm\npuchheim\npulheim\npulsnitz\nputbus\nputlitz\npüttlingen\nquakenbrück\nquedlinburg\nquerfurt\nquickborn\nrabenau\nradeberg\nradebeul\nradeburg\nradevormwald\nradolfzell\nraguhn\nrahden\nrain\nramstein\nranis\nransbach\nrastatt\nrastenberg\nrathenow\nratingen\nratzeburg\nrauenberg\nraunheim\nrauschenberg\nravensburg\nravenstein\nrecklinghausen\nrees\nregen\nregensburg\nregis\nrehau\nrehburg\nrehna\nreichelsheim\nreichenbach\nreichenbach\nreinbek\nreinfeld,\nreinheim\nremagen\nremda\nremscheid\nremseck\nrenchen\nrendsburg\nrennerod\nrenningen\nrerik\nrethem\nreutlingen\nrheda\nrhede\nrheinau\nrheinbach\nrheinberg\nrheinböllen\nrheine\nrheinfelden\nrheinsberg\nrheinstetten\nrhens\nrhinow\nribnitz\nrichtenberg\nriedenburg\nriedlingen\nriedstadt\nrieneck\nriesa\nrietberg\nrinteln\nröbel\nrochlitz\nrockenhausen\nrodalben\nrodenberg\nrödental\nrödermark\nrodewisch\nrodgau\nroding\nrömhild\nromrod\nronneburg\nronnenberg\nrosbach\nrosenfeld\nrosenheim\nrosenthal\nrösrath\nroßleben\nroßwein\nrostock\nrotenburg\nrotenburg\nroth\nrötha\nröthenbach\nrothenburg\nrothenburg\nrothenfels\nrottenburg\nrottenburg\nröttingen\nrottweil\nrötz\nrüdesheim\nrudolstadt\nruhla\nruhland\nrunkel\nrüsselsheim\nrutesheim\nrüthen\nsaalburg\nsaalfeld\nsaarbrücken\nsaarburg\nsaarlouis\nsachsenhagen\nsachsenheim\nsalzgitter\nsalzkotten\nsalzwedel\nsandau\nsandersdorf\nsangerhausen\nsankt\nsankt\nsankt\nsarstedt\nsassenberg\nsassnitz\nsayda\nschalkau\nschauenstein\nscheer\nscheibenberg\nscheinfeld\nschelklingen\nschenefeld\nscheßlitz\nschieder\nschifferstadt\nschillingsfürst\nschiltach\nschirgiswalde\nschkeuditz\nschkölen\nschleiden\nschleiz\nschleswig\nschlettau\nschleusingen\nschlieben\nschlitz\nschloß\nschlotheim\nschlüchtern\nschlüsselfeld\nschmalkalden\nschmallenberg\nschmölln\nschnackenburg\nschnaittenbach\nschneeberg\nschneverdingen\nschömberg\nschönau\nschönau\nschönberg\nschönebeck\nschöneck\nschönewalde\nschongau\nschöningen\nschönsee\nschönwald\nschopfheim\nschöppenstedt\nschorndorf\nschortens\nschotten\nschramberg\nschraplau\nschriesheim\nschrobenhausen\nschrozberg\nschüttorf\nschwaan\nschwabach\nschwäbisch\nschwäbisch\nschwabmünchen\nschwaigern\nschwalbach\nschwalmstadt\nschwandorf\nschwanebeck\nschwarzenbach\nschwarzenbach\nschwarzenbek\nschwarzenberg\nschwarzenborn\nschwarzheide\nschwedt\nschweich\nschweinfurt\nschwelm\nschwentinental\nschwerin\nschwerte\nschwetzingen\nsebnitz\nseehausen\nseeland\nseelow\nseelze\nseesen\nsehnde\nseifhennersdorf\nselb\nselbitz\nseligenstadt\nselm\nselters\nsenden\nsendenhorst\nsenftenberg\nseßlach\nsiegburg\nsiegen\nsigmaringen\nsimbach\nsimmern\nsindelfingen\nsingen\nsinsheim\nsinzig\nsoest\nsolingen\nsolms\nsoltau\nsömmerda\nsondershausen\nsonneberg\nsonnewalde\nsonthofen\nsontra\nspaichingen\nspalt\nspangenberg\nspeicher\nspenge\nspeyer\nspremberg\nspringe\nsprockhövel\nstade\nstadtallendorf\nstadtbergen\nstadthagen\nstadtilm\nstadtlengsfeld\nstadtlohn\nstadtoldendorf\nstadtprozelten\nstadtroda\nstadtsteinach\nstadt\nstarnberg\nstaßfurt\nstaufen\nstaufenberg\nstavenhagen\nstein\nsteinach\nsteinau\nsteinbach\nsteinbach\nsteinfurt\nsteinheim\nsteinheim\nstendal\nsternberg\nstockach\nstolberg\nstollberg\nstolpen\nstorkow\nstößen\nstraelen\nstralsund\nstrasburg\nstraubing\nstrausberg\nstrehla\nstromberg\nstühlingen\nstutensee\nstuttgart\nsüdliches\nsuhl\nsulingen\nsulz\nsulzbach\nsulzbach\nsulzburg\nsundern\nsüßen\nsyke\ntambach\ntangerhütte\ntangermünde\ntann\ntanna\ntauberbischofsheim\ntaucha\ntaunusstein\ntecklenburg\ntegernsee\ntelgte\nteltow\ntemplin\ntengen\ntessin\nteterow\ntettnang\nteublitz\nteuchern\nteupitz\nteuschnitz\nthale\nthalheim\nthannhausen\ntharandt\nthemar\nthum\ntirschenreuth\ntitisee\ntittmoning\ntodtnau\ntöging\ntönisvorst\ntönning\ntorgau\ntorgelow\ntornesch\ntraben\ntraunreut\ntraunstein\ntrebbin\ntrebsen\ntreffurt\ntrendelburg\ntreuchtlingen\ntreuen\ntreuenbrietzen\ntriberg\ntribsees\ntrier\ntriptis\ntrochtelfingen\ntroisdorf\ntrossingen\ntrostberg\ntübingen\ntuttlingen\ntwistringen\nübach\nüberlingen\nuebigau\nueckermünde\nuelzen\nuetersen\nuffenheim\nuhingen\nulm\nulmen\nulrichstein\nummerstadt\nunkel\nunna\nunterschleißheim\nusedom\nusingen\nuslar\nvacha\nvaihingen\nvallendar\nvarel\nvechta\nvelbert\nvelburg\nvelden\nvelen\nvellberg\nvellmar\nvelten\nverden\nveringenstadt\nverl\nversmold\nvetschau\nviechtach\nviernheim\nviersen\nvillingen\nvilsbiburg\nvilseck\nvilshofen\nvisselhövede\nvlotho\nvoerde\nvogtsburg\nvohburg\nvohenstrauß\nvöhrenbach\nvöhringen\nvolkach\nvölklingen\nvolkmarsen\nvreden\nwachenheim\nwächtersbach\nwadern\nwaghäusel\nwahlstedt\nwaiblingen\nwaibstadt\nwaischenfeld\nwaldbröl\nwaldeck\nwaldenbuch\nwaldenburg\nwaldenburg\nwaldershof\nwaldheim\nwaldkappel\nwaldkirch\nwaldkirchen\nwaldkraiburg\nwaldmünchen\nwaldsassen\nwaldshut\nwalldorf\nwalldürn\nwallenfels\nwalsrode\nwaltershausen\nwaltrop\nwanfried\nwangen\nwanzleben\nwarburg\nwaren\nwarendorf\nwarin\nwarstein\nwassenberg\nwasserburg\nwassertrüdingen\nwasungen\nwedel\nweener\nwegberg\nwegeleben\nwehr\nweida\nweiden\nweikersheim\nweil\nweilburg\nweil\nweilheim\nweilheim\nweimar\nweingarten\nweinheim\nweinsberg\nweinstadt\nweismain\nweißenberg\nweißenburg\nweißenfels\nweißenhorn\nweißensee\nweißenstadt\nweißenthurm\nweißwasser\nweiterstadt\nwelzheim\nwelzow\nwemding\nwendlingen\nwerben\nwerdau\nwerder\nwerdohl\nwerl\nwermelskirchen\nwernau\nwerne\nwerneuchen\nwernigerode\nwertheim\nwerther\nwertingen\nwesel\nwesenberg\nwesselburen\nwesseling\nwesterburg\nwesterstede\nwetter\nwetter\nwettin\nwetzlar\nwiddern\nwiehe\nwiehl\nwiesbaden\nwiesensteig\nwiesloch\nwiesmoor\nwildau\nwildberg\nwildenfels\nwildeshausen\nwilhelmshaven\nwilkau\nwillebadessen\nwillich\nwilsdruff\nwilster\nwilthen\nwindischeschenbach\nwindsbach\nwinnenden\nwinsen\nwinterberg\nwipperfürth\nwirges\nwismar\nwissen\nwitten\nwittenberg\nwittenberge\nwittenburg\nwittichenau\nwittlich\nwittingen\nwittmund\nwittstock\nwitzenhausen\nwoldegk\nwolfach\nwolfenbüttel\nwolfhagen\nwolframs\nwolfratshausen\nwolfsburg\nwolfstein\nwolgast\nwolkenstein\nwolmirstedt\nworms\nwörrstadt\nwörth\nwörth\nwörth\nwriezen\nwülfrath\nwunsiedel\nwunstorf\nwuppertal\nwürselen\nwurzbach\nwürzburg\nwurzen\nwustrow\nwyk\nxanten\nzahna\nzarrentin\nzehdenick\nzeil\nzeitz\nzell\nzell\nzell\nzella\nzerbst\nzeulenroda\nzeven\nziegenrück\nzierenberg\nziesar\nzirndorf\nzittau\nzörbig\nzossen\nzschopau\nzülpich\nzweibrücken\nzwenkau\nzwickau\nzwiesel\nzwingenberg\nzwönitz".split("\n"));
	this.trainingData.set("animals","aardvark\naardwolf\nalbatross\nalligator\nalpaca\nanaconda\nangelfish\nanglerfish\nant\nanteater\nantelope\nantlion\nape\naphid\narmadillo\nasp\nass\nbaboon\nbadger\nbaldeagle\nbandicoot\nbarnacle\nbarracuda\nbasilisk\nbass\nbat\nbear\nbeaver\nbedbug\nbee\nbeetle\nbird\nbison\nblackbird\nblackpanther\nblackwidow\nbluebird\nbluejay\nbluewhale\nboa\nboar\nbobcat\nbonobo\nbuffalo\nbutterfly\nbuzzard\ncamel\ncapybara\ncaribou\ncarp\ncat\ncatshark\ncaterpillar\ncatfish\ncentipede\nchameleon\ncheetah\nchickadee\nchicken\nchimpanzee\nchinchilla\nchipmunk\nclam\nclownfish\ncobra\ncockroach\ncod\ncondor\ncoral\ncougar\ncow\ncoyote\ncrab\ncrane\ncranefly\ncrayfish\ncricket\ncrocodile\ncrow\ncuckoo\ndamselfly\ndeer\ndingo\ndog\ndolphin\ndonkey\ndormouse\ndove\ndragonfly\nduck\ndungbeetle\neagle\nearthworm\nearwig\nechidna\neel\negret\nelephant\nelephantseal\nelk\nemu\nermine\nfalcon\nferret\nfinch\nfirefly\nfish\nflamingo\nflea\nfly\nfowl\nfox\nfrog\nfruitbat\ngamefowl\ngalliform\ngazelle\ngecko\ngerbil\ngiantpanda\ngiantsquid\ngibbon\ngiraffe\ngoat\ngoldfish\ngoose\ngopher\ngorilla\ngrasshopper\ngrizzlybear\ngroundshark\ngroundsloth\ngrouse\nguan\nguanaco\nguineafowl\nguineapig\ngull\nhaddock\nhalibut\nhammerheadshark\nhamster\nhare\nhawk\nhedgehog\nhermitcrab\nheron\nherring\nhippopotamus\nhornet\nhorse\nhoverfly\nhummingbird\nhumpbackwhale\nhyena\niguana\njackal\njaguar\njay\njellyfish\nkangaroo\nkingfisher\nkiwi\nkoala\nkoi\nkomodo\nkrill\nladybug\nlamprey\nlark\nleech\nlemming\nlemur\nleopard\nlimpet\nlion\nlizard\nllama\nlobster\nlocust\nloon\nlouse\nlynx\nmacaw\nmackerel\nmagpie\nmammal\nmanatee\nmantaray\nmarmoset\nmarmot\nmeadowlark\nmeerkat\nmink\nminnow\nmite\nmockingbird\nmole\nmollusk\nmongoose\nmonitor\nmonkey\nmoose\nmosquito\nmoth\nmouse\nmule\nnarwhal\nnewt\nnightingale\noctopus\norangutan\norca\nostrich\notter\nowl\nox\npanda\npanther\nparakeet\nparrot\npartridge\npeacock\npeafowl\npelican\npenguin\nperch\nperegrine\npheasant\npig\npigeon\npike\npiranha\nplatypus\npolarbear\npony\nporcupine\nporpoise\npossum\nprairiedog\nprawn\nprayingmantis\nprimate\npuffin\npuma\npython\nquail\nrabbit\nraccoon\nrat\nrattlesnake\nraven\nredpanda\nreindeer\nreptile\nrhinoceros\nroadrunner\nrodent\nrook\nrooster\nsalamander\nsalmon\nscorpion\nseahorse\nsealion\nseaslug\nseasnail\nshark\nsheep\nshrew\nshrimp\nsilkworm\nsilverfish\nskink\nskunk\nsloth\nslug\nsnail\nsnake\nsnipe\nsole\nsparrow\nspermwhale\nspider\nspidermonkey\nsquid\nsquirrel\nstarfish\nstingray\nstoat\nstork\nswallow\nswan\nswift\nswordfish\nswordtail\ntarantula\ntermite\nthrush\ntiger\ntigershark\ntoad\ntortoise\ntoucan\ntreefrog\ntrout\ntuna\nturkey\nturtle\ntyrannosaurus\nvampirebat\nviper\nvole\nvulture\nwallaby\nwalrus\nwasp\nwaterbuffalo\nweasel\nwhale\nwhitefish\nwildcat\nwildebeest\nwolf\nwolverine\nwombat\nwoodpecker\nyak\nzebra".split("\n"));
	this.trainingData.set("pokemon","bulbasaur\nivysaur\nvenusaur\ncharmander\ncharmeleon\ncharizard\nsquirtle\nwartortle\nblastoise\ncaterpie\nmetapod\nbutterfree\nweedle\nkakuna\nbeedrill\npidgey\npidgeotto\npidgeot\nrattata\nraticate\nspearow\nfearow\nekans\narbok\npikachu\nraichu\nsandshrew\nsandslash\nnidoran\nnidorina\nnidoqueen\nnidoran\nnidorino\nnidoking\nclefairy\nclefable\nvulpix\nninetales\njigglypuff\nwigglytuff\nzubat\ngolbat\noddish\ngloom\nvileplume\nparas\nparasect\nvenonat\nvenomoth\ndiglett\ndugtrio\nmeowth\npersian\npsyduck\ngolduck\nmankey\nprimeape\ngrowlithe\narcanine\npoliwag\npoliwhirl\npoliwrath\nabra\nkadabra\nalakazam\nmachop\nmachoke\nmachamp\nbellsprout\nweepinbell\nvictreebel\ntentacool\ntentacruel\ngeodude\ngraveler\ngolem\nponyta\nrapidash\nslowpoke\nslowbro\nmagnemite\nmagneton\nfarfetchd\ndoduo\ndodrio\nseel\ndewgong\ngrimer\nmuk\nshellder\ncloyster\ngastly\nhaunter\ngengar\nonix\ndrowzee\nhypno\nkrabby\nkingler\nvoltorb\nelectrode\nexeggcute\nexeggutor\ncubone\nmarowak\nhitmonlee\nhitmonchan\nlickitung\nkoffing\nweezing\nrhyhorn\nrhydon\nchansey\ntangela\nkangaskhan\nhorsea\nseadra\ngoldeen\nseaking\nstaryu\nstarmie\nmime\nscyther\njynx\nelectabuzz\nmagmar\npinsir\ntauros\nmagikarp\ngyarados\nlapras\nditto\neevee\nvaporeon\njolteon\nflareon\nporygon\nomanyte\nomastar\nkabuto\nkabutops\naerodactyl\nsnorlax\narticuno\nzapdos\nmoltres\ndratini\ndragonair\ndragonite\nmewtwo\nmew".split("\n"));
	this.trainingData.set("fish","catfish\nlungfish\nblackfish\nalbacore\nalewife\nalfonsino\nalgaeeater\nalligatorfish\nalligator\nanchovy\nanemonefish\nangelfish\nangler\nanglerfish\nicefish\ncodlet\narapaima\narcherfish\nchar\ngurnard\nsearobin\narmorhead\narowana\narrowtooth\naruana\ncarp\nglassfish\nmackerel\ncod\nherring\nsalmon\nsaury\nsilverside\ngrayling\nprowfish\nayu\nbaikal\noilfish\nbala\nballan\nwrasse\nkillifish\nbandfish\nbanjo\nbangus\nbarb\nbarbel\ndragonfish\nhoundshark\nbarfish\nbarracuda\nbarracudina\nbarramundi\ndanio\nbarreleye\nbaskingshark\nbass\nbasslet\nbatfish\nbatray\nbeachsalmon\nbeardfish\nsturgeon\ndanio\nbetta\nbichir\ngoatfish\nbigeye\nsquaretail\ncarp\nbuffalo\nbigscale\npomfret\nbillfish\nbitterling\nblackchin\nblackfish\ntetra\nreefshark\nscalyfin\nscabbardfish\nswallower\ntriggerfish\nbleak\nblenny\ngoby\nblobfish\nblowfish\nblueeye\nbluefin\nbluefish\nbluegill\ngourami\nwhiting\nknifefish\nminnow\nboafish\nboarfish\nsnipeeel\nbocaccio\nboga\nbonefish\nbonito\nbonnetmouth\nchub\nbonytongue\nbowfin\nboxfish\nbream\nbrill\nbristlemouth\nbristlenose\ndogfish\nlamprey\nbrotula\nbuffalofish\nbullhead\nbullshark\nbulltrout\nburbot\nburi\nburmadanio\nbutterflyray\nbutterflyfish\nflyingfish\nhalibut\nrockfish\ncandiru\ncandlefish\ncapelin\ncardinalfish\ncardinaltetra\ncarp\ncarpetshark\ncarpsucker\ncatalufa\ncatfish\ncatla\ncatshark\ncavefish\nrainbowfish\nmudminnow\npickerel\nchannelbass\nchannelcatfish\nchar\ncherrysalmon\nchimaera\nchinooksalmon\ncherubfish\nchub\nchubsucker\nchumsalmon\ncichlid\ncisco\nclingfish\nclownfish\ncobbler\ncobia\ncod\ncodlet\ncodling\ncoelacanth\ncoffinfish\ncohosalmon\ncoley\ncarpetshark\nsquawfish\ncombfish\nblenny\ntunny\nconger\ncichlid\ncookiecutter\ncoolieloach\ncornetfish\ncowfish\ncownose\ncowshark\ncrappie\ncrestfish\nkelpfish\ncroaker\ncrocodileshark\ncuckoowrasse\ncusk\ncuskeel\ncutlassfish\ncutthroateel\ncutthroattrout\ndab\ndace\ndaggertooth\ndamselfish\ndanio\ndarter\ndartfish\ndealfish\npupfish\nsmelt\ncardinalfish\nflathead\nstingray\ndemoiselle\ndevario\ndevilray\ndhufish\ndiscus\ndiver\ndogfish\ndogteeth\ndorab\ndorado\ndory\ndottyback\ndragonet\ndragonfish\ndragongoby\ndriftfish\ndrum\nduckbill\nduskygrouper\neagleray\neel\neelgoby\neelpout\neeltailcatfish\nelasmobranch\nelectriceel\nelephantnose\nelver\nparrotfish\nemperor\nbream\nescolar\neulachon\nflounder\nbrotula\nmoray\ntrevally\nfangtooth\nsculpin\nfeatherback\nfierasfer\nfilefish\nfingerfish\nfirefish\nwhalefish\nflagblenny\nflagfin\nflagfish\nflagtail\nflashlightfish\nflatfish\nflathead\nflier\nflounder\ngurnard\nflyingfish\nfootballfish\nbrooder\nhatchetfish\nfrogfish\nfusilier\ngaljoen\ngangesshark\ngar\ngaribaldi\ngarpike\nghostfish\nghostflathead\nghostknifefish\nghostpipefish\nghostshark\nghoul\ngibberfish\nshad\nglassfish\ngoatfish\ngoby\nshiner\ngoldeye\ngoldfish\ngombessa\ngoosefish\nrockfish\ngourami\ngraveldiver\ngrayling\nmullet\nreefshark\nwhiteshark\nswordtail\ngreeneye\ngreenling\ngrenadier\npuffer\ngroundshark\ngrouper\ngrunion\ngrunt\ngrunter\ngruntsculpin\ngudgeon\nguitarfish\nmenhaden\ngulper\ngunnel\nguppy\ngurnard\nhaddock\nhagfish\nhairtail\nhake\nhalfbeak\nhalfmoon\nhalibut\nhalosaur\nhamlet\nhammerhead\nhammerjaw\nhandfish\nhardhead\nharelip\nhatchetfish\nhawkfish\nherring\nhogsucker\nhoki\nhornshark\nhorsefish\nhoundshark\nhuchen\nhussar\nicefish\nide\nilisha\ninanga\ninconnu\njack\njackfish\njavelin\njawfish\njellynose\njewelfish\njewel\njewfish\njohndory\nkafue\nkahawai\nkaluga\nkanyu\nkelpperch\nkelpfish\nkillifish\nkingfish\nkingofthesalmon\ngourami\nknifefish\nknifejaw\nkoi\nkokanee\nkokopu\nlabyrinthfish\nladyfish\nlagena\nlampfish\nlamprey\nlancetfish\nlanternfish\nlargemouth\nleaffish\nleatherjacket\nlefteyeflounder\nlemonshark\nlemonsole\nlenok\nleopard\nlightfish\nlimia\nlinedsole\nling\nlingcod\nlionfish\nlivebearer\nlizardfish\nloach\nlongfin\nescolar\nmudsucker\nchimaera\nloosejaw\nlouvar\nluderick\nhake\nlumpsucker\nlungfish\nmackerel\nmackerelshark\nmadtom\nmahseer\nmakoshark\nmanefish\nmanofwar\nmantaray\nmarblefish\nmarlin\nmasu\nmedaka\nmedusafish\nmegamouthshark\nmenhaden\ngoldentrout\nmilkfish\nminnow\nminnowofthedeep\nmodocsucker\nmojarra\nmola\nprickleback\nmonkfish\nmooneye\nmoonfish\nmora\nmoray\nmorid\nmorwong\nmosquitofish\nmouthbrooder\nmrigal\nmudcat\nmudfish\nmudminnow\nmudminnow\nmudskipper\nmudsucker\nmullet\nmummichog\nmurraycod\nmuskellunge\nmustardeel\nnase\nneedlefish\nrivuline\nnibblefish\nnoodlefish\ndarter\ndaggertooth\nanchovy\nclingfish\nlampfish\nsearobin\nsquawfish\nstargazer\nnurseryfish\nnurseshark\noarfish\nsunfish\nwhitetipshark\noilfish\noldwife\nopah\nopaleye\nroughy\nunicornfish\nbatfish\nvelvetfish\noscar\nalbacore\nviperfish\npaddlefish\npanga\nparadisefish\nparore\nparrotfish\npeacockflounder\npeamouth\npearleye\npearlfish\npelicaneel\ngulper\npencilfish\npencilsmelt\ncorydoras\nperch\nelephantnose\npickerel\npigfish\npikeconger\npike\npikeblenny\npikeperch\npilchard\npilotfish\npineapplefish\npineconefish\npinksalmon\npíntano\npipefish\npiranha\npirarucu\npirateperch\nplaice\nplaty\nplatyfish\npleco\nplownose\npoacher\npollyfish\npollock\npomfret\npompano\ndolphinfish\nponyfish\ncatalufa\nporbeagle\nporcupinefish\nporgy\npowen\nprickleback\npricklefish\npricklyshark\nprowfish\npufferfish\npumpkinseed\npupfish\nsunfish\nquillback\nquillfish\nrabbitfish\nragfish\nrainbowtrout\nrainbowfish\nrasbora\nratfish\nrattail\nray\nrazorfish\nredsalmon\nredsnapper\nredfin\nredfish\nredlip\nredmouth\nwhalefish\nreedfish\nremora\nrequiemshark\nribboneel\nribbonfish\nriceeel\nricefish\nridgehead\ndace\nrivuline\nroach\nroanokebass\nrockbass\nrockbeauty\nrockcod\nrockfish\nrockling\ngunnel\nrohu\nronquil\nroosterfish\nropefish\nroughscad\nroughsculpin\nroughy\nroundhead\nwhitefish\nrudd\nrudderfish\nruffe\nsturgeon\nsábalo\nsabertooth\nsabertoothfish\nsablefish\nsailfish\nsalamanderfish\nsalmon\nsalmonshark\nsandbarshark\nsandburrower\nsanddab\nsanddiver\nsandeel\nsandfish\nsandgoby\nsandknifefish\nsandlance\nsandperch\nsandroller\nsandstargazer\nsandtiger\nsandtilefish\nfringehead\nsardine\nsargassumfish\nsauger\nsaury\nsawfish\nsawshark\nscabbardfish\nscat\nscissortail\nscorpionfish\nsculpin\nscup\nseabass\nseabream\nseacatfish\nseachub\nseadevil\nseadragon\nsealamprey\nsearaven\nseasnail\nseatoad\nseahorse\nseamoth\nsearobin\nshad\nshark\nsharksucker\nsharpnose\nsheatfish\nsheepshead\nsheepshead\nshiner\nshrimpfish\nsiamesefightingfish\nsillago\ndory\nsilverside\nsixgillray\nsixgillshark\nskate\nskilfish\nskipjacktuna\nmola\nsnipeeel\nsleeper\nsleepershark\nslickhead\nslimehead\nslipmouth\nsquaretail\nsmelt\nsmeltwhiting\nsnailfish\nsnakeeel\nsnakehead\nsnapper\nsnipeeel\nsnipefish\nsnoek\nsnook\nsnubnose\nsoldierfish\nsole\ndarter\nspadefish\nspaghettieel\nspearfish\nspeckledtrout\nspiderfish\nspikefish\nspinefoot\nbasslet\nspinyfin\nsplitfin\nspookfish\nsprat\nspringfish\nsquaretail\nsquawfish\nsqueaker\nsquirrelfish\nsculpin\nstargazer\nsteelhead\nstickleback\nstingfish\nstingray\nstonecat\nstonefish\nstoneroller\nburrfish\nsturgeon\nsucker\nnoodlefish\nsunfish\nsurfperch\nsurgeonfish\nswallower\nswampeel\nswampfish\nsweeper\nswordfish\nswordtail\ntadpolefish\ntailor\ntaimen\ntang\ntapetail\ntarpon\ntarwhine\ntelescopefish\ntench\ntenpounder\ntenuis\ntetra\nthornfish\nthreadfin\nthreadtail\nstickleback\npuffer\nthresher\ntigerbarb\ntigerperch\ntigershark\ntilapia\ntilefish\ntoadfish\ntommyruff\ntompot\ntonguefish\ntope\ntopminnow\ntorpedo\ntrahira\ntreefish\ntrevally\ntriggerfish\ntriplespine\ntripletail\ntrout\ntroutperch\ntrumpeter\ntrumpetfish\ntrunkfish\ntubeblenny\ntubeeye\ntubesnout\ntubeshoulder\ntuna\nturbot\nuaru\nunicornfish\nvanjaram\nlanternshark\nvelvetfish\nvendace\nvimba\nviperfish\nwahoo\nwallago\nwalleye\npollock\nwalu\nwarmouth\nwartyangler\nwaryfish\nwaspfish\nweaselshark\nweatherfish\nweever\nweeverfish\nwhalefish\nwhaleshark\nwhiff\nwhitebait\nwhitecroaker\nwhitefish\nwhitemarlin\nwhiteshark\nwhitetip\nwhiting\nwobbegong\nwolfeel\nwolffish\nwolfherring\nwormeel\nwormfish\nwrasse\nwrymouth\ntriplefin\nyellowbass\nyellowhead\nyellowjack\nyellowmargin\nyellowtail\namberjack\nbarracuda\nhorsemackerel\nsnapper\ntang\nweaver\nzander\nbullheadshark\nzebrafish\nlionfish\nzebraloach\nzebrashark\nturkeyfish\nziege\nzingel".split("\n"));
	this.trainingData.set("plantscommon","alder\nblackalder\ncommonalder\nfalsealder\ngrayalder\nspeckledalder\nstripedalder\nwhitealder\nalmond\nambrosia\namyroot\napple\nosageapple\napricot\narfaj\narrowwood\nash\nblackash\nblueash\ncaneash\ngreenash\nmapleash\nredash\nriverash\nswampash\nwhiteash\nwaterash\nazolla\nbamboo\nbanana\nbaobab\nbay\nbaylaurel\nbean\nbearberry\nbearcorn\nbeech\nbindweed\nbirdsnest\nbirch\nblackbirch\nboleanbirch\ncanoebirch\ncherrybirch\nweepingbirch\nwhitebirch\ngraybirch\nmahoganybirch\npaperbirch\nredbirch\nriverbirch\nsilverbirch\nspicebirch\nsweetbirch\nwaterbirch\nweepingbirch\nwhitebirch\nyellowbirch\nbittercress\nbittersweet\nbitterweed\nblackberry\nblackcap\nblackhaw\nblackiehead\nblackweed\nblueberry\nbowwood\nbox\nfalsebox\nboxelder\nboxwood\nbrier\nsandbrier\nbrittlebush\nbroadleaf\nbrownbetty\nbuckeye\nbuffaloweed\nbutterflyweed\ncabbage\nclumpfoot\nskunkcabbage\nswampcabbage\njalap\ncarrot\ncarrotweed\nironwood\ncherry\nblackcherry\nrumcherry\nwildcherry\nwildblackcherry\nchestnut\nchiggerflower\nchrysanthemum\ncinnamon\nclove\nclover\ncoakum\ncoconut\ncoffeeplant\ncolicweed\ncollard\ncolwort\nconeflower\ncornel\ncornelian\ncorydalis\ncottonplant\ncress\nbankcress\nbermudacress\nbulbouscress\nlambscress\nlandcress\nscurvycress\nspringcress\nuplandcress\ncrowfoot\ncrowsnest\ncrowstoes\ncucumber\ndaisy\nyellowdaisy\ndeadnettle\ndevilsbite\ndevilsnose\ndevilsplague\ndewberry\ndindle\ndogwood\ndrumstick\nduckretten\nduscle\ndyeleaves\nearthgall\neucalyptus\neytelia\nfellenwort\nfelonwood\nfelonwort\nfennel\nferns\nchristmasfern\nmosquitofern\nswordferns\nwaterfern\nfeverbush\nfeverfew\nfig\nflax\nfluxroot\nfumewort\nyellowfumewort\ngallberry\ngarget\ngarlic\ngoldengarlic\nwildgarlic\ngarlicmustard\ngarlicroot\ngilliflower\ngoldenbuttons\ngoldenglow\ngordaldo\ngoosetongue\ngrapefruit\ngrapevine\ngroundberry\ngutweed\nhaldi\nharlequin\nhayfever\nhealingblade\nhedgeplant\nhellebore\nhemp\nhempdogbane\nhenplant\nhogweed\nholly\ninkberryholly\nmeadowholly\nswampholly\nhorsecane\nhoundsberry\nhuckleberry\nhouseleek\nindianhemp\nindianposy\ninkberry\nitchweed\nivy\njackinthebush\njuneberry\njuniper\nkeek\nkinnikinnik\nkousa\nkudzu\nlaceflower\nlambsfoot\nlavender\nleek\nlemon\nlettuce\nlilyleek\nlilac\nsummerlilac\nlovevine\nmaize\nmango\nmaple\nashleavedmaple\nblackmaple\ncreekmaple\ncutleafmaple\nmapleash\nmoosemaple\nrivermaple\nsilvermaple\nsoftmaple\nstripedmaple\nsugarmaple\nswampmaple\nwatermaple\nwhitemaple\nmesquite\nhoneymesquite\nmilfoil\nmilkweed\nmilkytassel\nmoosewood\nmorel\nmulberry\nredmulberry\nwhitemulberry\nneem\nnettle\nbullnettle\nhorsenettle\nnightshade\ndeadlynightshade\nwoodynightshade\nnosebleed\noak\nblueoak\nburoak\nblackoak\nchampionoak\ncoastliveoak\ncorkoak\ndyersoak\nislandoak\nmirbeckoak\nnorthernoak\npinoak\nredoak\nscruboak\nspanishoak\nspottedoak\nswampoak\nvalleyoak\nwhiteoak\nolive\nonion\ntreeonion\norangeroot\nosage\nparsley\nparsnip\npea\npeach\npeanut\npear\npellitory\npennyhedge\npepperroot\npigeonberry\npine\npineapple\npistachio\nplane\nplantain\npleurisyroot\npoisonivy\npoisonberry\npoisonflower\npoke\npokeroot\npokeweed\npolkweed\npolecatweed\npoplar\npoppy\npossumhaw\npotato\npudina\nquercitron\nradicalweed\nragweed\nragwort\nrantipole\nrapeseed\nraspberry\nblackraspberry\npurpleraspberry\nredbrush\nredbud\njudastree\nredweed\nrheumatismroot\nrhubarb\nribwort\nrice\nasianrice\nafricanrice\nroadweed\nrocket\ndamerocket\nsweetrocket\nwinterrocket\nyellowrocket\nrocketcress\nrose\nbabyrose\nlowrose\nprairierose\nramblerrose\nwildrose\nrosemary\nrye\nsanguinary\nsaskatoon\nscarletberry\nscoke\nscotchcap\nscurvygrass\nserviceberry\nshadblow\nshadbush\nsilkweed\nswampsilkweed\nskunkweed\nsnakeberry\nsnowdrop\nsorrel\nspeedwell\nspoolwood\nsquawbush\nstammerwort\nstickweed\nstrawberry\nsugarcane\nswallowwort\nsneezeweed\nsneezewort\nsunflower\nsugarplum\nwoundwort\nstagbush\nswallowwort\nsweetpotato\nswinies\nsycamore\ntansy\nwhitetansy\nwildtansy\ntea\nthimbleberry\nthimbleweed\nthousandleaf\nthousandseal\ntasselweed\nthistle\ncornthistle\ncornsowthistle\ncursedthistle\ngreenthistle\nhardthistle\nharesthistle\nmilkthistle\nnoddingthistle\nperennialthistle\npricklythistle\nsowthistle\nswinethistle\nwaythistle\nthyme\ntickleweed\ntobaccoplant\ntomato\ntoothwort\ntouchmenot\ntreadsoftly\ntrillium\nwakerobin\ntuberroot\ntulip\ntulsi\nvanillaorchid\nviburnum\nviolet\nvioletbloom\nvirginbower\nwalnut\nwaybread\nwheat\nwhiteroot\nwildcotton\nwildhops\nwillow\nwindroot\nwineberry\nwinterberry\nwintercress\nwoodbine\nwormwood\nwoundrocket\nyarrow\nyellowwood\nyam\nzedoary".split("\n"));
	window.onload = $bind(this,this.onWindowLoaded);
};
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	setDefaults: function() {
		this.trainingDataKey = "tolkienesque_forenames";
		this.numToGenerate = 100;
		this.minLength = 7;
		this.maxLength = 10;
		this.order = 3;
		this.prior = 0.01;
		this.maxProcessingTime = 500;
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
	,createElements: function() {
		this.trainingDataElement = window.document.getElementById("trainingdatalist");
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
	}
	,onWindowLoaded: function() {
		this.trainingDataElement = window.document.getElementById("trainingdatalist");
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
		this.trainingDataKey = "tolkienesque_forenames";
		this.numToGenerate = 100;
		this.minLength = 7;
		this.maxLength = 10;
		this.order = 3;
		this.prior = 0.01;
		this.maxProcessingTime = 500;
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
		this.createSliders();
		this.addEventListeners();
	}
	,createSliders: function() {
		var _g = this;
		noUiSlider.create(this.orderElement,{ start : [3], connect : "lower", range : { 'min' : [1,1], 'max' : [9]}, pips : { mode : "range", density : 10}});
		this.createTooltips(this.orderElement);
		this.orderElement.noUiSlider.on("change",function(values,handle,rawValues) {
			_g.order = values[handle] | 0;
		});
		this.orderElement.noUiSlider.on("update",function(values1,handle1,rawValues1) {
			_g.updateTooltips(_g.orderElement,handle1,values1[handle1] | 0);
		});
		noUiSlider.create(this.priorElement,{ start : [0.01], connect : "lower", range : { 'min' : 0.001, '50%' : 0.15, 'max' : 0.3}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 2})}});
		this.createTooltips(this.priorElement);
		this.priorElement.noUiSlider.on("change",function(values2,handle2,rawValues2) {
			_g.prior = parseFloat(values2[handle2]);
		});
		this.priorElement.noUiSlider.on("update",function(values3,handle3,rawValues3) {
			_g.updateTooltips(_g.priorElement,handle3,values3[handle3]);
		});
		noUiSlider.create(this.maxProcessingTimeElement,{ start : [500], connect : "lower", range : { 'min' : 50, 'max' : 5000}, pips : { mode : "range", density : 10, format : new wNumb({ decimals : 0})}});
		this.createTooltips(this.maxProcessingTimeElement);
		this.maxProcessingTimeElement.noUiSlider.on("change",function(values4,handle4,rawValues4) {
			_g.maxProcessingTime = parseFloat(values4[handle4]);
		});
		this.maxProcessingTimeElement.noUiSlider.on("update",function(values5,handle5,rawValues5) {
			_g.updateTooltips(_g.maxProcessingTimeElement,handle5,values5[handle5] | 0);
		});
		noUiSlider.create(this.lengthElement,{ start : [4,11], connect : true, range : { 'min' : [3,1], 'max' : 18}, pips : { mode : "range", density : 10}});
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
		this.trainingDataElement.addEventListener("change",function() {
			if(_g.trainingDataElement.value != null) _g.trainingDataKey = _g.trainingDataElement.value;
		},false);
		this.generateElement.addEventListener("click",function() {
			var data = _g.trainingData.get(_g.trainingDataKey);
			if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
			_g.generate(data);
		},false);
		this.startsWithElement.addEventListener("change",function() {
			if(_g.startsWithElement.value != null) _g.startsWith = _g.startsWithElement.value.toLowerCase();
		},false);
		this.endsWithElement.addEventListener("change",function() {
			if(_g.endsWithElement.value != null) _g.endsWith = _g.endsWithElement.value.toLowerCase();
		},false);
		this.includesElement.addEventListener("change",function() {
			if(_g.includesElement.value != null) _g.includes = _g.includesElement.value.toLowerCase();
		},false);
		this.excludesElement.addEventListener("change",function() {
			if(_g.excludesElement.value != null) _g.excludes = _g.excludesElement.value.toLowerCase();
		},false);
		this.similarElement.addEventListener("change",function() {
			if(_g.similarElement.value != null) _g.similar = _g.similarElement.value.toLowerCase();
		},false);
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
			var name1 = this.generator.generateName(this.minLength,this.maxLength,this.startsWith,this.endsWith,this.includes,this.excludes);
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
		if(this.similar.length > 0) names.sort(function(x,y) {
			var xSimilarity = markov_util_EditDistanceMetrics.damerauLevenshtein(x,_g.similar,null);
			var ySimilarity = markov_util_EditDistanceMetrics.damerauLevenshtein(y,_g.similar,null);
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
};
var Std = function() { };
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringTools = function() { };
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
var haxe_IMap = function() { };
var haxe_ds_StringMap = function() {
	this.h = { };
};
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
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
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
var markov_util_IntExtensions = function() { };
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
var markov_util_StringExtensions = function() { };
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
var __map_reserved = {}
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=game.js.map
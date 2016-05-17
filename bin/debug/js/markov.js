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
var _$Main_CustomQueryStringOption = { __ename__ : true, __constructs__ : ["EVERYTHING","NO_TRAINING_DATA"] };
_$Main_CustomQueryStringOption.EVERYTHING = ["EVERYTHING",0];
_$Main_CustomQueryStringOption.EVERYTHING.toString = $estr;
_$Main_CustomQueryStringOption.EVERYTHING.__enum__ = _$Main_CustomQueryStringOption;
_$Main_CustomQueryStringOption.NO_TRAINING_DATA = ["NO_TRAINING_DATA",1];
_$Main_CustomQueryStringOption.NO_TRAINING_DATA.toString = $estr;
_$Main_CustomQueryStringOption.NO_TRAINING_DATA.__enum__ = _$Main_CustomQueryStringOption;
var Main = function() {
	this.lastNames = [];
	this.trainingData = [];
	this.trainingData.push(new _$Main_TrainingData("American Forenames","American Forenames",["aaron","ada","adam","adrian","adrienne","agnes","alan","albert","alberta","alberto","alex","alexander","alexandra","alexis","alfred","alfredo","alice","alicia","alison","allan","allen","allison","alma","alvin","alyssa","amanda","amber","amelia","amy","ana","andre","andrea","andrew","andy","angel","angel","angela","angelica","angelina","angie","anita","ann","anna","anne","annette","annie","anthony","antoinette","antonia","antonio","april","arlene","armando","arnold","arthur","ashley","audrey","barbara","barry","beatrice","becky","belinda","ben","benjamin","bernadette","bernard","bernice","bertha","bessie","beth","bethany","betsy","betty","beulah","beverly","bill","billie","billy","blanca","blanche","bob","bobbie","bobby","bonnie","brad","bradley","brandi","brandon","brandy","brenda","brent","brett","brian","bridget","brittany","brooke","bruce","bryan","byron","calvin","camille","candace","candice","carl","carla","carlos","carmen","carol","carole","caroline","carolyn","carrie","casey","casey","cassandra","catherine","cathy","cecelia","cecil","cecilia","celia","chad","charlene","charles","charlie","charlotte","chelsea","cheryl","chester","chris","christian","christie","christina","christine","christopher","christy","cindy","claire","clara","clarence","claude","claudia","clayton","clifford","clifton","clinton","clyde","cody","colleen","connie","constance","cora","corey","cory","courtney","craig","cristina","crystal","curtis","cynthia","daisy","dale","dan","dana","daniel","danielle","danny","darla","darlene","darrell","darren","darryl","daryl","dave","david","dawn","dean","deanna","debbie","deborah","debra","delia","della","delores","denise","dennis","derek","derrick","desiree","diana","diane","dianna","dianne","dixie","dolores","don","donald","donna","dora","doreen","doris","dorothy","douglas","duane","dustin","dwayne","dwight","earl","ebony","eddie","edgar","edith","edna","eduardo","edward","edwin","eileen","elaine","eleanor","elena","elisa","elizabeth","ella","ellen","elmer","eloise","elsa","elsie","elvira","emily","emma","enrique","eric","erica","erik","erika","erin","erma","ernest","ernestine","essie","estelle","esther","ethel","eugene","eula","eunice","eva","evelyn","everett","faith","fannie","faye","felicia","felix","fernando","flora","florence","floyd","frances","francis","francis","francisco","frank","franklin","fred","freda","freddie","frederick","gabriel","gail","gary","gayle","gene","geneva","genevieve","george","georgia","gerald","geraldine","gertrude","gilbert","gina","ginger","gladys","glen","glenda","glenn","gloria","gordon","grace","greg","gregory","gretchen","guadalupe","guy","gwen","gwendolyn","hannah","harold","harriet","harry","harvey","hattie","hazel","heather","hector","heidi","helen","henrietta","henry","herbert","herman","hilda","holly","hope","howard","hugh","ian","ida","inez","irene","iris","irma","isaac","isabel","ivan","jack","jackie","jacob","jacqueline","jacquelyn","jaime","jaime","james","jamie","jamie","jan","jana","jane","janet","janice","janie","janis","jared","jasmine","jason","javier","jay","jean","jeanette","jeanne","jeannette","jeannie","jeff","jeffery","jeffrey","jenna","jennie","jennifer","jenny","jeremy","jerome","jerry","jesse","jessica","jessie","jessie","jesus","jill","jim","jimmie","jimmy","jo","joan","joann","joanna","joanne","jodi","jody","joe","joel","johanna","john","johnnie","johnnie","johnny","jon","jonathan","jordan","jorge","jose","josefina","joseph","josephine","joshua","joy","joyce","juan","juana","juanita","judith","judy","julia","julian","julie","julio","june","justin","kara","karen","kari","karl","karla","kate","katherine","kathleen","kathryn","kathy","katie","katrina","kay","kayla","keith","kelley","kelli","kellie","kelly","kelly","ken","kendra","kenneth","kent","kerry","kevin","kim","kimberly","kirk","krista","kristen","kristi","kristie","kristin","kristina","kristine","kristy","krystal","kurt","kyle","lana","lance","larry","latoya","laura","lauren","laurie","laverne","lawrence","leah","lee","lee","leigh","lela","lena","leo","leon","leona","leonard","leroy","leslie","leslie","lester","leticia","lewis","lila","lillian","lillie","linda","lindsay","lindsey","lisa","lloyd","lois","lola","lonnie","lora","lorena","lorene","loretta","lori","lorraine","louis","louise","lucia","lucille","lucy","luis","lula","luz","lydia","lynda","lynette","lynn","lynne","mabel","mable","madeline","mae","maggie","mamie","mandy","manuel","marc","marcella","marcia","marcus","margaret","margarita","margie","marguerite","maria","marian","marianne","marie","marilyn","mario","marion","marion","marjorie","mark","marlene","marsha","marshall","marta","martha","martin","marvin","mary","maryann","mathew","matthew","mattie","maureen","maurice","max","maxine","may","megan","meghan","melanie","melba","melinda","melissa","melody","melvin","mercedes","meredith","michael","micheal","michele","michelle","miguel","mike","mildred","milton","mindy","minnie","miranda","miriam","misty","mitchell","molly","mona","monica","monique","morris","muriel","myra","myrtle","nadine","nancy","naomi","natalie","natasha","nathan","nathaniel","neil","nellie","nelson","nettie","nicholas","nichole","nicole","nina","nora","norma","norman","olga","olive","olivia","ollie","opal","ora","oscar","pam","pamela","pat","patricia","patrick","patsy","patti","patty","paul","paula","paulette","pauline","pearl","pedro","peggy","penny","perry","peter","philip","phillip","phyllis","priscilla","rachael","rachel","rafael","ralph","ramon","ramona","randall","randy","raquel","raul","ray","raymond","rebecca","regina","reginald","rene","renee","rhonda","ricardo","richard","rick","ricky","rita","robert","roberta","roberto","robin","robyn","rochelle","rodney","roger","roland","ron","ronald","ronnie","rosa","rosalie","rose","rosemarie","rosemary","rosie","ross","roxanne","roy","ruben","ruby","russell","ruth","ryan","sabrina","sadie","sally","salvador","sam","samantha","samuel","sandra","sandy","sara","sarah","scott","sean","sergio","seth","shane","shannon","shari","sharon","shawn","shawna","sheila","shelia","shelley","shelly","sheri","sherri","sherry","sheryl","shirley","sidney","silvia","sonia","sonja","sonya","sophia","sophie","stacey","stacy","stanley","stella","stephanie","stephen","steve","steven","sue","susan","susie","suzanne","sylvia","tabitha","tamara","tami","tammy","tanya","tara","tasha","ted","teresa","teri","terrance","terrence","terri","terry","terry","thelma","theodore","theresa","thomas","tiffany","tim","timothy","tina","todd","tom","tommy","toni","tony","tonya","tracey","traci","tracy","tracy","travis","tricia","troy","tyler","tyrone","valerie","vanessa","velma","vera","verna","vernon","veronica","vicki","vickie","vicky","victor","victoria","vincent","viola","violet","virgil","virginia","vivian","wade","wallace","walter","wanda","warren","wayne","wendy","wesley","whitney","willard","william","willie","willie","wilma","winifred","yolanda","yvette","yvonne","zachary"]));
	this.trainingData.push(new _$Main_TrainingData("Animals","Animals",["aardvark","aardwolf","albatross","alligator","alpaca","anaconda","angelfish","anglerfish","ant","anteater","antelope","antlion","ape","aphid","armadillo","asp","ass","baboon","badger","baldeagle","bandicoot","barnacle","barracuda","basilisk","bass","bat","bear","beaver","bedbug","bee","beetle","bird","bison","blackbird","blackpanther","blackwidow","bluebird","bluejay","bluewhale","boa","boar","bobcat","bonobo","buffalo","butterfly","buzzard","camel","capybara","caribou","carp","cat","caterpillar","catfish","catshark","centipede","chameleon","cheetah","chickadee","chicken","chimpanzee","chinchilla","chipmunk","clam","clownfish","cobra","cockroach","cod","condor","coral","cougar","cow","coyote","crab","crane","cranefly","crayfish","cricket","crocodile","crow","cuckoo","damselfly","deer","dingo","dog","dolphin","donkey","dormouse","dove","dragonfly","duck","dungbeetle","eagle","earthworm","earwig","echidna","eel","egret","elephant","elephantseal","elk","emu","ermine","falcon","ferret","finch","firefly","fish","flamingo","flea","fly","fowl","fox","frog","fruitbat","galliform","gamefowl","gazelle","gecko","gerbil","giantpanda","giantsquid","gibbon","giraffe","goat","goldfish","goose","gopher","gorilla","grasshopper","grizzlybear","groundshark","groundsloth","grouse","guan","guanaco","guineafowl","guineapig","gull","haddock","halibut","hammerheadshark","hamster","hare","hawk","hedgehog","hermitcrab","heron","herring","hippopotamus","hornet","horse","hoverfly","hummingbird","humpbackwhale","hyena","iguana","jackal","jaguar","jay","jellyfish","kangaroo","kingfisher","kiwi","koala","koi","komodo","krill","ladybug","lamprey","lark","leech","lemming","lemur","leopard","limpet","lion","lizard","llama","lobster","locust","loon","louse","lynx","macaw","mackerel","magpie","mammal","manatee","mantaray","marmoset","marmot","meadowlark","meerkat","mink","minnow","mite","mockingbird","mole","mollusk","mongoose","monitor","monkey","moose","mosquito","moth","mouse","mule","narwhal","newt","nightingale","octopus","orangutan","orca","ostrich","otter","owl","ox","panda","panther","parakeet","parrot","partridge","peacock","peafowl","pelican","penguin","perch","peregrine","pheasant","pig","pigeon","pike","piranha","platypus","polarbear","pony","porcupine","porpoise","possum","prairiedog","prawn","prayingmantis","primate","puffin","puma","python","quail","rabbit","raccoon","rat","rattlesnake","raven","redpanda","reindeer","reptile","rhinoceros","roadrunner","rodent","rook","rooster","salamander","salmon","scorpion","seahorse","sealion","seaslug","seasnail","shark","sheep","shrew","shrimp","silkworm","silverfish","skink","skunk","sloth","slug","snail","snake","snipe","sole","sparrow","spermwhale","spider","spidermonkey","squid","squirrel","starfish","stingray","stoat","stork","swallow","swan","swift","swordfish","swordtail","tarantula","termite","thrush","tiger","tigershark","toad","tortoise","toucan","treefrog","trout","tuna","turkey","turtle","tyrannosaurus","vampirebat","viper","vole","vulture","wallaby","walrus","wasp","waterbuffalo","weasel","whale","whitefish","wildcat","wildebeest","wolf","wolverine","wombat","woodpecker","yak","zebra"]));
	this.trainingData.push(new _$Main_TrainingData("Clothing","Clothing",["anorak","bikini","blazer","bloomers","blouse","bra","cape","cardigan","cloak","coat","corset","dress","dungarees","frock","garters","gloves","gown","jacket","jeans","jumper","kilt","kimino","knickers","leggings","leotard","lingerie","longjohns","mackintosh","mittens","negligee","nightgown","nylons","overalls","overcoat","pajamas","pants","petticoat","poncho","raincoat","robe","sari","sarong","scarf","shirt","skirt","skivvy","slacks","socks","stockings","suit","sweater","sweatshirt","tie","trousers","tshirt","tuxedo","underclothes","underpants","undershirt","underwear","uniform","veil","vest","waistcoat"]));
	this.trainingData.push(new _$Main_TrainingData("Colors","Colors",["amaranth","amber","amethyst","apricot","aquamarine","azure","babyblue","beige","black","blue","bluegreen","blush","bronze","brown","burgundy","byzantium","carmine","cerise","cerulean","champagne","chocolate","cobaltblue","coffee","copper","coral","crimson","cyan","desertsand","electricblue","emerald","erin","gold","gray","green","harlequin","indigo","ivory","jade","junglegreen","lavender","lemon","lilac","lime","magenta","magentarose","maroon","mauve","navyblue","ocher","olive","orange","orchid","peach","pear","periwinkle","persianblue","pink","plum","prussianblue","puce","purple","raspberry","red","redviolet","rose","ruby","salmon","sangria","sapphire","scarlet","silver","slategray","springbud","springgreen","tan","taupe","teal","turquoise","violet","viridian","white","yellow"]));
	this.trainingData.push(new _$Main_TrainingData("Countries","Countries",["afghanistan","africa","albania","algeria","andorra","angola","antigua","arabia","argentina","armenia","ascension","australia","austria","bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","bermuda","bolivia","bosnia","botswana","brazil","britain","brunei","bulgaria","burundi","cambodia","cameroon","canada","chad","chile","china","china","colombia","congo","costarica","croatia","cuba","cyprus","cyrenaica","czech","denmark","ecuador","egypt","emirates","eritrea","estonia","ethiopia","falklands","finland","france","gambia","georgia","germany","ghana","greece","greenland","grenada","guam","guatemala","guernsey","guinea","guinea","haiti","hongkong","hungary","iceland","india","indonesia","iran","iraq","ireland","israel","italy","jamaica","japan","jordan","kashmir","kenya","korea","kosovo","kurdistan","kuwait","laos","latvia","lebanon","libya","liechtenstein","lithuania","luxembourg","macau","macedonia","madagascar","malaysia","maldives","mali","malta","mexico","micronesia","monaco","mongolia","morocco","mozambique","nepal","netherlands","nicaragua","niger","nigeria","norway","norway","oman","pakistan","palestine","panama","paraguay","peru","philippines","poland","portugal","romania","ross","russia","rwanda","salvador","saudi","serbia","seychelles","singapore","slovakia","slovenia","somalia","spain","sudan","sudan","svalbard","sweden","switzerland","syria","taiwan","taiwan","thailand","timor","tobago","trinidad","tunisia","turkey","turkmenistan","uganda","ukraine","unitedkingdom","uruguay","uzbekistan","vanuatu","vatican","venezuela","vietnam","yemen","zealand","zimbabwe"]));
	this.trainingData.push(new _$Main_TrainingData("English Towns","English Towns",["abingdon","accrington","acle","acton","adlington","alcester","aldeburgh","aldershot","alford","alfreton","alnwick","alsager","alston","alton","altrincham","amble","ambleside","amersham","amesbury","ampthill","andover","appleby","arlesey","arundel","ashbourne","ashburton","ashby","ashford","ashington","ashton","askern","aspatria","atherstone","attleborough","axbridge","axminster","aylesbury","aylsham","bacup","bakewell","bampton","banbury","barking","barnard","barnes","barnet","barnoldswick","barnsley","barnstaple","barrow","barton","basildon","basingstoke","batley","battle","bawtry","beaconsfield","beaminster","bebington","beccles","beckenham","bedale","bedford","bedworth","belper","bentham","berkeley","berkhamsted","berwick","beverley","bewdley","bexhill","bexley","bicester","biddulph","bideford","biggleswade","billericay","billingham","bilston","bingham","bingley","birchwood","birkenhead","bishop","blackburn","blackpool","blackrod","blackwater","blandford","bletchley","blyth","bodmin","bognor","bollington","bolsover","bolton","bootle","bordon","boroughbridge","boston","bottesford","bourne","bournemouth","bovey","brackley","bracknell","bradford","brading","bradley","bradninch","braintree","brampton","brandon","braunstone","brentford","brentwood","bridgnorth","bridgwater","bridlington","bridport","brierfield","brierley","brigg","brighouse","brightlingsea","brixham","broadstairs","bromborough","bromley","bromsgrove","bromyard","broseley","brough","broughton","bruton","buckfastleigh","buckingham","bude","budleigh","bulwell","bungay","buntingford","burford","burgess","burgh","burnham","burnley","burntwood","burslem","burton","burton","bury","bury","bushey","buxton","caistor","callington","calne","camborne","camelford","cannock","canvey","carlton","carnforth","carshalton","carterton","castle","castleford","chagford","chapel","chard","charlbury","chatham","chatteris","cheadle","cheltenham","chertsey","chesham","cheshunt","chester","chesterfield","chickerell","chilton","chingford","chippenham","chipping","chipping","chipping","chorley","chorleywood","christchurch","chudleigh","chulmleigh","church","cinderford","cirencester","clare","clay","cleator","cleethorpes","cleobury","clevedon","clitheroe","clun","cockermouth","coggeshall","colburn","colchester","coleford","coleshill","colne","colyton","congleton","conisbrough","corbridge","corby","corringham","corsham","cotgrave","coulsdon","cowes","cramlington","cranbrook","craven","crawley","crediton","crewe","crewkerne","cricklade","cromer","crook","crosby","crowborough","crowland","crowle","croydon","cullompton","dagenham","dalton","darley","darlington","dartford","dartmouth","darwen","daventry","dawley","dawlish","deal","denholme","dereham","desborough","devizes","dewsbury","didcot","dinnington","diss","doncaster","dorchester","dorking","dover","dovercourt","downham","driffield","droitwich","dronfield","dudley","dukinfield","dulverton","dunstable","dunwich","dursley","ealing","earby","earl","earley","easingwold","east","east","east","east","eastbourne","eastleigh","eastwood","eccles","eccleshall","edenbridge","edgware","edmonton","egremont","elland","ellesmere","ellesmere","elstree","emsworth","enfield","epping","epworth","erith","eton","evesham","exmouth","eye","fairford","fakenham","falmouth","fareham","faringdon","farnham","faversham","fazeley","featherstone","felixstowe","ferndown","ferryhill","filey","filton","finchley","fleet","fleetwood","flitwick","folkestone","fordbridge","fordingbridge","fordwich","fowey","framlingham","frinton","frodsham","frome","gainsborough","garstang","gateshead","gillingham","gillingham","glastonbury","glossop","godalming","godmanchester","goole","gorleston","gosport","grange","grantham","grassington","gravesend","grays","great","great","great","greater","grimsby","guildford","guisborough","hadleigh","hailsham","halesowen","halesworth","halewood","halifax","halstead","haltwhistle","harlow","harpenden","harrogate","harrow","hartland","hartlepool","harwich","harworth","haslemere","haslingden","hastings","hatfield","hatfield","hatherleigh","havant","haverhill","hawes","hawkinge","haxby","hayle","haywards","heanor","heathfield","hebden","hedge","hednesford","hedon","helmsley","helston","hemel","hemsworth","hendon","henley","hertford","hessle","hetton","hexham","heywood","high","higham","highbridge","highworth","hinckley","hingham","hitchin","hoddesdon","holbeach","holsworthy","holt","honiton","horley","horncastle","hornsea","hornsey","horsforth","horsham","horwich","houghton","hounslow","howden","huddersfield","hungerford","hunstanton","huntingdon","hyde","hythe","ilford","ilfracombe","ilkeston","ilkley","ilminster","immingham","ingleby","ipswich","irthlingborough","ivybridge","jarrow","keighley","kempston","kendal","kenilworth","kesgrave","keswick","kettering","keynsham","kidderminster","kidsgrove","kimberley","kingsbridge","kingsteignton","kingston","kington","kirkby","kirkbymoorside","kirkham","kirton","knaresborough","knutsford","langport","launceston","leatherhead","lechlade","ledbury","leek","leigh","leighton","leiston","leominster","letchworth","lewes","leyburn","leyton","liskeard","littlehampton","loddon","loftus","long","longridge","longtown","looe","lostwithiel","loughborough","loughton","louth","lowestoft","ludgershall","ludlow","luton","lutterworth","lydd","lydney","lyme","lymington","lynton","lytchett","lytham","mablethorpe","macclesfield","madeley","maghull","maidenhead","maidstone","maldon","malmesbury","maltby","malton","malvern","manningtree","mansfield","marazion","march","margate","marlborough","marlow","maryport","masham","matlock","medlar","melksham","meltham","melton","mere","mexborough","middleham","middlesbrough","middleton","middlewich","midhurst","midsomer","mildenhall","millom","milton","minchinhampton","minehead","minster","mirfield","mitcham","mitcheldean","modbury","morecambe","moreton","moretonhampstead","morley","morpeth","mossley","much","nailsea","nailsworth","nantwich","needham","nelson","neston","newark","newbiggin","newbury","newcastle","newent","newhaven","newlyn","newmarket","newport","newquay","newton","normanton","north","northallerton","northam","northampton","northfleet","northleach","northwich","norton","nuneaton","oakengates","oakham","okehampton","oldbury","oldham","ollerton","olney","ongar","orford","ormskirk","ossett","oswestry","otley","ottery","oundle","paddock","padiham","padstow","paignton","painswick","partington","patchway","pateley","peacehaven","penistone","penkridge","penrith","penryn","penwortham","penzance","pershore","peterlee","petersfield","petworth","pickering","plympton","pocklington","polegate","pontefract","ponteland","poole","porthleven","portishead","portland","potton","poynton","preesall","prescot","princes","prudhoe","pudsey","queenborough","radstock","ramsey","ramsgate","raunds","rawtenstall","rayleigh","reading","redcar","redditch","redenhall","redruth","reepham","reigate","richmond","richmond","ringwood","ripley","rochdale","rochester","rochford","romford","romsey","ross","rothbury","rotherham","rothwell","rowley","royal","royston","rugby","rugeley","rushden","ryde","rye","saffron","salcombe","sale","saltash","sandbach","sandhurst","sandiacre","sandown","sandwich","sandy","sawbridgeworth","saxmundham","scarborough","scunthorpe","seaford","seaham","seaton","sedbergh","sedgefield","selby","selsey","settle","sevenoaks","shaftesbury","shanklin","shefford","shepshed","shepton","sherborne","sheringham","shifnal","shildon","shipston","shirebrook","shoreham","shrewsbury","sidmouth","silloth","silsden","sittingbourne","skegness","skelmersdale","skelton","skipton","sleaford","slough","smethwick","snaith","snodland","soham","solihull","somerton","southall","southam","southborough","southend","southgate","southminster","southport","southsea","southwell","southwick","southwold","spalding","spennymoor","spilsby","sprowston","stafford","staines","stainforth","stalbridge","stalham","stalybridge","stamford","stanhope","stanley","stapleford","staveley","stevenage","steyning","stockport","stocksbridge","stockton","stone","stonehouse","stony","stotfold","stourbridge","stourport","stow","stowmarket","stratford","stretford","strood","stroud","sturminster","sudbury","surbiton","sutton","sutton","swaffham","swanage","swanley","swanscombe","swindon","syston","tadcaster","tadley","tamworth","taunton","tavistock","teignmouth","telford","telscombe","tenbury","tenterden","tetbury","tewkesbury","thame","thatcham","thaxted","thetford","thirsk","thornaby","thornbury","thorne","thorpe","thrapston","tickhill","tidworth","tipton","tisbury","tiverton","todmorden","tonbridge","topsham","torpoint","torquay","totnes","tottenham","totton","tow","towcester","town","tring","trowbridge","twickenham","tynemouth","uckfield","ulverston","uppingham","upton","uttoxeter","uxbridge","ventnor","verwood","wadebridge","wadhurst","wainfleet","wallasey","wallingford","wallsend","walsall","waltham","waltham","walthamstow","walton","wantage","ware","wareham","warminster","warrington","warwick","washington","watchet","watford","wath","watlington","watton","wednesbury","wellingborough","wellington","wells","welwyn","wembley","wendover","westbury","westerham","westhoughton","weston","wetherby","weybridge","weymouth","whaley","whitby","whitchurch","whitehaven","whitehill","whitnash","whittlesey","whitworth","wickham","wickwar","widnes","wigan","wigton","willenhall","willesden","wilmslow","wilton","wimbledon","wimborne","wincanton","winchcombe","winchelsea","windermere","windsor","winsford","winslow","winterton","wirksworth","wisbech","witham","withernsea","witney","wiveliscombe","wivenhoe","woburn","woburn","woking","wokingham","wolsingham","wolverton","wood","woodbridge","woodley","woodstock","wooler","workington","worksop","worthing","wotton","wragby","wymondham","yarm","yarmouth","yate","yateley","yeovil"]));
	this.trainingData.push(new _$Main_TrainingData("Fish","Fish",["albacore","albacore","alewife","alfonsino","algaeeater","alligator","alligatorfish","amberjack","anchovy","anchovy","anemonefish","angelfish","angler","anglerfish","arapaima","archerfish","armorhead","arowana","arrowtooth","aruana","ayu","baikal","bala","ballan","bandfish","bangus","banjo","barb","barbel","barfish","barracuda","barracuda","barracudina","barramundi","barreleye","baskingshark","bass","basslet","basslet","batfish","batfish","batray","beachsalmon","beardfish","betta","bichir","bigeye","bigscale","billfish","bitterling","blackchin","blackfish","blackfish","bleak","blenny","blenny","blobfish","blowfish","blueeye","bluefin","bluefish","bluegill","boafish","boarfish","bocaccio","boga","bonefish","bonito","bonnetmouth","bonytongue","bowfin","boxfish","bream","bream","brill","bristlemouth","bristlenose","brooder","brotula","brotula","buffalo","buffalofish","bullhead","bullheadshark","bullshark","bulltrout","burbot","buri","burmadanio","burrfish","butterflyfish","butterflyray","candiru","candlefish","capelin","cardinalfish","cardinalfish","cardinaltetra","carp","carp","carp","carpetshark","carpetshark","carpsucker","catalufa","catalufa","catfish","catfish","catla","catshark","cavefish","channelbass","channelcatfish","char","char","cherrysalmon","cherubfish","chimaera","chimaera","chinooksalmon","chub","chub","chubsucker","chumsalmon","cichlid","cichlid","cisco","clingfish","clingfish","clownfish","cobbler","cobia","cod","cod","codlet","codlet","codling","coelacanth","coffinfish","cohosalmon","coley","combfish","conger","cookiecutter","coolieloach","cornetfish","corydoras","cowfish","cownose","cowshark","crappie","crestfish","croaker","crocodileshark","cuckoowrasse","cusk","cuskeel","cutlassfish","cutthroateel","cutthroattrout","dab","dace","dace","daggertooth","daggertooth","damselfish","danio","danio","danio","darter","darter","darter","dartfish","dealfish","demoiselle","devario","devilray","dhufish","discus","diver","dogfish","dogfish","dogteeth","dolphinfish","dorab","dorado","dory","dory","dottyback","dragonet","dragonfish","dragonfish","dragongoby","driftfish","drum","duckbill","duskygrouper","eagleray","eel","eelgoby","eelpout","eeltailcatfish","elasmobranch","electriceel","elephantnose","elephantnose","elver","emperor","escolar","escolar","eulachon","fangtooth","featherback","fierasfer","filefish","fingerfish","firefish","flagblenny","flagfin","flagfish","flagtail","flashlightfish","flatfish","flathead","flathead","flier","flounder","flounder","flyingfish","flyingfish","footballfish","fringehead","frogfish","fusilier","galjoen","gangesshark","gar","garibaldi","garpike","ghostfish","ghostflathead","ghostknifefish","ghostpipefish","ghostshark","ghoul","gibberfish","glassfish","glassfish","goatfish","goatfish","goby","goby","goldentrout","goldeye","goldfish","gombessa","goosefish","gourami","gourami","gourami","graveldiver","grayling","grayling","greeneye","greenling","grenadier","groundshark","grouper","grunion","grunt","grunter","gruntsculpin","gudgeon","guitarfish","gulper","gulper","gunnel","gunnel","guppy","gurnard","gurnard","gurnard","haddock","hagfish","hairtail","hake","hake","halfbeak","halfmoon","halibut","halibut","halosaur","hamlet","hammerhead","hammerjaw","handfish","hardhead","harelip","hatchetfish","hatchetfish","hawkfish","herring","herring","hogsucker","hoki","hornshark","horsefish","horsemackerel","houndshark","houndshark","huchen","hussar","icefish","icefish","ide","ilisha","inanga","inconnu","jack","jackfish","javelin","jawfish","jellynose","jewel","jewelfish","jewfish","johndory","kafue","kahawai","kaluga","kanyu","kelpfish","kelpfish","kelpperch","killifish","killifish","kingfish","kingofthesalmon","knifefish","knifefish","knifejaw","koi","kokanee","kokopu","labyrinthfish","ladyfish","lagena","lampfish","lampfish","lamprey","lamprey","lancetfish","lanternfish","lanternshark","largemouth","leaffish","leatherjacket","lefteyeflounder","lemonshark","lemonsole","lenok","leopard","lightfish","limia","linedsole","ling","lingcod","lionfish","lionfish","livebearer","lizardfish","loach","longfin","loosejaw","louvar","luderick","lumpsucker","lungfish","lungfish","mackerel","mackerel","mackerelshark","madtom","mahseer","makoshark","manefish","manofwar","mantaray","marblefish","marlin","masu","medaka","medusafish","megamouthshark","menhaden","menhaden","milkfish","minnow","minnow","minnowofthedeep","modocsucker","mojarra","mola","mola","monkfish","mooneye","moonfish","mora","moray","moray","morid","morwong","mosquitofish","mouthbrooder","mrigal","mudcat","mudfish","mudminnow","mudminnow","mudminnow","mudskipper","mudsucker","mudsucker","mullet","mullet","mummichog","murraycod","muskellunge","mustardeel","nase","needlefish","nibblefish","noodlefish","noodlefish","nurseryfish","nurseshark","oarfish","oilfish","oilfish","oldwife","opah","opaleye","oscar","paddlefish","panga","paradisefish","parore","parrotfish","parrotfish","peacockflounder","peamouth","pearleye","pearlfish","pelicaneel","pencilfish","pencilsmelt","perch","pickerel","pickerel","pigfish","pike","pikeblenny","pikeconger","pikeperch","pilchard","pilotfish","pineapplefish","pineconefish","pinksalmon","pipefish","piranha","pirarucu","pirateperch","plaice","platy","platyfish","pleco","plownose","poacher","pollock","pollock","pollyfish","pomfret","pomfret","pompano","ponyfish","porbeagle","porcupinefish","porgy","powen","prickleback","prickleback","pricklefish","pricklyshark","prowfish","prowfish","puffer","puffer","pufferfish","pumpkinseed","pupfish","pupfish","píntano","quillback","quillfish","rabbitfish","ragfish","rainbowfish","rainbowfish","rainbowtrout","rasbora","ratfish","rattail","ray","razorfish","redfin","redfish","redlip","redmouth","redsalmon","redsnapper","reedfish","reefshark","reefshark","remora","requiemshark","ribboneel","ribbonfish","riceeel","ricefish","ridgehead","rivuline","rivuline","roach","roanokebass","rockbass","rockbeauty","rockcod","rockfish","rockfish","rockfish","rockling","rohu","ronquil","roosterfish","ropefish","roughscad","roughsculpin","roughy","roughy","roundhead","rudd","rudderfish","ruffe","sabertooth","sabertoothfish","sablefish","sailfish","salamanderfish","salmon","salmon","salmonshark","sandbarshark","sandburrower","sanddab","sanddiver","sandeel","sandfish","sandgoby","sandknifefish","sandlance","sandperch","sandroller","sandstargazer","sandtiger","sandtilefish","sardine","sargassumfish","sauger","saury","saury","sawfish","sawshark","scabbardfish","scabbardfish","scalyfin","scat","scissortail","scorpionfish","sculpin","sculpin","sculpin","scup","seabass","seabream","seacatfish","seachub","seadevil","seadragon","seahorse","sealamprey","seamoth","searaven","searobin","searobin","searobin","seasnail","seatoad","shad","shad","shark","sharksucker","sharpnose","sheatfish","sheepshead","sheepshead","shiner","shiner","shrimpfish","siamesefightingfish","sillago","silverside","silverside","sixgillray","sixgillshark","skate","skilfish","skipjacktuna","sleeper","sleepershark","slickhead","slimehead","slipmouth","smelt","smelt","smeltwhiting","snailfish","snakeeel","snakehead","snapper","snapper","snipeeel","snipeeel","snipeeel","snipefish","snoek","snook","snubnose","soldierfish","sole","spadefish","spaghettieel","spearfish","speckledtrout","spiderfish","spikefish","spinefoot","spinyfin","splitfin","spookfish","sprat","springfish","squaretail","squaretail","squaretail","squawfish","squawfish","squawfish","squeaker","squirrelfish","stargazer","stargazer","steelhead","stickleback","stickleback","stingfish","stingray","stingray","stonecat","stonefish","stoneroller","sturgeon","sturgeon","sturgeon","sucker","sunfish","sunfish","sunfish","surfperch","surgeonfish","swallower","swallower","swampeel","swampfish","sweeper","swordfish","swordtail","swordtail","sábalo","tadpolefish","tailor","taimen","tang","tang","tapetail","tarpon","tarwhine","telescopefish","tench","tenpounder","tenuis","tetra","tetra","thornfish","threadfin","threadtail","thresher","tigerbarb","tigerperch","tigershark","tilapia","tilefish","toadfish","tommyruff","tompot","tonguefish","tope","topminnow","torpedo","trahira","treefish","trevally","trevally","triggerfish","triggerfish","triplefin","triplespine","tripletail","trout","troutperch","trumpeter","trumpetfish","trunkfish","tubeblenny","tubeeye","tubeshoulder","tubesnout","tuna","tunny","turbot","turkeyfish","uaru","unicornfish","unicornfish","vanjaram","velvetfish","velvetfish","vendace","vimba","viperfish","viperfish","wahoo","wallago","walleye","walu","warmouth","wartyangler","waryfish","waspfish","weaselshark","weatherfish","weaver","weever","weeverfish","whalefish","whalefish","whalefish","whaleshark","whiff","whitebait","whitecroaker","whitefish","whitefish","whitemarlin","whiteshark","whiteshark","whitetip","whitetipshark","whiting","whiting","wobbegong","wolfeel","wolffish","wolfherring","wormeel","wormfish","wrasse","wrasse","wrymouth","yellowbass","yellowhead","yellowjack","yellowmargin","yellowtail","zander","zebrafish","zebraloach","zebrashark","ziege","zingel"]));
	this.trainingData.push(new _$Main_TrainingData("French Forenames","French Forenames",["adrien","agnès","alain","albert","alexandra","alexandre","alexis","alice","aline","amandine","amélie","andré","andrée","angélique","anne","annemarie","annick","annie","antoine","arlette","arnaud","arthur","audrey","aurore","aurélie","aurélien","baptiste","benjamin","benoît","bernadette","bernard","bertrand","brigitte","bruno","béatrice","camille","carole","caroline","catherine","chantal","charles","chloé","christelle","christian","christiane","christine","christophe","claire","clara","claude","claudine","clémence","clément","colette","coralie","corinne","cyril","cécile","cédric","céline","damien","daniel","danielle","danièle","david","delphine","denis","denise","didier","dominique","dominique","dylan","emma","emmanuel","emmanuelle","enzo","estelle","fabien","fabienne","fabrice","fanny","florence","florent","florian","francine","francis","franck","françois","françoise","frédéric","gabriel","gaétan","gaëlle","geneviève","georges","georgette","germaine","ghislaine","gilbert","gilles","ginette","gisèle","grégory","guillaume","guy","gérard","henri","henriette","hervé","hugo","huguette","hélène","inès","irène","isabelle","jacqueline","jacques","janine","jean","jeanclaude","jeanfrançois","jeanlouis","jeanluc","jeanmarc","jeanmarie","jeanmichel","jeanne","jeannine","jeanpaul","jeanpierre","jennifer","jessica","jocelyne","jonathan","joseph","josette","josé","joël","joëlle","julie","julien","juliette","justine","jérôme","karine","kevin","laetitia","laura","laure","laurence","laurent","liliane","lionel","louis","louise","loïc","luc","lucas","lucie","lucien","lucienne","ludovic","lydie","léa","madeleine","magali","manon","marc","marcel","marcelle","marguerite","maria","marie","mariechristine","marieclaude","mariethérèse","marine","marion","martine","mathieu","mathilde","matthieu","maurice","maxime","michaël","michel","micheline","michelle","michèle","mickaël","mireille","mohamed","monique","morgane","muriel","myriam","mélanie","mélissa","nadia","nadine","nathalie","nicolas","nicole","noémie","océane","odette","odile","olivier","pascal","pascale","patrice","patricia","patrick","paul","paulette","pauline","philippe","pierre","pierrette","quentin","raphaël","raymond","raymonde","rené","renée","richard","robert","roger","roland","romain","régine","régis","rémi","rémy","sabine","sabrina","samuel","sandra","sandrine","sarah","serge","simon","simone","solange","sonia","sophie","stéphane","stéphanie","suzanne","sylvain","sylvie","sébastien","séverine","thierry","thomas","théo","thérèse","valentin","valérie","vanessa","victor","vincent","virginie","véronique","william","xavier","yann","yannick","yves","yvette","yvonne","éliane","élisabeth","élise","élodie","émilie","éric","étienne","évelyne"]));
	this.trainingData.push(new _$Main_TrainingData("Fruit","Fruit",["acai","apple","avocado","banana","beachplum","bilberry","blackapple","blackberry","blackcherry","blackraspberry","blackwalnut","bloodorange","blueberry","breadfruit","breadnut","bushtomato","canarymelon","cantaloupe","carob","cherry","chestnut","chokeberry","clementine","coconut","cocoplum","coffee","colanut","crabapple","cranberry","cucumber","date","dateplum","dragonfruit","elderberry","elderberry","fig","gooseberry","grape","grapefruit","guava","hogplum","honeydew","huckleberry","juniperberry","keylime","kiwifruit","ladyapple","lemon","lime","lingonberry","loquat","lychee","mandarin","mango","mango","mangosteen","marula","miraclefruit","mulberry","muskmelon","nutmeg","olive","orange","papaya","passionfruit","pawpaw","peach","peanut","pear","pecan","persimmon","pineapple","pitaya","pomegranate","prickypear","pumpkin","quince","raisintree","redmulberry","roseapple","rosehip","satsuma","seagrape","snowberry","starfruit","sugarapple","tamarind","tangerine","watermelon"]));
	this.trainingData.push(new _$Main_TrainingData("German Towns","German Towns",["aach","aachen","aalen","abenberg","abensberg","achern","achim","adelsheim","adenau","adorf","ahaus","ahlen","ahrensburg","aichach","aichtal","aken","albstadt","alfeld","allendorf","allstedt","alpirsbach","alsdorf","alsfeld","alsleben","altdorf","altena","altenberg","altenburg","altenkirchen","altensteig","altentreptow","altlandsberg","altötting","alzenau","alzey","amberg","amorbach","amöneburg","andernach","angermünde","anklam","annaberg","annaburg","annweiler","ansbach","apolda","arendsee","arneburg","arnis","arnsberg","arnstadt","arnstein","arnstein","artern","arzberg","aschaffenburg","aschersleben","asperg","attendorn","aub","aue","auerbach","auerbach","augsburg","augustusburg","aulendorf","auma","aurich","aßlar","babenhausen","bacharach","backnang","baden","baesweiler","baiersdorf","balingen","ballenstedt","balve","bamberg","barby","bargteheide","barmstedt","barntrup","barsinghausen","barth","baruth","bassum","battenberg","baumholder","baunach","baunatal","bautzen","bayreuth","bebra","beckum","bedburg","beelitz","beerfelden","beeskow","beilngries","beilstein","belgern","bendorf","bensheim","berching","berga","bergen","bergen","bergheim","bergisch","bergkamen","bergneustadt","berka","berlin","bernau","bernburg","bernkastel","bernsdorf","bernstadt","bersenbrück","besigheim","betzdorf","betzenstein","beverungen","bexbach","biberach","biedenkopf","bielefeld","biesenthal","bietigheim","billerbeck","bingen","birkenfeld","bischofsheim","bischofswerda","bismark","bitburg","bitterfeld","blankenburg","blankenhain","blaubeuren","blaustein","bleckede","bleicherode","blieskastel","blomberg","blumberg","bobingen","bocholt","bochum","bockenem","bodenwerder","bogen","boizenburg","bonn","bonndorf","bopfingen","boppard","borgentreich","borgholzhausen","borken","borken","borkum","borna","bornheim","bottrop","boxberg","brackenheim","brake","brakel","bramsche","brand","brandenburg","brandis","braubach","braunfels","braunlage","braunsbedra","braunschweig","breckerfeld","bredstedt","breisach","bremen","bremerhaven","bremervörde","bretten","breuberg","brilon","brotterode","bruchköbel","bruchsal","brunsbüttel","bräunlingen","brück","brüel","brühl","brüssow","buchen","buchholz","buchloe","buckow","burg","burg","burgau","burgbernheim","burgdorf","burghausen","burgkunstadt","burglengenfeld","burgstädt","burgwedel","burladingen","burscheid","buttelstedt","buttstädt","butzbach","buxtehude","bärnau","böblingen","böhlen","bönnigheim","bückeburg","büdelsdorf","büdingen","bühl","bünde","büren","bürgel","bürstadt","bützow","calau","calbe","calw","castrop","celle","cham","chemnitz","clausthal","clingen","cloppenburg","coburg","cochem","coesfeld","colditz","cologne","coswig","coswig","cottbus","crailsheim","creglingen","creuzburg","creußen","crimmitschau","crivitz","cuxhaven","dachau","dahlen","dahme","dahn","damme","dannenberg","dargun","darmstadt","dassel","dassow","datteln","daun","deggendorf","deidesheim","delbrück","delitzsch","delmenhorst","demmin","dessau","detmold","dettelbach","dieburg","diemelstadt","diepholz","dierdorf","dietenheim","dietfurt","dietzenbach","diez","dillenburg","dillingen","dillingen","dingelstädt","dingolfing","dinkelsbühl","dinklage","dinslaken","dippoldiswalde","dissen","ditzingen","doberlug","dohna","dommitzsch","donaueschingen","donauwörth","donzdorf","dorfen","dormagen","dornburg","dornhan","dornstetten","dorsten","dortmund","dransfeld","drebkau","dreieich","drensteinfurt","dresden","drolshagen","duderstadt","duisburg","döbeln","döbern","dömitz","dülmen","düren","düsseldorf","ebeleben","eberbach","ebermannstadt","ebern","ebersbach","ebersbach","ebersberg","eberswalde","eckartsberga","eckernförde","edenkoben","egeln","eggenfelden","eggesin","ehingen","ehrenfriedersdorf","eibelstadt","eibenstock","eichstätt","eilenburg","einbeck","eisenach","eisenberg","eisenberg","eisenhüttenstadt","eisfeld","eisleben","eislingen","ellingen","ellrich","ellwangen","elmshorn","elsdorf","elsfleth","elsterberg","elsterwerda","elstra","elterlein","eltmann","eltville","elzach","elze","emden","emmelshausen","emmendingen","emmerich","emsdetten","endingen","engen","enger","ennepetal","ennigerloh","eppelheim","eppingen","eppstein","erbach","erbach","erbendorf","erding","erftstadt","erfurt","erkelenz","erkner","erkrath","erlangen","erlenbach","erlensee","erwitte","eschborn","eschenbach","eschershausen","eschwege","eschweiler","esens","espelkamp","essen","esslingen","ettenheim","ettlingen","euskirchen","eutin","falkenberg","falkensee","falkenstein","falkenstein","fehmarn","fellbach","felsberg","feuchtwangen","filderstadt","finsterwalde","fladungen","flensburg","florstadt","flöha","flörsheim","forchheim","forchtenberg","forst","frankenau","frankenberg","frankenberg","frankenthal","frankfurt","frankfurt","franzburg","frauenstein","frechen","freiberg","freiberg","freiburg","freilassing","freinsheim","freising","freital","freren","freudenberg","freudenberg","freudenstadt","freyburg","freystadt","freyung","fridingen","friedberg","friedberg","friedland","friedland","friedrichroda","friedrichsdorf","friedrichshafen","friedrichstadt","friedrichsthal","friesack","friesoythe","fritzlar","frohburg","fröndenberg","fulda","furth","furtwangen","fürstenau","fürstenberg","fürstenfeldbruck","fürstenwalde","fürth","füssen","gadebusch","gaggenau","gaildorf","gammertingen","garbsen","garching","gardelegen","garding","gartz","garz","gau","gebesee","gedern","geesthacht","geestland","gefell","gefrees","gehrden","gehren","geilenkirchen","geisa","geiselhöring","geisenfeld","geisenheim","geisingen","geislingen","geislingen","geithain","geldern","gelnhausen","gelsenkirchen","gemünden","gemünden","gengenbach","genthin","georgsmarienhütte","gera","gerabronn","gerbstedt","geretsried","geringswalde","gerlingen","germering","germersheim","gernsbach","gernsheim","gerolstein","gerolzhofen","gersfeld","gersthofen","gescher","geseke","gevelsberg","geyer","giengen","gießen","gifhorn","ginsheim","gladbeck","gladenbach","glashütte","glauchau","glinde","glücksburg","glückstadt","gnoien","goch","goldberg","goldkronach","golßen","gommern","goslar","gotha","grabow","grafenau","grafenwöhr","grafing","gransee","grebenau","grebenstein","greding","greifswald","greiz","greußen","greven","grevenbroich","grevesmühlen","griesheim","grimma","grimmen","groitzsch","gronau","gronau","groß","groß","groß","großalmerode","großbottwar","großbreitenbach","großenehrich","großenhain","großräschen","großröhrsdorf","großschirma","gräfenberg","gräfenhainichen","gräfenthal","gröditz","gröningen","grünberg","grünhain","grünsfeld","grünstadt","guben","gudensberg","gummersbach","gundelfingen","gundelsheim","gunzenhausen","göppingen","görlitz","göttingen","gößnitz","güglingen","günzburg","güsten","güstrow","gütersloh","gützkow","haan","hachenburg","hadamar","hagen","hagenbach","hagenow","haiger","haigerloch","hainichen","haiterbach","halberstadt","haldensleben","halle","halle","hallenberg","hallstadt","haltern","halver","hamburg","hameln","hamm","hammelburg","hamminkeln","hanau","hanover","harburg","hardegsen","haren","harsewinkel","hartenstein","hartha","harzgerode","haselünne","haslach","hattersheim","hattingen","hatzfeld","hausach","hauzenberg","havelberg","havelsee","hayingen","haßfurt","hechingen","hecklingen","heide","heideck","heidelberg","heidenau","heidenheim","heilbad","heilbronn","heiligenhafen","heiligenhaus","heilsbronn","heimbach","heimsheim","heinsberg","heitersheim","heldrungen","helmbrechts","helmstedt","hemau","hemer","hemmingen","hemmoor","hemsbach","hennef","hennigsdorf","heppenheim","herbolzheim","herborn","herbrechtingen","herbstein","herdecke","herdorf","herford","heringen","heringen","hermeskeil","hermsdorf","herne","herrenberg","herrieden","herrnhut","hersbruck","herten","herzberg","herzberg","herzogenaurach","herzogenrath","hessisch","hessisch","hettingen","hettstedt","heubach","heusenstamm","hilchenbach","hildburghausen","hilden","hildesheim","hillesheim","hilpoltstein","hirschau","hirschberg","hirschhorn","hitzacker","hochheim","hockenheim","hof","hofgeismar","hofheim","hofheim","hohen","hohenberg","hohenleuben","hohenmölsen","hohenstein","hohnstein","hollfeld","holzgerlingen","holzminden","homberg","homberg","homburg","horb","horn","hornbach","hornberg","horstmar","hoya","hoyerswerda","hungen","husum","höchstadt","höchstädt","höhr","hörstel","höxter","hückelhoven","hückeswagen","hüfingen","hünfeld","hürth","ibbenbüren","ichenhausen","idar","idstein","illertissen","ilmenau","ilsenburg","ilshofen","immenhausen","immenstadt","ingelfingen","ingelheim","ingolstadt","iphofen","iserlohn","isny","isselburg","itzehoe","jarmen","jena","jerichow","jessen","jever","joachimsthal","johanngeorgenstadt","jöhstadt","jülich","jüterbog","kaarst","kahla","kaisersesch","kaiserslautern","kalbe","kalkar","kaltenkirchen","kaltennordheim","kamen","kamenz","kamp","kandel","kandern","kappeln","karben","karlsruhe","karlstadt","kassel","kastellaun","katzenelnbogen","kaub","kaufbeuren","kehl","kelbra","kelheim","kelkheim","kellinghusen","kelsterbach","kemberg","kemnath","kempen","kempten","kenzingen","kerpen","ketzin","kevelaer","kiel","kierspe","kindelbrück","kirchberg","kirchberg","kirchberg","kirchen","kirchenlamitz","kirchhain","kirchheim","kirchheimbolanden","kirn","kirtorf","kitzingen","kitzscher","kleve","klingenberg","klingenthal","klötze","klütz","knittlingen","koblenz","kohren","kolbermoor","konstanz","konz","korbach","korntal","kornwestheim","korschenbroich","kraichtal","krakow","kranichfeld","krautheim","krefeld","kremmen","krempe","kreuztal","kronach","kronberg","kroppenstedt","krumbach","kröpelin","kulmbach","kupferberg","kuppenheim","kusel","kyllburg","kyritz","kölleda","königs","königsberg","königsbrunn","königsbrück","königsee","königslutter","königstein","königstein","königswinter","könnern","köthen","kühlungsborn","külsheim","künzelsau","laage","laatzen","ladenburg","lage","lahnstein","lahr","laichingen","lambrecht","lampertheim","landau","landau","landsberg","landsberg","landshut","landstuhl","langelsheim","langen","langenau","langenburg","langenfeld","langenhagen","langenselbold","langenzenn","langewiesen","lassan","laubach","laucha","lauchhammer","lauchheim","lauda","lauenburg","lauf","laufen","laufenburg","lauffen","lauingen","laupheim","lauscha","lauta","lauter","lauterbach","lauterecken","lauterstein","lebach","lebus","leer","lehesten","lehrte","leichlingen","leimen","leinefelde","leinfelden","leipheim","leipzig","leisnig","lemgo","lengenfeld","lengerich","lennestadt","lenzen","leonberg","leun","leuna","leutenberg","leutershausen","leutkirch","leverkusen","lich","lichtenau","lichtenau","lichtenberg","lichtenfels","lichtenfels","lichtenstein","liebenau","liebenwalde","lieberose","liebstadt","limbach","limburg","lindau","linden","lindenberg","lindenfels","lindow","lingen","linnich","linz","lippstadt","lohmar","lohne","lohr","loitz","lollar","lommatzsch","lorch","lorch","lorsch","lucka","luckau","luckenwalde","ludwigsburg","ludwigsfelde","ludwigshafen","ludwigslust","ludwigsstadt","lugau","lunzenau","lychen","löbau","löffingen","löhne","löningen","lörrach","löwenstein","lößnitz","lübbecke","lübben","lübbenau","lübeck","lübtheen","lübz","lüchow","lüdenscheid","lüdinghausen","lügde","lüneburg","lünen","lütjenburg","lützen","magdala","magdeburg","mahlberg","mainbernheim","mainburg","maintal","mainz","malchin","malchow","manderscheid","mannheim","mansfeld","marbach","marburg","marienberg","marienmünster","markdorf","markgröningen","markkleeberg","markneukirchen","markranstädt","marktbreit","marktheidenfeld","marktleuthen","marktoberdorf","marktredwitz","marktsteft","marl","marlow","marne","marsberg","maulbronn","maxhütte","mayen","mechernich","meckenheim","medebach","meerane","meerbusch","meersburg","meinerzhagen","meiningen","meisenheim","meißen","meldorf","melle","mellrichstadt","melsungen","memmingen","menden","mendig","mengen","meppen","merkendorf","merseburg","merzig","meschede","mettmann","metzingen","meuselwitz","meyenburg","meßkirch","meßstetten","michelstadt","miesbach","miltenberg","mindelheim","minden","mirow","mittenwalde","mitterteich","mittweida","moers","monheim","monheim","monschau","montabaur","moosburg","moringen","mosbach","munderkingen","munich","munster","murrhardt","mylau","märkisch","möckern","möckmühl","mölln","mönchengladbach","mörfelden","mössingen","mücheln","mügeln","mühlacker","mühlberg","mühldorf","mühlhausen","mühlheim","mühlheim","mülheim","mülheim","müllheim","müllrose","münchberg","müncheberg","münchenbernsdorf","münnerstadt","münsingen","münster","münstermaifeld","münzenberg","nabburg","nagold","naila","nassau","nastätten","nauen","naumburg","naumburg","naunhof","nebra","neckarbischofsheim","neckargemünd","neckarsteinach","neckarsulm","neresheim","netphen","nettetal","netzschkau","neu","neu","neu","neubrandenburg","neubukow","neubulach","neuburg","neudenau","neuenburg","neuenbürg","neuenhaus","neuenrade","neuenstadt","neuenstein","neuerburg","neuffen","neuhaus","neukalen","neukirchen","neukirchen","neukloster","neumark","neumarkt","neumarkt","neumünster","neunburg","neunkirchen","neuruppin","neusalza","neuss","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustadt","neustrelitz","neusäß","neutraubling","neuwied","neuötting","nidda","niddatal","nidderau","nideggen","niebüll","niedenstein","nieder","niederkassel","niedernhall","niederstetten","niederstotzingen","nieheim","niemegk","nienburg","nienburg","nierstein","niesky","nittenau","norden","nordenham","norderney","norderstedt","nordhausen","nordhorn","northeim","nortorf","nossen","nuremberg","nördlingen","nürtingen","ober","oberasbach","oberharz","oberhausen","oberhof","oberkirch","oberkochen","oberlungwitz","obermoschel","obernburg","oberndorf","obernkirchen","oberriexingen","obertshausen","oberursel","oberviechtach","oberweißbach","oberwesel","oberwiesenthal","ochsenfurt","ochsenhausen","ochtrup","oderberg","oebisfelde","oederan","oelde","oelsnitz","oelsnitz","oer","oerlinghausen","oestrich","oettingen","offenbach","offenburg","ohrdruf","olbernhau","olching","oldenburg","oldenburg","olfen","olpe","olsberg","oppenau","oppenheim","oranienbaum","oranienburg","orlamünde","ornbau","ortenberg","ortrand","oschatz","oschersleben","osnabrück","osterburg","osterburken","osterfeld","osterhofen","osterholz","osterode","osterwieck","ostfildern","ostheim","osthofen","ostritz","otterberg","otterndorf","ottweiler","overath","owen","paderborn","papenburg","pappenheim","parchim","parsberg","pasewalk","passau","pattensen","pausa","pegau","pegnitz","peine","peitz","penig","penkun","penzberg","penzlin","perleberg","petershagen","pfaffenhofen","pfarrkirchen","pforzheim","pfreimd","pfullendorf","pfullingen","pfungstadt","philippsburg","pinneberg","pirmasens","pirna","plattling","plau","plaue","plauen","plettenberg","pleystein","plochingen","plön","pockau","pocking","pohlheim","polch","porta","potsdam","pottenstein","preetz","premnitz","prenzlau","pressath","preußisch","prichsenstadt","pritzwalk","prüm","puchheim","pulheim","pulsnitz","putbus","putlitz","pößneck","püttlingen","quakenbrück","quedlinburg","querfurt","quickborn","rabenau","radeberg","radebeul","radeburg","radevormwald","radolfzell","raguhn","rahden","rain","ramstein","ranis","ransbach","rastatt","rastenberg","rathenow","ratingen","ratzeburg","rauenberg","raunheim","rauschenberg","ravensburg","ravenstein","recklinghausen","rees","regen","regensburg","regis","rehau","rehburg","rehna","reichelsheim","reichenbach","reichenbach","reinbek","reinfeld","reinheim","remagen","remda","remscheid","remseck","renchen","rendsburg","rennerod","renningen","rerik","rethem","reutlingen","rheda","rhede","rheinau","rheinbach","rheinberg","rheinböllen","rheine","rheinfelden","rheinsberg","rheinstetten","rhens","rhinow","ribnitz","richtenberg","riedenburg","riedlingen","riedstadt","rieneck","riesa","rietberg","rinteln","rochlitz","rockenhausen","rodalben","rodenberg","rodewisch","rodgau","roding","romrod","ronneburg","ronnenberg","rosbach","rosenfeld","rosenheim","rosenthal","rostock","rotenburg","rotenburg","roth","rothenburg","rothenburg","rothenfels","rottenburg","rottenburg","rottweil","roßleben","roßwein","rudolstadt","ruhla","ruhland","runkel","rutesheim","röbel","rödental","rödermark","römhild","rösrath","rötha","röthenbach","röttingen","rötz","rüdesheim","rüsselsheim","rüthen","saalburg","saalfeld","saarbrücken","saarburg","saarlouis","sachsenhagen","sachsenheim","salzgitter","salzkotten","salzwedel","sandau","sandersdorf","sangerhausen","sankt","sankt","sankt","sarstedt","sassenberg","sassnitz","sayda","schalkau","schauenstein","scheer","scheibenberg","scheinfeld","schelklingen","schenefeld","scheßlitz","schieder","schifferstadt","schillingsfürst","schiltach","schirgiswalde","schkeuditz","schkölen","schleiden","schleiz","schleswig","schlettau","schleusingen","schlieben","schlitz","schlotheim","schloß","schlüchtern","schlüsselfeld","schmalkalden","schmallenberg","schmölln","schnackenburg","schnaittenbach","schneeberg","schneverdingen","schongau","schopfheim","schorndorf","schortens","schotten","schramberg","schraplau","schriesheim","schrobenhausen","schrozberg","schwaan","schwabach","schwabmünchen","schwaigern","schwalbach","schwalmstadt","schwandorf","schwanebeck","schwarzenbach","schwarzenbach","schwarzenbek","schwarzenberg","schwarzenborn","schwarzheide","schwedt","schweich","schweinfurt","schwelm","schwentinental","schwerin","schwerte","schwetzingen","schwäbisch","schwäbisch","schömberg","schönau","schönau","schönberg","schönebeck","schöneck","schönewalde","schöningen","schönsee","schönwald","schöppenstedt","schüttorf","sebnitz","seehausen","seeland","seelow","seelze","seesen","sehnde","seifhennersdorf","selb","selbitz","seligenstadt","selm","selters","senden","sendenhorst","senftenberg","seßlach","siegburg","siegen","sigmaringen","simbach","simmern","sindelfingen","singen","sinsheim","sinzig","soest","solingen","solms","soltau","sondershausen","sonneberg","sonnewalde","sonthofen","sontra","spaichingen","spalt","spangenberg","speicher","spenge","speyer","spremberg","springe","sprockhövel","stade","stadt","stadtallendorf","stadtbergen","stadthagen","stadtilm","stadtlengsfeld","stadtlohn","stadtoldendorf","stadtprozelten","stadtroda","stadtsteinach","starnberg","staufen","staufenberg","stavenhagen","staßfurt","stein","steinach","steinau","steinbach","steinbach","steinfurt","steinheim","steinheim","stendal","sternberg","stockach","stolberg","stollberg","stolpen","storkow","straelen","stralsund","strasburg","straubing","strausberg","strehla","stromberg","stutensee","stuttgart","stößen","stühlingen","suhl","sulingen","sulz","sulzbach","sulzbach","sulzburg","sundern","syke","sömmerda","südliches","süßen","tambach","tangerhütte","tangermünde","tann","tanna","tauberbischofsheim","taucha","taunusstein","tecklenburg","tegernsee","telgte","teltow","templin","tengen","tessin","teterow","tettnang","teublitz","teuchern","teupitz","teuschnitz","thale","thalheim","thannhausen","tharandt","themar","thum","tirschenreuth","titisee","tittmoning","todtnau","torgau","torgelow","tornesch","traben","traunreut","traunstein","trebbin","trebsen","treffurt","trendelburg","treuchtlingen","treuen","treuenbrietzen","triberg","tribsees","trier","triptis","trochtelfingen","troisdorf","trossingen","trostberg","tuttlingen","twistringen","töging","tönisvorst","tönning","tübingen","uebigau","ueckermünde","uelzen","uetersen","uffenheim","uhingen","ulm","ulmen","ulrichstein","ummerstadt","unkel","unna","unterschleißheim","usedom","usingen","uslar","vacha","vaihingen","vallendar","varel","vechta","velbert","velburg","velden","velen","vellberg","vellmar","velten","verden","veringenstadt","verl","versmold","vetschau","viechtach","viernheim","viersen","villingen","vilsbiburg","vilseck","vilshofen","visselhövede","vlotho","voerde","vogtsburg","vohburg","vohenstrauß","volkach","volkmarsen","vreden","vöhrenbach","vöhringen","völklingen","wachenheim","wadern","waghäusel","wahlstedt","waiblingen","waibstadt","waischenfeld","waldbröl","waldeck","waldenbuch","waldenburg","waldenburg","waldershof","waldheim","waldkappel","waldkirch","waldkirchen","waldkraiburg","waldmünchen","waldsassen","waldshut","walldorf","walldürn","wallenfels","walsrode","waltershausen","waltrop","wanfried","wangen","wanzleben","warburg","waren","warendorf","warin","warstein","wassenberg","wasserburg","wassertrüdingen","wasungen","wedel","weener","wegberg","wegeleben","wehr","weida","weiden","weikersheim","weil","weil","weilburg","weilheim","weilheim","weimar","weingarten","weinheim","weinsberg","weinstadt","weismain","weiterstadt","weißenberg","weißenburg","weißenfels","weißenhorn","weißensee","weißenstadt","weißenthurm","weißwasser","welzheim","welzow","wemding","wendlingen","werben","werdau","werder","werdohl","werl","wermelskirchen","wernau","werne","werneuchen","wernigerode","wertheim","werther","wertingen","wesel","wesenberg","wesselburen","wesseling","westerburg","westerstede","wetter","wetter","wettin","wetzlar","widdern","wiehe","wiehl","wiesbaden","wiesensteig","wiesloch","wiesmoor","wildau","wildberg","wildenfels","wildeshausen","wilhelmshaven","wilkau","willebadessen","willich","wilsdruff","wilster","wilthen","windischeschenbach","windsbach","winnenden","winsen","winterberg","wipperfürth","wirges","wismar","wissen","witten","wittenberg","wittenberge","wittenburg","wittichenau","wittingen","wittlich","wittmund","wittstock","witzenhausen","woldegk","wolfach","wolfenbüttel","wolfhagen","wolframs","wolfratshausen","wolfsburg","wolfstein","wolgast","wolkenstein","wolmirstedt","worms","wriezen","wunsiedel","wunstorf","wuppertal","wurzbach","wurzen","wustrow","wyk","wächtersbach","wörrstadt","wörth","wörth","wörth","wülfrath","würselen","würzburg","xanten","zahna","zarrentin","zehdenick","zeil","zeitz","zell","zell","zell","zella","zerbst","zeulenroda","zeven","ziegenrück","zierenberg","ziesar","zirndorf","zittau","zossen","zschopau","zweibrücken","zwenkau","zwickau","zwiesel","zwingenberg","zwönitz","zörbig","zülpich","öhringen","östringen","übach","überlingen"]));
	this.trainingData.push(new _$Main_TrainingData("Icelandic Forenames","Icelandic Forenames",["aage","aagot","aaron","abel","abela","abigael","abraham","ada","adam","adda","addi","addú","addý","adel","adela","adelía","adrían","adríana","adríel","adíel","adólf","agata","agatha","agla","agnar","agnea","agnes","agneta","agni","agða","akira","alanta","alba","albert","alberta","albína","alda","aldar","aldný","aldís","alena","aleta","aletta","alex","alexa","alexander","alexandra","alexandría","alexis","alexstrasa","alexía","alexíus","alfa","alfons","alfred","alfreð","alfífa","ali","alice","alida","alla","allan","alli","allý","alma","almar","alrekur","alrún","alva","alvar","alvilda","alvin","alída","alína","alís","alísa","amadea","amal","amalía","amanda","amelía","amil","amilía","amos","amy","amír","amíra","amý","analía","anastasía","anders","andra","andrea","andreas","andri","andrá","andré","andrés","andríana","anes","anetta","anfinn","angantýr","angela","angelía","angelíka","angi","anika","anita","anja","ann","anna","annabella","annalísa","annar","annarr","annas","anne","annel","annelí","annes","annetta","anney","annika","annía","anný","anthony","anton","antonía","antoníus","antóníus","aníka","anína","aníta","apríl","ara","aran","ardís","arent","ares","arey","ari","arilíus","arinbjörg","arinbjörn","aris","arisa","arja","armenía","arna","arnald","arnaldur","arnar","arnberg","arnbergur","arnbjörg","arnbjörn","arnborg","arndís","arndór","arnes","arney","arnfinna","arnfinnur","arnfreyr","arnfríður","arngarður","arngeir","arngerður","arngils","arngrímur","arngunnur","arnheiður","arnhildur","arnika","arnkatla","arnkell","arnlaug","arnlaugur","arnleif","arnleifur","arnljót","arnljótur","arnlín","arnmundur","arnmóður","arnoddur","arnold","arnrós","arnrún","arnsteinn","arnviður","arnór","arnóra","arnúlfur","arnþrúður","arnþór","arnþóra","aron","arthur","arthúr","artúr","aría","aríana","aríanna","aríaðna","aríel","aríela","aríella","arín","arína","arís","aríus","asael","askja","askur","aspar","assa","astrid","asía","asírí","atalía","atena","athena","atla","atlanta","atlas","atli","aurora","austar","austmann","austmar","austri","auðberg","auðbergur","auðbert","auðbjörg","auðbjörn","auðbjört","auðdís","auðgeir","auðkell","auðlín","auðmundur","auðna","auðný","auðrún","auðun","auðunn","auður","auður","auðólfur","axel","axelma","axelía","aðalberg","aðalbergur","aðalbert","aðalbjörg","aðalbjörn","aðalbjört","aðalborg","aðalborgar","aðaldís","aðalfríður","aðalgeir","aðalheiður","aðalmundur","aðalráður","aðalrós","aðalsteina","aðalsteinn","aðalsteinunn","aðalveig","aðalvíkingur","aðólf","aþena","baldey","baldrún","baldur","baldvin","baldvina","baldwin","baltasar","bambi","barbara","barbára","barri","barði","bassi","bassí","bastían","baugur","bebba","begga","beinir","beinteinn","beitir","bekan","belinda","bella","benedikt","benedikta","bengta","benidikt","benidikta","benjamín","benna","benney","benný","benoný","bent","benta","bentey","bentína","benvý","benía","beníta","benóní","benóný","bera","berent","berg","bergdís","bergey","bergfinnur","bergfríður","bergheiður","berghildur","berghreinn","bergjón","berglaug","berglind","bergljót","berglín","bergmann","bergmannía","bergmar","bergmundur","bergný","bergrán","bergrín","bergrós","bergrún","bergsteinn","bergsveina","bergsveinn","bergur","bergvin","bergþór","bergþóra","berit","bernhard","bernharð","bernharður","berni","bernódus","bernódía","bersi","berta","bertel","bertha","bertram","bessi","bessí","bestla","beta","betanía","betsý","bettý","betúel","bil","bill","birgir","birgit","birgitta","birkir","birna","birnir","birta","birtingur","birtir","birtna","bjargar","bjargdís","bjargey","bjargheiður","bjarghildur","bjarglind","bjargmundur","bjargþór","bjarkan","bjarkar","bjarkey","bjarki","bjarklind","bjarma","bjarmar","bjarmi","bjarnar","bjarndís","bjarney","bjarnfinnur","bjarnfreður","bjarnfríður","bjarngerður","bjarnharður","bjarnheiður","bjarnhildur","bjarnhéðinn","bjarni","bjarnlaug","bjarnlaugur","bjarnleifur","bjarnrún","bjarnsteinn","bjarnveig","bjarnólfur","bjarný","bjarnþrúður","bjarnþór","bjarnþóra","bjartey","bjartmann","bjartmar","bjartmey","bjartur","bjartþór","bjólan","bjólfur","björg","björgey","björgheiður","björghildur","björgmundur","björgvin","björgólfur","björgúlfur","björk","björn","björney","björnfríður","björnólfur","björt","bláey","bláklukka","blædís","blængur","blær","blær","blævar","blín","blíða","blómey","bobba","boga","bogdís","bogey","bogga","boghildur","bogi","bolli","borg","borgar","borgdís","borghildur","borgný","borgrún","borgúlfur","borgþór","borgþóra","botnía","boði","braga","braghildur","bragi","branddís","brandur","brandís","breki","bresi","brestir","briet","brigitta","brimar","brimdís","brimhildur","brimi","brimir","brimrún","brit","britt","britta","brjánn","broddi","bruno","bryndís","brynfríður","bryngeir","bryngerður","brynheiður","brynhildur","brynja","brynjar","brynjólfur","brynjúlfur","brynleifur","brynmar","brynný","brynsteinn","bryntýr","brynþór","brá","brák","bríana","bríanna","bríet","brími","brímir","burkney","burkni","bylgja","bára","bárður","bæring","bæringur","bæron","bíbí","bína","bóas","bóel","bói","bót","bóthildur","bótólfur","börkur","böðvar","búi","búri","camilla","caritas","carl","carla","carmen","cathinca","cecil","cecilia","cecilía","cesar","charlotta","charlotte","christa","christel","christian","christina","christine","christopher","clara","cæsar","cýrus","dagbjartur","dagbjörg","dagbjört","dagfari","dagfinnur","dagfríður","daggeir","daggrós","dagheiður","dagmann","dagmar","dagmey","dagný","dagnýr","dagrún","dagur","dagþór","dalbert","daldís","daley","dalla","dalli","dallilja","dalmann","dalmar","dalrós","dalvin","dalía","damjan","damon","dan","dana","danelíus","daney","danfríður","danheiður","danhildur","daniel","danival","dante","danía","daníel","daníela","daníella","daníval","dara","darri","daría","daríus","davíð","daðey","daði","daðína","debora","debóra","demus","dendý","dennis","deníel","didda","dilja","diljá","dimma","dimmblá","dimmey","diðrik","dofri","dolli","dominik","donna","doris","dorothea","drauma","draumey","draupnir","dreki","drengur","droplaug","drífa","drótt","dröfn","dufgus","dufþakur","dugfús","dvalinn","dynþór","dæja","día","díana","díanna","díma","dís","dísa","dísella","díómedes","dóa","dómald","dómaldi","dómaldur","dómhildur","dónald","dónaldur","dór","dóra","dórey","dóri","dóris","dórothea","dórótea","dóróthea","dósóþeus","dögg","dögun","dúa","dúfa","dúi","dúna","dúnn","dúnna","dýrborg","dýrfinna","dýri","dýrleif","dýrley","dýrmundur","dýrunn","ebba","ebbi","ebeneser","ebenezer","eberg","ebonney","edda","eddi","edel","edgar","edil","edilon","edit","edith","edvard","edvin","edward","edílon","efemía","efraím","egedía","eggert","eggrún","eggþór","egill","egla","eik","eikar","eileiþía","eilífur","einar","einbjörg","eindís","einey","einfríður","einhildur","einir","einrún","einvarður","einína","einþór","eir","eirdís","eirfinna","eirný","eiríka","eiríkur","eirún","eivin","eivör","eiðar","eiðný","eiðunn","eiður","elba","elberg","elbert","eldar","eldbjörg","eldey","eldgrímur","eldjárn","eldlilja","eldmar","eldon","eldrún","eldur","eldór","eldþóra","eleina","elektra","elena","elenborg","elentínus","elfa","elfar","elfráður","elfur","elimar","elina","elinborg","elinór","elis","elisabeth","elka","ella","ellen","ellert","elley","elli","ellisif","elliði","elly","ellín","ellís","ellý","elma","elmar","elna","elsa","elsabet","elsie","elsí","elsý","elva","elvar","elvi","elvin","elvira","elvis","elvíra","elvý","elí","elía","elía","elíana","elías","elíeser","elímar","elín","elína","elínbergur","elínbet","elínbjörg","elínbjört","elínborg","elíndís","elíngunnur","elínheiður","elínmundur","elínrós","elíná","elínór","elírós","elís","elísa","elísabet","elísabeth","elíza","emanúel","embla","embrek","emelía","emelíana","emelína","emerald","emeralda","emil","emilía","emilíana","emilíanna","emilý","emma","emmanúel","emmý","emý","enea","eneka","engilbert","engilbjartur","engilbjört","engiljón","engill","engilráð","engilrós","engla","enika","enja","enok","eníta","enóla","eres","eric","erik","erika","erin","erla","erlar","erlen","erlendur","erling","erlingur","erlín","ermenrekur","erna","ernestó","ernir","ernst","eron","erpur","esekíel","esja","esjar","eskja","esmeralda","esra","estefan","ester","esther","estiva","ethel","etna","eufemía","eva","evald","evan","evelyn","evert","evey","evfemía","evgenía","evlalía","evían","evíta","ey","eyberg","eybjörg","eybjört","eyborg","eydís","eyfríður","eygerður","eygló","eyhildur","eyja","eyjalín","eyjólfur","eylaugur","eyleif","eyleifur","eylín","eymar","eymundur","eyríkur","eyrós","eyrún","eysteinn","eyvar","eyveig","eyvindur","eyvör","eyþrúður","eyþór","eyþóra","eðna","eðvald","eðvar","eðvarð","fabrisíus","falgeir","falur","fannar","fannberg","fanndís","fanney","fanngeir","fannlaug","fanny","fanný","febrún","felix","fema","fengur","fenrir","ferdinand","ferdínand","fertram","feykir","filip","filippa","filippus","filippía","filipía","finn","finna","finnbjörg","finnbjörk","finnbjörn","finnboga","finnbogi","finnborg","finndís","finney","finnfríður","finngeir","finnjón","finnlaug","finnlaugur","finnrós","finnur","finnvarður","fjalar","fjalldís","fjarki","fjóla","fjólar","fjólmundur","fjölnir","fjölvar","fjörnir","flemming","flosi","flóki","flóra","flórent","flóvent","folda","forni","fossmar","francis","frank","franklín","frans","fransiska","franz","franziska","fregn","freybjörn","freydís","freygarður","freygerður","freyja","freylaug","freyleif","freymar","freymundur","freymóður","freyr","freysteinn","freyviður","freyþór","friedrich","frigg","fritz","friðberg","friðbergur","friðbert","friðbjörg","friðbjörn","friðbjört","friðborg","friðdís","friðdóra","friðey","friðfinna","friðfinnur","friðgeir","friðgerður","friðjón","friðjóna","friðlaug","friðlaugur","friðleif","friðleifur","friðlín","friðmann","friðmar","friðmey","friðmundur","friðný","friðrik","friðrika","friðrikka","friðrós","friðrún","friðsemd","friðsteinn","friður","friðveig","friðvin","friðþjófur","friðþór","friðþóra","frosti","frostrós","frán","fránn","frár","frímann","fríða","fríðsteinn","fríður","fróði","fróðmar","fróðný","funi","fura","fylkir","fáfnir","fálki","fía","fídes","fífa","fífill","fólki","fönn","fúsi","gabriel","gabríel","gabríela","gabríella","gael","galdur","gamalíel","garibaldi","garpur","garri","garðar","gaui","gauja","gaukur","gauthildur","gauti","gautrekur","gautur","gautviður","gefjun","gefn","geir","geira","geirarður","geirbjörg","geirdís","geirfinna","geirfinnur","geirfríður","geirharður","geirhildur","geirhjörtur","geirhvatur","geiri","geirlaug","geirlaugur","geirleifur","geirlöð","geirmundur","geirný","geirríður","geirröður","geirrún","geirtryggur","geirvaldur","geirólfur","geirþjófur","geirþrúður","geisli","gellir","georg","georgía","gerald","geri","gerða","gerðar","gerður","gestheiður","gestný","gestrún","gestur","gilbert","gill","gillý","gilmar","gils","gilslaug","gissunn","gissur","gizur","gjaflaug","gjúki","gloría","gló","glóa","glóbjört","glódís","glóey","glói","glóð","glúmur","gneisti","gná","gnúpur","gnýr","gottskálk","gottsveinn","goði","goðmundur","grani","grankell","gregor","grein","greipur","greppur","gret","greta","gretar","grethe","grettir","grélöð","grét","gréta","grétar","gríma","grímar","grímey","grímheiður","grímhildur","grímkell","grímlaugur","grímnir","grímur","grímólfur","grímúlfur","gróa","gullbrá","gulli","gullveig","gullý","gumi","gumma","gunnar","gunnberg","gunnbjörg","gunnbjörn","gunnbjört","gunnborg","gunndís","gunndór","gunndóra","gunnella","gunnfinna","gunnfríður","gunngeir","gunnhallur","gunnharða","gunnheiður","gunnhildur","gunnjóna","gunnlaug","gunnlaugur","gunnleif","gunnleifur","gunnlöð","gunnröður","gunnrún","gunnsteinn","gunnur","gunnvaldur","gunnveig","gunnvör","gunnólfur","gunnóli","gunný","gunnþór","gunnþóra","gunnþórunn","gurrý","gustav","gutti","guttormur","guðberg","guðbergur","guðbjarni","guðbjartur","guðbjörg","guðbjörn","guðbjört","guðborg","guðbrandur","guðdís","guðfinna","guðfinnur","guðfreður","guðfríður","guðgeir","guðjón","guðjóna","guðlaug","guðlaugur","guðleif","guðleifur","guðleikur","guðlín","guðmann","guðmar","guðmey","guðmon","guðmunda","guðmundur","guðmundína","guðni","guðný","guðráður","guðríður","guðröður","guðrún","guðsteina","guðsteinn","guðvarður","guðveig","guðveigur","guðvin","guðþór","gylfi","gyrðir","gytta","gyða","gyðja","gyðríður","gæfa","gæflaug","gía","gídeon","gígja","gígjar","gígur","gísela","gísla","gísley","gísli","gíslný","gíslrún","gíslunn","gíslína","gíta","góa","gógó","gói","góði","gúa","gústaf","gústav","gýgjar","gýmir","hadda","haddi","haddur","haddý","hafberg","hafbjörg","hafborg","hafdís","hafey","hafgrímur","hafliða","hafliði","haflína","hafnar","hafni","hafný","hafrós","hafrún","hafsteina","hafsteinn","hafþór","hafþóra","hagalín","hagbarður","hagbert","haki","halla","hallbera","hallberg","hallbjörg","hallbjörn","hallborg","halldís","halldór","halldóra","halley","hallfreður","hallfríður","hallgarður","hallgeir","hallgerður","hallgils","hallgrímur","hallgunnur","hallkatla","hallkell","hallmann","hallmar","hallmundur","hallný","hallrún","hallsteinn","hallur","hallvarður","hallveig","hallvör","hallþór","hamar","hanna","hannes","hanney","hannibal","hans","hansa","hansína","harald","haraldur","harpa","harri","harry","harrý","hartmann","hartvig","hauksteinn","haukur","haukvaldur","hauður","heba","hebba","hedda","hedí","heida","heikir","heilmóður","heimir","heinrekur","heisi","heiða","heiðar","heiðarr","heiðberg","heiðbert","heiðbjörg","heiðbjörk","heiðbjört","heiðbrá","heiðdís","heiðlaug","heiðlindur","heiðlóa","heiðmann","heiðmar","heiðmundur","heiðný","heiðrekur","heiðrós","heiðrún","heiður","heiðveig","hekla","hektor","helen","helena","helga","helgi","hella","helma","helmút","hemmert","hendrik","hendrikka","henning","henný","henrietta","henrik","henrika","henry","henríetta","henrý","hera","herbert","herbjörg","herbjörn","herbjört","herborg","herdís","herfinnur","herfríður","hergeir","hergerður","hergill","hergils","herjólfur","herlaug","herlaugur","herleifur","herluf","hermann","hermundur","hermína","hermóður","hersilía","hersir","hersteinn","hersveinn","herta","hertha","hervar","hervarður","hervin","hervör","herþrúður","hilaríus","hilbert","hilda","hildar","hildegard","hildibergur","hildibjörg","hildibrandur","hildigeir","hildigerður","hildiglúmur","hildigunnur","hildimar","hildimundur","hildingur","hildir","hildiríður","hildisif","hildiþór","hildur","hilma","hilmar","hilmir","himinbjörg","himri","hind","hinrik","hinrika","hinrikka","hjallkár","hjalta","hjaltalín","hjaltey","hjalti","hjarnar","hjálmar","hjálmdís","hjálmey","hjálmfríður","hjálmgeir","hjálmgerður","hjálmrós","hjálmrún","hjálmtýr","hjálmur","hjálmveig","hjálmþór","hjördís","hjörfríður","hjörleif","hjörleifur","hjörný","hjörtfríður","hjörtur","hjörtþór","hjörvar","hlaðgerður","hleiðar","hleiður","hlini","hljómur","hlynur","hlédís","hlégestur","hlér","hlíf","hlífar","hlín","hlíðar","hlíðberg","hlökk","hlöðmundur","hlöður","hlöðvarður","hlöðver","hnefill","hnikar","hnikarr","holgeir","holger","holti","hrafn","hrafna","hrafnar","hrafnbergur","hrafnborg","hrafndís","hrafney","hrafnfífa","hrafngerður","hrafnheiður","hrafnhildur","hrafnkatla","hrafnkell","hrafnlaug","hrafntinna","hrafntýr","hrannar","hrappur","hraunar","hraundís","hrefna","hreggviður","hreimur","hreindís","hreinn","hreiðar","hreiðmar","hringur","hrollaugur","hrolleifur","hrund","hrærekur","hrímnir","hróaldur","hróar","hróbjartur","hrói","hrólfdís","hrólfur","hrómundur","hróðgeir","hróðmar","hróðný","hróðvar","hróðólfur","hrönn","hrútur","hugberg","hugbjörg","hugbjört","hugborg","hugdís","hugi","huginn","hugleikur","hugljúf","hugo","hugrún","hugó","huld","hulda","huldar","huldrún","huldís","huxley","hvannar","hvönn","hyltir","hylur","hákon","hákonía","háleygur","hálfdan","hálfdán","hámundur","hárekur","hárlaugur","hásteinn","hávar","hávarr","hávarður","hængur","hænir","héðinn","híram","hólm","hólmar","hólmbert","hólmbjörg","hólmdís","hólmfastur","hólmfríður","hólmgeir","hólmgrímur","hólmkell","hólmsteinn","hólmþór","hóseas","hödd","högna","högni","hörn","hörður","höskuldur","höður","húbert","húgó","húmi","húna","húnbjörg","húnbogi","húndís","húngerður","húni","húnn","húnröður","ida","idda","illugi","ilmur","ilse","ilías","immanúel","immý","ina","inda","india","indiana","indra","indriði","indí","indía","indíana","indíra","inga","ingberg","ingdís","ingeborg","inger","ingey","ingheiður","inghildur","ingi","ingiberg","ingibergur","ingibert","ingibjartur","ingibjörg","ingibjörn","ingibjört","ingiborg","ingifinna","ingifríður","ingigerður","ingilaug","ingileif","ingileifur","ingilín","ingimagn","ingimar","ingimaría","ingimunda","ingimundur","ingiríður","ingirós","ingisól","ingivaldur","ingiveig","ingiþór","ingjaldur","ingmar","ingrid","ingrún","ingunn","ingvaldur","ingvar","ingveldur","ingvi","ingólfur","ingþór","inna","irena","irene","irja","irma","irmelín","irmý","irpa","isabel","isabella","ismael","issi","iða","iðunn","jack","jafet","jagger","jaki","jakob","jakobína","jakop","jamil","jan","jana","jane","janetta","jannika","janus","jara","jarfi","jarl","jarla","jarún","jarþrúður","jasmín","jason","jenetta","jenna","jenni","jenny","jenný","jens","jensína","jeremías","jes","jesper","jessý","jochum","johan","john","joshua","jovina","judith","julian","járnbrá","járngerður","járngrímur","játgeir","játmundur","játvarður","jóa","jóakim","jóann","jóanna","jódís","jóel","jófríður","jóhann","jóhanna","jóhannes","jói","jólín","jómar","jómundur","jón","jóna","jónanna","jónar","jónas","jónasína","jónatan","jónbjörg","jónbjörn","jónbjört","jóndís","jóndór","jóndóra","jóney","jónfríður","jóngeir","jóngerð","jónheiður","jónhildur","jóninna","jónmundur","jónný","jónsteinn","jónída","jónína","jóný","jónþór","jóra","jórlaug","jórunn","jóríður","jósafat","jósavin","jósebína","jósef","jósefín","jósefína","jósep","jósteinn","jósúa","jóvin","jökla","jökull","jökulrós","jörfi","jörgen","jörgína","jörmundur","jörri","jörundur","jörvar","jörvi","júdea","júdit","júlí","júlía","júlían","júlíana","júlíanna","júlíetta","júlíhuld","júlína","júlírós","júlíus","júní","júní","júnía","júníana","júníus","júrek","kai","kaj","kaja","kakali","kaktus","kala","kaldi","kaleb","kali","kalla","kalman","kalmann","kalmar","kamal","kamilla","kamma","kamí","kapitola","kaprasíus","kapítóla","kara","karel","karen","karim","karin","karitas","karkur","karl","karla","karles","karli","karlinna","karlotta","karlína","karmen","karol","karolína","karvel","karí","karín","karína","karítas","karó","karólín","karólína","karún","kaspar","kasper","kassandra","kastíel","kata","katarína","katarínus","katerína","katharina","kathinka","katinka","katla","katrín","katrína","kató","katý","kaðlín","kellý","kendra","keran","ketilbjörg","ketilbjörn","ketilfríður","ketill","ketilríður","kiddý","kiljan","kilían","kira","kirsten","kirstín","kittý","kjalar","kjallakur","kjalvör","kjaran","kjartan","kjarval","kjárr","kjói","klara","klemens","klementína","klemenz","kleópatra","kládía","klængur","knörr","knútur","koggi","kolbeinn","kolbjörg","kolbjörn","kolbrá","kolbrún","koldís","kolfinna","kolfinnur","kolfreyja","kolgríma","kolgrímur","kolka","kolmar","kolskeggur","kolur","kolviður","konkordía","konný","konráð","konstantínus","korka","kormlöð","kormákur","kornelía","kornelíus","kort","koðrán","kraki","kris","krista","kristall","kristberg","kristbergur","kristbjörg","kristbjörn","kristborg","kristdór","kristel","kristens","kristensa","krister","kristey","kristfinnur","kristfríður","kristgeir","kristgerður","kristian","kristin","kristine","kristinn","kristjana","kristján","kristjón","kristjóna","kristlaug","kristlaugur","kristleifur","kristlind","kristlín","kristmann","kristmar","kristmundur","kristný","kristofer","kristrós","kristrún","kristvaldur","kristvarður","kristveig","kristvin","kristvina","kristíana","kristíanna","kristín","kristína","kristófer","kristólína","kristý","kristþór","kristþóra","krumma","krummi","kría","kvasir","kveldúlfur","kár","kára","kári","kæja","kókó","kópur","kórekur","laila","lambert","lana","lara","lars","laufar","laufey","laufheiður","laufhildur","lauga","laugey","laugheiður","laugi","lauritz","laíla","lea","leif","leifur","leiknir","leikný","leila","leiðólfur","lena","leo","leon","leonard","leonhard","leonóra","leví","lexí","leyla","leó","leóna","leónóra","leópold","lilja","liljar","liljurós","liljá","lill","lilla","lillian","lilly","lillý","lily","lilý","lind","linda","lindar","lindberg","linddís","lingný","lisbeth","listalín","liv","ljósbjörg","ljósbrá","ljósálfur","ljótunn","ljótur","ljúfur","lofn","loftur","loftveig","logey","logi","lokbrá","loki","lotta","louisa","louise","lovísa","loðmundur","ludvig","lukka","lundi","lydia","lydía","lyngar","lyngheiður","lár","lára","lárensína","lárent","lárentíus","láretta","lárey","lárus","læla","lér","líam","líba","líf","lífdís","lílý","lín","lína","línberg","línbjörg","líndís","líneik","líney","línhildur","líni","lísa","lísabet","lísandra","lísbet","lísebet","lív","lóa","lóreley","lórens","lórenz","lótus","lúcía","lúkas","lúna","lúsinda","lúsía","lúter","lúther","lúvísa","lúísa","lúðvíg","lúðvík","lúðvíka","lýdía","lýra","lýtingur","lýður","maddý","magda","magdalena","magga","maggey","maggi","maggý","magna","magndís","magnea","magnes","magney","magnfríður","magngeir","magnheiður","magnhildur","magni","magnús","magnúsína","magný","magnþór","magnþóra","magðalena","maj","maja","makan","malen","malena","malika","malla","malía","malín","malína","manda","manfred","manfreð","manúel","manúela","manúella","mar","mara","marbjörn","mardís","marel","marela","marella","maren","marey","marfríður","margeir","margit","margot","margret","margrjet","margrét","margrímur","margunnur","marheiður","mari","maria","marie","marijón","marikó","marinella","marinó","marit","marja","marjón","mark","markrún","markó","markús","markþór","marlaug","marlena","marlín","marlís","maron","marri","mars","marsa","marsellíus","marselía","marselína","marsibil","marsilía","marsý","marta","marteinn","marten","martha","marthen","martin","martína","marvin","mary","marzibil","marzilíus","marí","maría","maríam","marían","maríana","maríanna","marías","marín","marína","marínella","marínó","maríon","marís","marísa","marísól","marít","maríuerla","maríus","marólína","marý","mathilda","mathías","matta","mattea","matthea","matthilda","matthildur","matthía","matthías","matti","mattíana","mattías","mattína","mattý","max","maxima","maximus","maía","maídís","maísól","meda","mekkin","mekkinó","mekkín","melinda","melissa","melkorka","melkíor","melkólmur","melrakki","melrós","mensalder","merkúr","messíana","methúsalem","metta","metúsalem","mey","meyvant","michael","mikael","mikaela","mikaelína","mikjáll","mikkael","mikkalína","mikkel","milda","mildinberg","mildríður","milla","millý","minerva","minna","minney","minný","miriam","mirja","mirjam","mirra","mist","mjalldís","mjallhvít","mjaðveig","mjöll","mjöllnir","mjölnir","moli","mona","monika","morgan","morgunsól","moritz","mosi","muggur","munda","mundheiður","mundhildur","mundína","muni","muninn","myrk","myrkvi","myrra","mábil","málfríður","málhildur","málmfríður","mánadís","máney","máni","már","mára","márus","mía","mías","míla","mímir","mímósa","mínerva","mír","míra","míranda","míríel","mítra","míó","móa","módís","móeiður","móey","móheiður","mói","móna","mónika","móníka","móri","mórits","móses","móði","mörk","mörður","múli","mýr","mýra","mýrkjartan","mýrún","nadia","nadja","nadía","nana","nanna","nanný","nansý","naomí","narfi","natalie","natalía","natan","natanael","nataníel","nathan","naómí","neisti","nella","nellý","nenna","nenni","neptúnus","nicolas","nicole","nikanor","nikolai","nikolas","nikoletta","nikulás","nikíta","nikólína","nils","ninja","ninna","niðbjörg","njála","njáll","njóla","njörður","nonni","norbert","norma","normann","norðmann","náttmörður","náttsól","náttúlfur","náð","níels","níls","nína","níní","nóa","nóam","nóel","nói","nóni","nóra","nóri","nótt","nóvember","nökkvi","númi","nýbjörg","nývarð","obba","odda","oddbergur","oddbjörg","oddbjörn","oddfreyja","oddfreyr","oddfríður","oddgeir","oddgerður","oddhildur","oddi","oddkell","oddlaug","oddleif","oddleifur","oddmar","oddný","oddrún","oddsteinn","oddur","oddvar","oddveig","oddvör","oddþór","oktavía","oktavíus","októ","októvía","októvíus","olaf","olav","olga","olgeir","oliver","olivert","olivia","ollý","ora","orfeus","orka","ormar","ormheiður","ormhildur","ormur","orri","orvar","otkatla","otkell","otri","otta","otti","ottó","otur","pamela","parmes","parís","patrek","patrekur","patricia","patrick","patrik","patrisía","pedró","per","perla","peta","peter","petra","petrea","petronella","petrína","petrónella","petrós","petrún","petrúnella","pjetur","polly","pollý","pría","príor","pála","páldís","páley","pálfríður","pálhanna","pálheiður","pálhildur","páll","pálmar","pálmey","pálmfríður","pálmi","pálrún","pálín","pálína","pétrína","pétrún","pétur","pía","rafael","rafn","rafnar","rafney","rafnhildur","rafnkell","ragna","ragnar","ragnbjörg","ragney","ragnfríður","ragnheiður","ragnhildur","ragúel","rakel","ramóna","randalín","randver","randíður","randý","ranka","rannva","rannveig","rannver","rasmus","rea","rebekka","refur","reginbaldur","reginbjörg","reginn","regína","reidar","reifnir","reimar","rein","reinar","reinhart","reinhold","remek","renata","rex","reykdal","reyn","reynald","reynar","reyndís","reynheiður","reynhildur","reynir","reyr","richard","rikharð","rikharður","rikka","ripley","rita","robert","rolf","ronald","ronja","rorí","roxanna","rudolf","runi","runný","runólfur","rut","ruth","rán","ráðgeir","ráðhildur","ráðvarður","ríkarður","ríkey","ríkharð","ríkharður","rín","ríta","ríó","róbert","róberta","róbjörg","rólant","róman","rómeó","rós","rósa","rósalind","rósalía","rósanna","rósant","rósar","rósberg","rósbjörg","rósborg","róselía","rósenberg","rósey","rósfríður","róshildur","rósi","rósinberg","rósinkar","rósinkara","rósinkrans","rósinkransa","róska","róslaug","róslind","róslinda","róslín","rósmann","rósmary","rósmarý","rósmunda","rósmundur","rósný","röfn","rögn","rögnvald","rögnvaldur","rögnvar","rökkvi","röskva","röðull","rúbar","rúben","rúbý","rúdólf","rún","rúna","rúnar","rúndís","rúnhildur","rúrik","rúrí","rútur","sabrína","sabína","safír","saga","sakarías","salbjörg","saldís","salgerður","salka","salma","salmann","salmar","salný","salome","salvar","salvör","salín","salína","salóme","salómon","samson","samúel","sandel","sandra","sandri","sandur","sanna","santía","sara","sarína","saxi","sebastian","sebastían","sefanía","seifur","seimur","selena","selja","selka","selma","senía","septíma","sera","serena","sesar","seselía","sesil","sesilía","sesselja","sesselía","sessilía","sif","sigbergur","sigbert","sigbjartur","sigbjörn","sigdís","sigdór","sigdóra","sigfastur","sigfinnur","sigfreður","sigfríð","sigfríður","sigfús","sigga","siggeir","siggerður","sighvatur","sigjón","siglaugur","sigmann","sigmar","sigmunda","sigmundur","signa","signar","signhildur","signý","sigri","sigrid","sigríkur","sigríður","sigrún","sigsteinn","sigtryggur","sigtýr","sigur","sigurbaldur","sigurberg","sigurbergur","sigurbirna","sigurbjarni","sigurbjartur","sigurbjörg","sigurbjörn","sigurbjört","sigurborg","sigurbrandur","sigurbára","sigurdríf","sigurdrífa","sigurdís","sigurdór","sigurdóra","sigurey","sigurfinna","sigurfinnur","sigurfljóð","sigurgeir","sigurgeira","sigurgestur","sigurgrímur","sigurgísli","sigurhanna","sigurhans","sigurhelga","sigurhildur","sigurhjörtur","sigurjón","sigurjóna","sigurkarl","sigurlaug","sigurlaugur","sigurleif","sigurleifur","sigurlilja","sigurlinn","sigurlinni","sigurliði","sigurlogi","sigurlás","sigurlín","sigurlína","sigurmann","sigurmar","sigurmon","sigurmunda","sigurmundur","sigurnanna","sigurnýas","sigurnýjas","siguroddur","sigurpáll","sigurrós","sigursteina","sigursteinn","sigursveinn","sigurunn","sigurvaldi","sigurveig","sigurvin","sigurvina","sigurást","sigurásta","sigurða","sigurður","siguróli","sigurósk","sigurörn","sigurþór","sigurþóra","sigvalda","sigvaldi","sigvarður","sigyn","sigþrúður","sigþór","sigþóra","silfa","silfrún","silfá","silja","silka","silla","silli","silva","silvana","silvía","sindri","sirra","sirrí","sirrý","siv","sivía","sjafnar","sjana","sjöfn","skafti","skapti","skarpheiður","skarphéðinn","skefill","skeggi","skellir","skjöldur","skorri","skröggur","skugga","skuggi","skuld","skær","skæringur","skírnir","skíði","skúla","skúli","skúlína","skúta","smiður","smyrill","smári","snjáfríður","snjáka","snjófríður","snjóki","snjólaug","snjólaugur","snjólfur","snorra","snorri","snæbjartur","snæbjörg","snæbjörn","snæbjört","snæborg","snæbrá","snædís","snæfríður","snæhólm","snælaug","snælaugur","snær","snæringur","snærós","snærún","snævar","snævarr","snæþór","snót","soffanías","soffía","sofie","sofía","solveig","sonja","sonný","sophanías","sophia","sophie","sophus","spartakus","sporði","spói","stanley","stapi","starkaður","starri","stasía","stefan","stefana","stefanía","stefnir","stefán","stefánný","steina","steinar","steinarr","steinberg","steinbergur","steinbjörg","steinbjörn","steinborg","steindís","steindór","steindóra","steiney","steinfinnur","steinfríður","steingerður","steingrímur","steinhildur","steini","steinkell","steinlaug","steinmann","steinmar","steinmóður","steinn","steinrós","steinröður","steinrún","steinunn","steinvarður","steinvör","steinólfur","steinþór","steinþóra","stella","stirnir","stjarna","stjarney","stormur","sturla","sturlaugur","sturri","styr","styrbjörn","styrgerður","styrkár","styrmir","styrr","stígheiður","stígrún","stígur","stína","stórólfur","sumarliði","sumarlína","sumarrós","sunna","sunnefa","sunneva","sunniva","sunníva","susan","svafa","svafar","svala","svali","svalrún","svan","svana","svanberg","svanbergur","svanbjörg","svanbjörn","svanbjört","svanborg","svandís","svaney","svanfríður","svangeir","svanheiður","svanhildur","svanhvít","svanhólm","svani","svanlaug","svanlaugur","svanmundur","svanrós","svanur","svanþrúður","svanþór","svava","svavar","svea","sveina","sveinar","sveinberg","sveinbjartur","sveinbjörg","sveinbjörn","sveinborg","sveindís","sveiney","sveinfríður","sveingerður","sveinhildur","sveinjón","sveinlaug","sveinlaugur","sveinmar","sveinn","sveinrós","sveinrún","sveinsína","sveinungi","sveinveig","sveinþór","svend","sverre","sverrir","sváfnir","svölnir","svörfuður","sylgja","sylva","sylvia","sylvía","sæberg","sæbergur","sæbjartur","sæbjörg","sæbjörn","sæbjört","sæborg","sæbrá","sædís","sæfinna","sæfríður","sæhildur","sæi","sæla","sælaug","sælaugur","sæmann","sæmi","sæmunda","sæmundur","sæný","sær","særós","særún","sæsól","sæunn","sævald","sævaldur","sævar","sævarr","sævin","sævör","sæþór","sía","símon","símona","símonía","sírnir","sírus","sísí","síta","sívar","sófus","sófónías","sókrates","sól","sóla","sólberg","sólbergur","sólbjartur","sólbjörg","sólbjörn","sólbjört","sólborg","sólbrá","sólbrún","sóldís","sóldögg","sóley","sólfríður","sólgerður","sólhildur","sólimann","sólkatla","sóllilja","sólmar","sólmundur","sólný","sólon","sólrós","sólrún","sólveig","sólver","sólvin","sólvör","sólín","sónata","sölmundur","sölva","sölvar","sölvey","sölvi","sölvína","sören","sörli","súla","súlamít","súsan","súsanna","sýrus","tala","talía","tamar","tamara","tandri","tanja","tanya","tanya","tanía","tara","tarfur","tea","teitný","teitur","tekla","telma","tera","teresa","teresía","thea","thelma","theodór","theodóra","theresa","theódór","theódóra","thomas","thor","thorberg","thór","tindar","tindra","tindri","tindur","tinna","tinni","tirsa","tjaldur","tjörfi","tjörvi","tobías","todda","tolli","tonni","torbjörg","torfey","torfheiður","torfhildur","torfi","trausti","tristan","tristana","trostan","tryggva","tryggvi","tryggvína","trú","trúmann","tumas","tumi","tyrfingur","tía","tíalilja","tíbor","tíbrá","tími","tímon","tímoteus","tímóteus","tína","tístran","tóbías","tóbý","tói","tóka","tóki","tómas","tór","tóta","týr","týra","ubbi","uggi","ugla","ulrich","una","undína","uni","unna","unnar","unnbjörg","unnbjörn","unndís","unndór","unnsteinn","unnur","unnþór","urðar","urður","uxi","vagn","vagna","vagnbjörg","vagnfríður","vaka","vakur","vala","valberg","valbergur","valbjörg","valbjörk","valbjörn","valbjört","valborg","valbrandur","valdemar","valdheiður","valdi","valdimar","valdís","valdór","valentín","valentína","valentínus","valería","valey","valfríður","valgarð","valgarður","valgeir","valgerða","valgerður","valgý","valhildur","valka","valkyrja","vallaður","vallý","valmar","valmundur","valný","valrós","valrún","valsteinn","valter","valtýr","valur","valva","valves","valíant","valý","valþrúður","valþór","vanda","varmar","varða","vatnar","veig","veiga","veigar","veigur","venný","venus","ver","vera","vermundur","vernharð","vernharður","veronika","verónika","veróníka","vestar","vestmar","vetrarrós","veturliði","vibeka","victor","victoría","vigdís","vigfús","viggó","viglín","vignir","vigný","vigri","vigtýr","vigur","vikar","viktor","viktoria","viktoría","vilberg","vilbergur","vilbert","vilbjörn","vilbogi","vilborg","vilbrandur","vildís","vilfríður","vilgeir","vilgerður","vilhelm","vilhelmína","vilhjálmur","vili","viljar","vilji","villa","villi","villimey","vilma","vilmar","vilmundur","vilný","vinbjörg","vincent","vindar","vinjar","vinný","vinsý","virgill","virginía","viðar","viðja","viðjar","von","voney","vopni","vordís","vorm","váli","vápni","vár","vébjörg","vébjörn","védís","végeir","végerður","vékell","vélaug","vélaugur","vémundur","véný","vésteinn","víbekka","víf","vífill","vígberg","vígdögg","víggunnur","víglundur","vígmar","vígmundur","vígsteinn","vígþór","víkingur","vísa","víðar","víðir","víóla","víóletta","vöggur","völundur","vörður","vöttur","walter","werner","wilhelm","willard","william","willum","willy","ylfa","ylfur","ylja","ylur","ylva","ymir","yngvar","yngvi","ynja","yrja","yrkill","yrsa","zakaría","zakarías","zophanías","zophonías","zóphanías","zóphonías","ágúst","ágústa","ágústína","áki","álfar","álfdís","álfey","álfgeir","álfgerður","álfgrímur","álfheiður","álfhildur","álfrós","álfrún","álfsól","álfur","álfþór","ámundi","árbjartur","árbjörg","árbjörn","árbjört","árdís","árelía","árelíus","árgeir","árgils","árlaug","ármann","ármey","árna","árndís","árney","árnheiður","árni","árnína","árný","ársæl","ársæll","ársól","árveig","árvök","áróra","árún","árþóra","ás","ása","ásberg","ásbergur","ásbjörg","ásbjörn","ásborg","ásdís","ásdór","ásfríður","ásgautur","ásgeir","ásgerður","ásgils","ásgrímur","áshildur","ási","áskatla","áskell","ásla","áslaug","áslaugur","ásleif","áslákur","ásmar","ásmundur","ásný","ásrós","ásröður","ásrún","ást","ásta","ástbjörg","ástbjörn","ástbjört","ástdís","ástfríður","ástgeir","ástgerður","ástheiður","ásthildur","ástmar","ástmundur","ástráður","ástríkur","ástríður","ástrós","ástrún","ástvald","ástvaldur","ástvar","ástveig","ástvin","ástþrúður","ástþór","ástþóra","ásvaldur","ásvarður","ásvör","ásólfur","ásþór","ægileif","ægir","æsa","æsgerður","æsir","ævar","ævarr","ævör","ían","ída","ígor","íma","ími","ína","ír","íren","írena","íris","írunn","ísabel","ísabella","ísadóra","ísafold","ísak","ísalind","ísar","ísarr","ísbjörg","ísbjörn","ísdís","íseldur","ísey","ísfold","ísgeir","ísgerður","íshildur","ísidór","ísidóra","ísis","íslaug","ísleif","ísleifur","íslilja","ísmael","ísmar","ísmey","ísold","ísrael","ísrún","íssól","ísveig","ísól","ísólfur","íunn","íva","ívan","ívar","óda","ófeigur","ófelía","óla","ólaf","ólafur","ólafía","ólafína","ólavía","óli","óliver","ólivía","ólína","ólíver","ólöf","ómar","ómi","ósa","ósk","óskar","ósklín","ósvald","ósvaldur","ósvífur","ótta","óttar","óttarr","óðinn","óðný","ögmunda","ögmundur","ögn","ögri","ölnir","ölrún","ölveig","ölver","ölvir","öndólfur","önundur","örbrún","örk","örlaugur","örlygur","örn","örnólfur","örvar","ösp","össur","öxar","úa","úddi","úlfa","úlfar","úlfdís","úlfey","úlfgeir","úlfheiður","úlfhildur","úlfhéðinn","úlfkell","úlfljótur","úlfrún","úlftýr","úlfur","úlla","úlrik","úna","úndína","úranus","úranía","úrsúla","ýja","ýma","ýmir","ýr","ýrar","ýrr","þalía","þangbrandur","þeba","þengill","þeyr","þeódís","þeódóra","þingey","þinur","þiðrandi","þiðrik","þjálfi","þjóstar","þjóstólfur","þjóðann","þjóðar","þjóðbjörg","þjóðbjörn","þjóðgeir","þjóðhildur","þjóðleifur","þjóðmar","þjóðrekur","þjóðvarður","þjóðólfur","þoka","þollý","þorberg","þorbergur","þorbjörg","þorbjörn","þorbrandur","þorfinna","þorfinnur","þorgarður","þorgautur","þorgeir","þorgerður","þorgestur","þorgils","þorgnýr","þorgríma","þorgrímur","þorgísl","þorkatla","þorkell","þorlaug","þorlaugur","þorleif","þorleifur","þorleikur","þorlákur","þormar","þormundur","þormóður","þorri","þorsteina","þorsteinn","þorstína","þorvaldur","þorvar","þorvarður","þrastar","þrymur","þrá","þráinn","þrándur","þróttur","þröstur","þrúða","þrúðmar","þrúður","þula","þura","þurí","þuríður","þurý","þyri","þyrill","þyrnir","þyrnirós","þyrí","þór","þóra","þóranna","þórar","þórarinn","þórarna","þórbergur","þórbjarni","þórbjörg","þórbjörn","þórdís","þórelfa","þórelfur","þórey","þórfríður","þórgnýr","þórgrímur","þórgunna","þórgunnur","þórhaddur","þórhalla","þórhalli","þórhallur","þórhanna","þórheiður","þórhildur","þóri","þórinn","þórir","þórkatla","þórlaug","þórlaugur","þórleif","þórleifur","þórlindur","þórmar","þórmundur","þórný","þórodda","þóroddur","þórormur","þórsteina","þórsteinn","þórsteinunn","þórstína","þórunn","þórveig","þórvör","þórða","þórður","þórólfur","þórörn","þöll","þúfa"]));
	this.trainingData.push(new _$Main_TrainingData("Irish Forenames","Irish Forenames",["abbán","affraic","agaistín","aibhilín","aibhne","aifric","ailbhe","ailin","ailín","aindriú","aindréas","ainm","ainníleas","aislin","aisling","aislinn","aithche","ambrós","amhalgaidh","amhlaoibh","anluan","anmchadh","anne","antóin","aodh","aodhagán","aodhamair","aodhnait","aodhán","aogán","aoibhe","aoibheann","aoibhin","aoibhinn","aoife","aonghus","ardghal","ardghar","art","artúr","athracht","aíbhinn","bairre","baothghalach","barra","barrdhubh","basil","beacán","bearach","bearchán","bearnárd","beinidict","blanche","blinne","bláth","bláthnaid","bran","breandán","breanndán","breasal","brian","brighdín","brighid","brochadh","bréanainn","bríd","brídín","brónach","buadhach","buadhnait","bébhinn","cacht","cailean","cainneach","cairbre","caitlín","caitrín","caitríona","calbhach","canice","caoilfhionn","caoimhe","caoimhghín","caoimhín","caolán","caomhán","carraig","cathal","cathaoir","cathbharr","catraoine","ceallach","ceallachán","cearbhall","charles","charles","charles","ciamhnait","cian","ciannait","cianán","ciara","ciarán","cillian","cinnéididh","cinnéidigh","cionaodh","ciothruadh","cliodhna","clodagh","clíona","cobhfhlaith","cobhlaith","coilean","coileán","coilín","coinneach","coireall","colla","colm","colmán","colum","comhghall","comhghan","comán","conaire","conall","conchobhar","conchubhar","conchúr","conghalach","conmhac","conn","connla","connlaodh","conán","cormac","cosnamhach","criomthann","críostóir","cróchán","crónán","cuan","cuileán","cuimín","cyril","cárthach","cúchonnacht","cúmhaighe","cúmheadha","dabhag","dabhóg","dainéal","daire","damhnait","damháin","daniel","dara","david","deaglán","dearbhfhorgaill","dearbhfhorghaill","dearbhla","dearbháil","deasmhumhnach","declan","deirdre","denis","dervilia","dianaimh","diarmaid","diarmait","doireann","domhnall","donn","donnchadh","donnchadha","donnán","dorothy","dubhaltach","dubhchobhlaigh","dubhghall","dubhghlas","dubhán","dubhóg","dymphna","dáithí","déaglán","dónall","dúnlang","eachaidh","eachann","eachdhonn","eachthighearn","eamon","earcán","earnait","earnán","easnadh","edwina","eibhlín","eibhlín","eignach","eigneachán","eilín","eilís","eimear","eimer","eimhear","eireamhán","eireamhón","eirnín","eithne","eochaidh","eoghainín","eoghan","eoin","eóin","fachtna","faoiltighearna","faolán","fearadhach","fearchar","fearganainm","fearghal","fearghus","feargus","feary","feichín","feidhelm","feidhlim","felix","fergus","fiach","fiacha","fiachra","fiadhnait","finghin","finian","finnian","fintan","fionghuine","fionn","fionnbharr","fionnghuala","fionntán","fionnuala","fitheal","flann","flann","flannait","flannán","flora","fodhla","forbhlaith","froinsias","fáilbhe","féilim","féthnaid","féthnat","fíneamhain","fíona","garbhán","gearóid","geiléis","glaisne","gobnait","gormfhlaith","gormlaith","grace","granya","greagoir","gráinne","gréagóir","honora","iarfhlaith","iarlaith","iodhnait","irial","iósaf","ióseph","iúdás","jeremiah","john","kyle","labhrás","lachtna","lann","laoighseach","laoiseach","lasairfhíona","lasairian","laurence","lewis","lewis","liam","lochlainn","lochlann","lomán","lonán","lorcán","lubhrás","lughaidh","maeleachlainn","maelsheachlainn","maelíosa","mainchín","mairghréad","mairéad","maitiú","malachy","maodhóg","maoilir","maoilín","maolcholm","maolcholuim","maolmhuire","maolmórdha","maolruadháin","marion","mathghamhain","meabh","meadhbh","mealla","meaveen","meibhín","meidhbhín","miodhnait","mortimer","muadhnait","muircheartach","muireach","muireadhach","muireann","muirgheal","muirgheas","muirinn","muiris","muirne","murchadh","máire","máirtín","máirín","mícheál","míde","móirín","mór","naomhán","naos","neachtan","neasán","niall","niallán","niamh","nioclás","nuala","nóirín","nóra","odharnait","odhrán","oilibhéar","oireachtach","oisín","onóra","oscar","peadar","peig","peigi","peigín","pilib","proinsias","pádraig","póil","pól","raghnailt","raibhilín","rathnait","riain","risteárd","ristéard","roger","roibeard","roibeárd","roibhilín","roibéard","ros","ruadhán","ruaidhri","ruairi","ruairí","ruari","ruaridh","ruarí","ruibhilín","ráichéal","réamann","réamonn","ríoghnach","ríona","ríonach","róis","róisín","rónán","rós","sadhbh","saerbhreathach","saev","saoirse","saorfhlaith","saorla","saorlaith","sarah","seachnasach","seathan","senán","seoirse","seosamh","seán","seárlas","siadhal","siaghal","sinéad","siobhán","sioda","sláine","sorcha","stíofán","suibhne","séadna","séafra","séamas","séamus","séan","séaonin","síle","síomón","síthmaith","tadhg","taichleach","terry","tiarnach","tiarnán","tiernan","tighearnán","tighernach","timothy","tiobóid","toirdhealbhach","toirleach","tomás","torna","treabhair","tuathal","tuathflaith","téodóir","uaithne","uaitéar","ualgharg","uallach","uasal","uilliam","uinseann","ultán","vivian","ágastas","áilís","áine","árdghal","árón","éabha","éadaoin","éadbhárd","éamon","éanna","éanán","éibhear","éignach","éigneachán","éimhear","éimhín","éinde","éireamhón","émer","étaín","íde","órfhlaith","órla","órlaith","úna"]));
	this.trainingData.push(new _$Main_TrainingData("Japanese Forenames","Japanese Forenames",["ai","aiko","aimi","airi","akane","akari","akemi","aki","akie","akifumi","akihiko","akihiro","akihisa","akihito","akiko","akimasa","akimi","akimitsu","akina","akinobu","akinori","akio","akira","akisada","akishige","akito","akitoshi","akitsugu","akiyoshi","akiyuki","amane","ami","anri","anzu","aoi","arata","arihiro","arinaga","arinobu","aritomo","asako","asami","asao","asuka","asuka","asumi","asuna","atomu","atsuhiko","atsuhiro","atsuko","atsumi","atsuo","atsushi","atsuto","atsuya","aya","ayaka","ayako","ayame","ayana","ayane","ayano","ayu","ayuka","ayumi","ayumu","azuma","azumi","azusa","banri","bunji","bunta","chiaki","chie","chieko","chiemi","chiharu","chihiro","chiho","chika","chikara","chikayoshi","chinami","chinatsu","chisato","chitose","chiyako","chiyo","chiyoko","chizuko","chizuru","choki","chōei","chūichi","dai","daichi","daigo","daiki","dairoku","daishin","daisuke","daizō","eiichi","eiichiro","eiji","eijirō","eikichi","eiko","eimi","einosuke","eishun","eisuke","eizō","emi","emiko","emiri","eri","erika","eriko","etsuji","etsuko","fujiko","fujio","fukumi","fumiaki","fumie","fumihiko","fumihiro","fumika","fumiko","fumio","fumito","fumiya","fusako","fusanosuke","fusazane","futoshi","fuyuki","fuyuko","gaku","gakuto","gen'ichi","gen'ichirō","genjiro","genta","gentarō","genzo","giichi","gin","goichi","goro","hachirō","hajime","hakaru","hana","hanae","hanako","haru","haruaki","haruchika","harue","haruhi","haruhiko","haruhiro","haruhisa","haruka","haruki","haruko","harumi","haruna","harunobu","haruo","harutaka","haruto","haruyo","haruyoshi","hatsu","hatsue","hatsuo","hayanari","hayate","hayato","hazuki","heihachirō","heisuke","hideaki","hideharu","hidehiko","hidehito","hideji","hidekazu","hideki","hideko","hidemasa","hidemi","hidemi","hidemitsu","hidenobu","hidenori","hideo","hideshi","hidetaka","hideto","hidetoshi","hidetsugu","hideyo","hideyoshi","hideyuki","hikari","hikaru","himeko","hinata","hiro","hiroaki","hiroe","hirofumi","hirohide","hirohisa","hiroji","hirokatsu","hirokazu","hiroki","hiroko","hirokuni","hiromasa","hiromi","hiromichi","hiromitsu","hiromori","hiromu","hironari","hironobu","hironori","hiroshi","hiroshige","hirotaka","hirotami","hiroto","hirotoki","hirotomo","hirotoshi","hirotsugu","hiroya","hiroyasu","hiroyo","hiroyoshi","hiroyuki","hisae","hisahito","hisako","hisamitsu","hisamoto","hisanobu","hisanori","hisao","hisashi","hisataka","hisateru","hisato","hisaya","hisaya","hisayasu","hisayo","hisayoshi","hisayuki","hitomi","hitoshi","hokuto","honami","hotaru","hozumi","ichiei","ichiko","ichirō","ichizō","iehisa","iemasa","iemon","iesada","ikko","ikue","ikumi","ikuo","ikurō","iori","ippei","isami","isamu","isao","issei","itaru","itsuki","itsuko","itsumi","iwao","izumi","jiichirō","jin","jin'ichi","jinpachi","jiro","jitsuko","jun","jun'ichirō","jun'ya","junichi","junji","junki","junko","junpei","junzō","jōichirō","jōji","jōkichi","jōtarō","jūbei","jūkichi","jūshirō","jūtarō","jūzō","kaede","kagami","kagemori","kagetaka","kaguya","kaho","kahoru","kaiji","kaito","kakichi","kaku","kakuji","kan'ichi","kana","kanae","kanako","kaname","kanehira","kanehiro","kanematsu","kanemoto","kanesuke","kanetake","kaneto","kanetsugu","kaneyoshi","kankuro","kansuke","kaori","kaoru","karin","kasumi","katsuaki","katsuei","katsuhiko","katsuhiro","katsuhisa","katsuhito","katsuji","katsuki","katsukiyo","katsuko","katsumasa","katsumi","katsumoto","katsunaga","katsunari","katsunori","katsunosuke","katsuo","katsushi","katsusuke","katsutarō","katsuteru","katsutomo","katsutoshi","katsuya","katsuyoshi","katsuyuki","kawai","kayo","kayoko","kazu","kazuaki","kazue","kazuharu","kazuhiko","kazuhiro","kazuhisa","kazuhito","kazuki","kazuko","kazuma","kazumasa","kazumi","kazunari","kazunori","kazuo","kazuoki","kazurō","kazusa","kazushi","kazushige","kazutaka","kazuto","kazutoki","kazutoshi","kazuya","kazuyo","kazuyoshi","kazuyuki","kei","keigo","keiichi","keiichirō","keiji","keijirō","keijū","keiki","keiki","keiko","keinosuke","keishi","keisuke","keita","keizō","ken","ken'ichi","ken'ichirō","ken'yū","kengo","kenji","kenjirō","kenki","kenkichi","kensaku","kenshin","kensuke","kenta","kentaro","kento","kenzo","kesao","kihachi","kihachirō","kihei","kiichirō","kiko","kikue","kikuko","kikuo","kimiko","kimio","kimiya","kin'ichi","kin'ichirō","kin'ya","kinji","kinjirō","kintaro","kira","kisaburō","kishō","kiyoaki","kiyofumi","kiyohide","kiyohiko","kiyohiro","kiyoji","kiyokazu","kiyoko","kiyomoto","kiyonari","kiyonori","kiyoshi","kiyosue","kiyotaka","kiyotake","kiyoyuki","kogorō","koharu","koji","kojiro","konomi","koson","kotaro","kotomi","kotori","kouta","koya","kozue","kumatarō","kumi","kumiko","kuniaki","kunie","kunihiko","kunihiro","kunihisa","kuniko","kunimitsu","kunio","kunitake","kuniyuki","kuranosuke","kurenai","kurumi","kusuo","kyo","kyoko","kyukichi","kyōhei","kyōichi","kyōji","kyōsuke","kōhei","kōichi","kōichirō","kōki","kōkichi","kōnosuke","kōsaku","kōsei","kōshirō","kōsuke","kōzō","maaya","machi","machiko","madoka","mahiro","maho","maiko","maki","makiko","makio","mako","makoto","mami","mamiko","mamoru","mana","manabu","manami","manjirō","mantarō","mao","mareo","mari","mariko","marié","masaaki","masabumi","masachika","masae","masafumi","masaharu","masahide","masahiko","masahiro","masahisa","masahito","masaichi","masaie","masaji","masakage","masakatsu","masakazu","masaki","masako","masakuni","masami","masamichi","masamitsu","masamori","masamune","masamura","masanao","masanobu","masanori","masao","masaomi","masaru","masashi","masashige","masataka","masatake","masatane","masateru","masato","masatomo","masatoshi","masatsugu","masaya","masayoshi","masayuki","masazumi","masumi","masuo","masuzō","matabei","matsuchi","matsuki","matsuko","matsuo","matsushige","mayako","mayu","mayuko","mayumi","mayura","megu","megumi","mei","meiko","meisa","michiaki","michiharu","michihiko","michihiro","michihisa","michiko","michinori","michio","michiru","michirō","michitaka","michitarō","michiya","michiyo","michiyoshi","midori","mie","mieko","miho","miiko","mika","mikako","miki","mikiko","mikio","mikoto","miku","mikuni","mikuru","mimori","mina","minae","minako","minami","mineichi","mineko","mineo","minori","mirai","misaki","misako","misao","misato","mitsuaki","mitsugi","mitsugu","mitsuharu","mitsuhide","mitsuhiko","mitsuhira","mitsuhiro","mitsuhisa","mitsuki","mitsuko","mitsumasa","mitsumori","mitsunobu","mitsunori","mitsuo","mitsuomi","mitsuru","mitsusuke","mitsutaka","mitsuteru","mitsutoshi","mitsuyasu","mitsuyo","mitsuyo","mitsuyoshi","mitsuyuki","miu","miwa","miwako","miyabi","miyako","miyoko","miyu","miyuki","miyumi","miyū","mizuho","mizuki","mizuko","mochiaki","moe","mokichi","momo","momoe","momoka","momoko","morihiko","morihiro","morikazu","morimasa","morio","moritaka","mosuke","motoaki","motoharu","motohiko","motohiro","motoichi","motojirō","motoki","motoko","motomu","motonobu","motoshi","motoshige","motosuke","mototada","mototsugu","motoyasu","motoyuki","motozane","mukuro","munehiro","munemori","munenobu","munenori","muneo","muneshige","munetaka","munetoki","munetoshi","murashige","mutsuko","mutsumi","mutsuo","nagaharu","nagahide","nagako","nagamasa","nagamichi","naganao","naganori","nagatoki","nagatomo","nagisa","nami","namio","nana","nanako","nanami","nanase","nankichi","nao","naofumi","naohiko","naohiro","naohisa","naohito","naoji","naokatsu","naoki","naoko","naomasa","naomi","naomichi","naomori","naoshi","naotaka","naotake","naoto","naoya","naoyuki","naozumi","nariaki","nariakira","naritaka","nariyasu","nariyuki","naruhisa","naruhito","narumi","natsue","natsuki","natsuko","natsume","natsumi","noa","noboru","nobuaki","nobuatsu","nobuharu","nobuhiko","nobuhiro","nobuhisa","nobuhito","nobukatsu","nobukazu","nobuko","nobumasa","nobumitsu","nobumoto","nobunao","nobunari","nobuo","nobusada","nobusuke","nobutaka","nobuteru","nobutoki","nobutomo","nobutoshi","nobutsuna","nobuyasu","nobuyoshi","nobuyuki","nodoka","noriaki","norifumi","norifusa","norihiko","norihiro","norihito","norikazu","noriko","norimasa","norio","noriyasu","noriyo","noriyoshi","noriyuki","nozomi","nozomu","okimoto","okitsugu","omi","osamu","otoha","otohiko","otome","raizo","ran","rei","reiichi","reiji","reika","reiko","reizō","ren","rena","rentarō","rie","rieko","riho","riichi","rika","rikichi","rikiya","riku","rin","rina","rinshō","risa","ritsuko","rokurō","rumi","rumiko","runa","ruri","ruriko","ryoko","ryu","ryō","ryōhei","ryōichi","ryōji","ryōka","ryōma","ryōsei","ryōsuke","ryōta","ryōtarō","ryōzō","ryūhei","ryūichi","ryūji","ryūki","ryūnosuke","ryūsaku","ryūsei","ryūsuke","ryūta","ryūtarō","ryūya","ryūzō","saburō","sachie","sachiko","sachio","sadaaki","sadaharu","sadahiko","sadako","sadao","sadatoshi","sadayoshi","sadazane","saeko","saiichi","sakae","saki","sakichi","sakie","sakiko","sakura","sakurako","sanae","saori","satoko","satomi","satonari","satoru","satoshi","satsuki","satsuo","sawako","saya","sayaka","sayako","sayoko","sayumi","sayuri","seigen","seigo","seihō","seiichi","seiichirō","seiji","seijin","seijirō","seikichi","seiko","seishi","seishirō","seiya","seizō","senkichi","setsuko","setsuna","shichirō","shigeaki","shigefumi","shigeharu","shigehiro","shigehisa","shigekazu","shigeki","shigeko","shigemasa","shigematsu","shigemi","shigemitsu","shigenaga","shigenobu","shigenori","shigeo","shigeri","shigeru","shigetada","shigetaka","shigeto","shigetoshi","shigeyasu","shigeyoshi","shigeyuki","shiho","shiina","shikō","shimako","shin","shin'ichi","shin'ichirō","shinako","shingo","shinji","shinjirō","shinjō","shinkichi","shino","shinobu","shinpei","shinsaku","shinsuke","shinta","shintarō","shinya","shinzō","shion","shiori","shizue","shizuka","shizuko","shizuo","shoko","shuko","shuko","shun","shun'ichi","shun'ichirō","shun'ya","shunji","shunkichi","shunpei","shunsaku","shunsuke","shuntarō","shunzō","shō","shōgo","shōhei","shōichi","shōji","shōjirō","shōma","shōsuke","shōta","shōtarō","shōya","shōzō","shūgo","shūhei","shūichi","shūji","shūsaku","shūsuke","shūta","shūzō","sonosuke","sora","subaru","suehiro","suguru","sukehiro","sukemasa","suketoshi","suketsugu","sumika","sumiko","sumio","sumire","sumiyoshi","sunao","susumu","suzue","suzuko","sōgen","sōichi","sōichirō","sōji","sōsuke","sōtarō","tadaaki","tadachika","tadafumi","tadaharu","tadahiko","tadahiro","tadahito","tadakatsu","tadamasa","tadami","tadamori","tadanaga","tadanao","tadanari","tadanobu","tadanori","tadao","tadaoki","tadashi","tadataka","tadateru","tadatomo","tadatoshi","tadatsugu","tadatsune","tadayo","tadayoshi","tadayuki","taeko","taichi","taichirō","taiga","taiichi","taiji","taiki","taishi","taisuke","taka","takaaki","takafumi","takahide","takahiko","takahiro","takahisa","takahito","takaki","takako","takamasa","takamitsu","takanobu","takanori","takao","takashi","takatomi","takatoshi","takatsugu","takauji","takaya","takayasu","takayoshi","takayuki","takeaki","takefumi","takeharu","takehiko","takehiro","takehisa","takehito","takeichi","takejirō","takeko","takenaga","takenori","takeo","takeru","takeshi","taketo","taketora","taketoshi","takeya","takeyoshi","takezō","taku","takuji","takuma","takumi","takuo","takurō","takuto","takuya","takuzō","tamaki","tamao","tamiko","tamio","tamotsu","tarō","tateo","tatsuaki","tatsuhiko","tatsuhiro","tatsuhito","tatsuji","tatsuko","tatsuma","tatsumi","tatsunori","tatsuo","tatsurō","tatsushi","tatsuya","tatsuyoshi","tatsuyuki","teiji","teijirō","teiko","teiko","teizō","teppei","teru","teruaki","teruhiko","teruhisa","teruko","terumasa","terumi","terunobu","teruo","teruyoshi","teruyuki","tetsu","tetsuharu","tetsuji","tetsumasa","tetsuo","tetsurō","tetsushi","tetsutarō","tetsuya","tetsuzō","togo","tokihiko","tokiko","tokio","tokuji","tokujirō","tokuko","tokuo","tokurō","tokutarō","tomiko","tomio","tomo","tomoaki","tomochika","tomoe","tomoharu","tomohide","tomohiko","tomohiro","tomohisa","tomohito","tomoji","tomoka","tomokazu","tomoki","tomoko","tomomi","tomomichi","tomonobu","tomonori","tomotaka","tomoya","tomoyasu","tomoyo","tomoyoshi","tomoyuki","torahiko","toru","toshi","toshiaki","toshiharu","toshihide","toshihiko","toshihiro","toshihisa","toshihito","toshikatsu","toshikazu","toshiki","toshiko","toshimasa","toshimi","toshimichi","toshimitsu","toshinaga","toshinari","toshinobu","toshinori","toshio","toshirō","toshitada","toshitaka","toshitsugu","toshiya","toshiyasu","toshiyuki","toshizō","toyoaki","toyohiko","toyokazu","toyoko","toyomatsu","toyoshige","toyozō","tsubasa","tsugio","tsukasa","tsuneharu","tsunehisa","tsunejirō","tsuneko","tsunemi","tsunenori","tsuneo","tsuneyoshi","tsuneyuki","tsutomu","tsuyoshi","umanosuke","umeji","umeko","wakako","wataru","yaeko","yahiko","yahiro","yanosuke","yasuaki","yasue","yasufumi","yasuharu","yasuhide","yasuhiko","yasuhiro","yasuhisa","yasuji","yasujirō","yasukazu","yasuki","yasuko","yasumasa","yasumi","yasumichi","yasunari","yasunobu","yasunori","yasuo","yasurō","yasushi","yasutaka","yasutomo","yasutoshi","yasuyoshi","yasuyuki","yatarō","yayoi","yoko","yorimitsu","yorinobu","yorishige","yoritaka","yoritsugu","yoritsune","yoriyuki","yoshi","yoshifumi","yoshihide","yoshihiko","yoshihiro","yoshihisa","yoshihito","yoshiie","yoshika","yoshikane","yoshikatsu","yoshikazu","yoshiki","yoshikiyo","yoshiko","yoshikuni","yoshimasa","yoshimatsu","yoshimi","yoshimichi","yoshinaga","yoshinao","yoshinari","yoshino","yoshinobu","yoshinori","yoshio","yoshirō","yoshisada","yoshishige","yoshisuke","yoshitaka","yoshitake","yoshitarō","yoshiteru","yoshito","yoshitomo","yoshitsugu","yoshiya","yoshiyasu","yoshiyuki","yugi","yugo","yui","yuka","yukari","yuki","yukie","yukiharu","yukihiko","yukihiro","yukiko","yukimasa","yukimura","yukina","yukinobu","yukinori","yukio","yukitaka","yukito","yukiya","yumeko","yumi","yumika","yumiko","yuri","yurie","yurika","yuriko","yurina","yutaka","yuzuru","yō","yō","yōhei","yōichi","yōichirō","yōji","yōjirō","yōsuke","yōta","yōzō","yū","yūdai","yūhei","yūichi","yūichirō","yūji","yūjirō","yūkichi","yūko","yūsaku","yūsei","yūshi","yūsuke","yūta","yūtarō","yūto","yūya","yūzō","zenjiro","zenkichi","zentarō","zenzō"]));
	this.trainingData.push(new _$Main_TrainingData("Languages","Languages",["afrikaans","arabic","belarusian","bengali","bosnian","bulgarian","catalan","cherokee","chinese","croatian","czech","danish","dutch","english","estonian","filipino","finnish","french","german","greek","hawaiian","hebrew","hungarian","indonesian","italian","japanese","korean","latvian","lithuanian","malay","moldavian","norwegian","persian","polish","pomeranian","portuguese","romani","romanian","russian","serbian","slovak","slovenian","somali","spanish","swedish","thai","turkish","ukranian","uzbek","vietnamese"]));
	this.trainingData.push(new _$Main_TrainingData("Musical Instruments","Musical Instruments",["accordion","airhorn","arpeggione","autoharp","bagpipes","bass","bassdrum","bassethorn","bassflute","bassguitar","bongo","bugle","bullroarer","celesta","clapsticks","clarinet","clavinet","cornet","crumhorn","doublebass","drum","drumkit","electricguitar","euphonium","flugelhorn","flumpet","flute","flutina","glockenspiel","guitar","handpan","harmonica","harp","harpsichord","horn","keyboard","lute","lyre","marimba","obo","oud","piano","piccolo","pipe","pitchpipe","psaltery","recorder","saxhorn","saxophone","saxotromba","saxtuba","steelpan","tinwhistle","triangle","trombone","trumpet","trumpet","tuba","turntable","vibraphone","viola","violin","violino","wheelharp","wobbleboard","woodblock","xylophone"]));
	this.trainingData.push(new _$Main_TrainingData("Norse Deity Forenames","Norse Deity Forenames",["baduhenna","baldr","beyla","bil","bragi","brynhildr","dellingr","eir","eir","forseti","freyja","freyr","frigg","fulla","gefjun","geirahöð","geiravör","geirdriful","geirskögul","geirönul","gersemi","gerðr","gná","gullveig","gunnr","guðr","göll","göndul","hariasa","heimdallr","herfjötur","herja","hermóðr","hervör","hildr","hjalmþrimul","hjörþrimul","hlaðguðr","hlín","hlökk","hnoss","hretha","hrist","hrund","höðr","hœnir","ilmr","irpa","iðunn","kára","lofn","loki","lóðurr","meili","mist","máni","nanna","nerthus","njörun","njörðr","odin","randgríðr","reginleif","rindr","rán","ráðgríðr","róta","sandraudiga","sanngriðr","saxnōt","sif","sigrdrífa","sigrún","sigyn","sinthgunt","sjöfn","skalmöld","skaði","skeggöld","skuld","skögul","snotra","sveið","svipul","syn","sága","sól","tanfana","thor","týr","ullr","vili","viðarr","váli","vár","vé","vör","zisa","óðr","ölrún","þorgerðr","þrima","þrúðr","þrúðr","þögn","ēostre"]));
	this.trainingData.push(new _$Main_TrainingData("Places In Cumbria","Places In Cumbria",["abbeytown","ackenthwaite","adgarley","aglionby","aiketgate","aikhead","aikshaw","aikton","ainstable","aisgill","albyfield","aldingham","aldoth","allenwood","allerdale","allerdale","allhallows","allithwaite","allonby","alston","alstonmoor","ambleside","angerton","annaside","anthorn","appleby","applethwaite","arkleby","arlecdon","armaside","armathwaite","arnaby","arnside","arradfoot","arthuret","asby","ashgill","askerton","askham","aspatria","aughertree","ayside","backbarrow","baggrow","baldwinholme","bampton","bamptongrange","bandrakehead","banks","barbergreen","barbon","barclose","bardsea","barepot","barras","barrow","barrowisland","barrowsgreen","barton","bassenthwaite","baycliff","bayles","beanthwaite","beaumont","beckbottom","beckces","beckermet","beckfoot","beckhead","beckside","beetham","belah","bellevue","berrier","bewaldeth","bewcastle","biggar","biglands","birkby","birkerthwaite","blackbeck","blackcombe","blackdyke","blackford","blackpoolgate","blackwell","blagill","blawith","bleatarn","blencarn","blencogo","blencow","blindbothel","blindcrake","blitterlees","bolton","boltongate","boltonlowhouses","boltonnewhouses","boltons","boltonwoodlane","bomby","bonninggate","boot","bootle","borrowdale","botcherby","bothel","bousteadhill","bouth","bowlandbridge","bowmanstead","bowscale","bowston","brackenber","brackenlands","brackenthwaite","braithwaite","brampton","brandlingill","bransty","branthwaite","brathay","braystones","braytonpark","bretherdalehead","bridekirk","bridgefield","bridgefoot","briery","brigham","brigsteer","brisco","briscoe","broadoak","broadwath","brockleymoor","bromfield","broom","brothybeck","brough","brougham","broughsowerby","broughton","broughtonbeck","broughtoncross","broughtoneast","broughtonmills","broughtonmoor","broughtonwest","brownber","browtop","brunstock","brunthwaite","buckabank","bullgill","burghbysands","burneside","burnrigg","burrells","burtholme","burthwaite","busk","buttermere","butterwick","caldbeck","calder","calderbridge","calthwaite","calva","cambeckbridge","camerton","canalfoot","cardew","cardewlees","cardurnock","cargo","cark","carlatton","carlisle","carrbank","cartmel","cartmelfell","carwinley","casterton","castlecarrock","castlesowerby","castletown","catbank","catlowdy","catterlen","causewayend","causewayhead","cautley","chalkfoot","chapel","chapelstile","chestnuthill","churchbrough","claife","clappersgate","clawthorpe","cleabarrow","cleator","cleatormoor","cliburn","clifton","cliftondykes","cockermouth","cocklake","cockleybeck","colby","coldbeck","colthouse","colton","commonend","coniston","corbyhill","corkickle","corney","cotehill","cotes","coulderton","coupland","cowenhead","cowgill","crackenthorpe","croasdale","crofton","croglin","crook","crooklands","crosby","crosbygarrett","crosbyravensworth","crosbyvilla","croslandspark","crosscanonby","crossend","crossgates","crosslands","crosthwaite","culgaith","cumbria","cumdivock","cummersdale","cumrew","cumwhinton","cumwhitton","currock","dacre","dale","dalebottom","dalemain","dalston","dalton","dean","deanscales","dearham","deepthwaite","dendron","dent","dentonholme","distington","dockray","dovenby","downhall","dragleybeck","drigg","drumburgh","drumleaning","drybeck","dubwath","duddonbridge","dufton","dundraw","dungeonghyll","durdar","dykesfield","eaglesfield","eamontbridge","eastcurthwaite","edderside","edenhall","edentown","egremont","egtonwithnewland","ellenborough","ellonby","elterwater","embleton","endmoor","ennerdalebridge","eskdale","eskdalegreen","eskett","etterby","ewanrigg","fairhill","fararnside","farend","farlam","farleton","farsawrey","faugh","fawcettforest","fellside","fenton","fieldbroughton","fingland","finsthwaite","firbank","fletchertown","flimby","flitholme","flookburgh","floristonrigg","forceforge","foresthead","fornside","fothergill","foulbridge","foxfield","frizington","gaisgill","galligill","gamblesby","gamelsby","garlands","garnettbridge","garrigill","garsdale","garsdalehead","garthrow","garths","gatebeck","gatefoot","gatesgarth","gawthrop","gawthwaite","geltsdale","gilcrux","gilsland","glasson","glasson","glassonby","gleaston","glencoyne","glenridding","goadsbarrow","goodyhills","goosegreen","gosforth","grangefell","grasmere","grassgarth","grayrigg","graysongreen","greatasby","greatblencow","greatbroughton","greatclifton","greatcorby","greatcrosthwaite","greatlangdale","greatmusgrave","greatormside","greatorton","greatsalkeld","greatstrickland","greaturswick","greenbank","greengill","greenhead","greenhill","greenholme","greenodd","greenquarter","greenrow","greenwell","greysouthen","greystoke","greystone","grinsdale","grisedale","grizebeck","grizedale","gullomholme","hackthorpe","haile","hailforth","hale","halfpenny","hallbankgate","hallbeck","halldunnerdale","hallowbank","hallsanton","hallthwaites","hallwaberthwaite","haltcliff","hampsfield","hardendale","haresceugh","harker","harkermarsh","harraby","harrington","harriston","hartley","hartsop","hassness","haverigg","haverthwaite","hawcoat","hawksdale","hawkshead","hawksheadhill","hawsbank","hayton","hayton","hazelrigg","hazelslack","headsnook","heaning","heathwaite","hegglelane","helbeck","helsington","helton","helvellyn","hensingham","hesket","hethersgill","highbankhill","highbewaldeth","highbiggins","highbridge","highcasterton","highcrosby","highcunsey","highgreen","highhesket","highhill","highireby","highknipe","highlaws","highlorton","highmoor","highnewton","highoaks","highrigg","highrow","highscales","highside","highwray","hilltop","hilton","hincaster","hodbarrow","holker","hollins","holme","holmeabbey","holmelow","holmrook","holmwrangle","honisterpass","hopebeck","hornsby","houghton","how","howgate","howgill","hugill","hunsonby","hurst","hutton","huttonend","huttonsoil","hycemoor","hyton","ireleth","irthington","isel","ivegill","jericho","johnby","kaber","keekle","keisley","kelbarrow","keld","kelleth","kells","kelsick","kendal","kentmere","kentrigg","kentsbank","keswick","killington","kilnhill","kingmoor","kingsmeaburn","kingstown","kingwater","kinkryhill","kirkbampton","kirkhouse","kirklandguards","kirklinton","kirklintonmiddle","kirkoswald","kirksanton","lakeside","lambfoot","langdale","langwathby","leadgate","leasgill","legburthwaite","lessonhall","levens","littlebeck","littlebroughton","littleclifton","littlelangdale","littletown","lockhills","longburgh","longlands","longmarton","longpark","longthwaite","loweswater","lowick","lowther","martindale","mawbray","mealbank","mealsgate","melmerby","micklethwaite","middleton","midgeholme","milburn","millom","milnthorpe","milton","mockerkin","monkhill","moorrow","moresby","morland","morton","mosedale","muncaster","mungrisdale","murton","nateby","natland","nearsawrey","nenthall","nenthead","nethertown","netherwasdale","newcowper","newhutton","newland","newlands","newton","newtonarlosh","newtonreigny","newtonrigg","newtown","northdykes","northscale","oddendale","oldhutton","ormside","orthwaite","orton","oughterside","oulton","ousby","outhgill","oxenholme","oxenpark","papcastle","parsonby","parton","patterdale","pennington","penrith","penruddock","petterilgreen","pielisland","plumbland","plumpton","ponsonby","pooleybridge","rampside","raughtonhead","ravenglass","ravenstonedale","renwick","rickerby","roanhead","rockcliffe","roose","roosebeck","rosside","rosthwaite","roundthwaite","ruckcroft","ruleholme","rusland","rydal","sadgill","santonbridge","satterthwaite","scaleby","scalebyhill","scotby","seascale","seathwaite","seatoller","seaton","sedbergh","sedgwick","selside","shap","shoregill","siddick","silecroft","silloth","silverband","skelton","skelwithbridge","skinburness","skirwith","skitby","slackhead","smithfield","sockbridge","southwaite","sparkbridge","stair","stanah","stapleton","staveley","stbees","stockdalewath","stonehouse","sunderland","swarthmoor","swindale","tarns","templesowerby","thiefside","thornhill","thornthwaite","threapland","threlkeld","thursby","thwaites","tirril","todhills","torpenhow","torver","troutbeck","troutbeckbridge","uldale","ulpha","ulverston","underbarrow","underskiddaw","upperdenton","upton","vickerstown","waberthwaite","walton","warcop","warwickbridge","wasdale","wasdalehead","watchgate","watendlath","watermillock","waverton","westnewton","westward","wetheral","wetsleddale","whale","whicham","whitehaven","wiggonby","wigton","wilton","windermere","winscales","winton","witherslack","wolsty","woodend","woodend","woodland","workington","wreay","wythburn","wythopmill","yanwath","yarlside","yearngill","yottenfews"]));
	this.trainingData.push(new _$Main_TrainingData("Plants (Common Names)","Plants (Common Names)",["africanrice","alder","almond","ambrosia","amyroot","apple","apricot","arfaj","arrowwood","ash","ashleavedmaple","asianrice","azolla","babyrose","bamboo","banana","bankcress","baobab","bay","baylaurel","bean","bearberry","bearcorn","beech","bermudacress","bindweed","birch","birdsnest","bittercress","bittersweet","bitterweed","blackalder","blackash","blackberry","blackbirch","blackcap","blackcherry","blackhaw","blackiehead","blackmaple","blackoak","blackraspberry","blackweed","blueash","blueberry","blueoak","boleanbirch","bowwood","box","boxelder","boxwood","brier","brittlebush","broadleaf","brownbetty","buckeye","buffaloweed","bulbouscress","bullnettle","buroak","butterflyweed","cabbage","caneash","canoebirch","carrot","carrotweed","championoak","cherry","cherrybirch","chestnut","chiggerflower","christmasfern","chrysanthemum","cinnamon","clove","clover","clumpfoot","coakum","coastliveoak","coconut","coffeeplant","colicweed","collard","colwort","commonalder","coneflower","corkoak","cornel","cornelian","cornsowthistle","cornthistle","corydalis","cottonplant","creekmaple","cress","crowfoot","crowsnest","crowstoes","cucumber","cursedthistle","cutleafmaple","daisy","damerocket","deadlynightshade","deadnettle","devilsbite","devilsnose","devilsplague","dewberry","dindle","dogwood","drumstick","duckretten","duscle","dyeleaves","dyersoak","earthgall","eucalyptus","eytelia","falsealder","falsebox","fellenwort","felonwood","felonwort","fennel","ferns","feverbush","feverfew","fig","flax","fluxroot","fumewort","gallberry","garget","garlic","garlicmustard","garlicroot","gilliflower","goldenbuttons","goldengarlic","goldenglow","goosetongue","gordaldo","grapefruit","grapevine","grayalder","graybirch","greenash","greenthistle","groundberry","gutweed","haldi","hardthistle","haresthistle","harlequin","hayfever","healingblade","hedgeplant","hellebore","hemp","hempdogbane","henplant","hogweed","holly","honeymesquite","horsecane","horsenettle","houndsberry","houseleek","huckleberry","indianhemp","indianposy","inkberry","inkberryholly","ironwood","islandoak","itchweed","ivy","jackinthebush","jalap","judastree","juneberry","juniper","keek","kinnikinnik","kousa","kudzu","laceflower","lambscress","lambsfoot","landcress","lavender","leek","lemon","lettuce","lilac","lilyleek","lovevine","lowrose","mahoganybirch","maize","mango","maple","mapleash","mapleash","meadowholly","mesquite","milfoil","milkthistle","milkweed","milkytassel","mirbeckoak","moosemaple","moosewood","morel","mosquitofern","mulberry","neem","nettle","nightshade","noddingthistle","northernoak","nosebleed","oak","olive","onion","orangeroot","osage","osageapple","paperbirch","parsley","parsnip","pea","peach","peanut","pear","pellitory","pennyhedge","pepperroot","perennialthistle","pigeonberry","pine","pineapple","pinoak","pistachio","plane","plantain","pleurisyroot","poisonberry","poisonflower","poisonivy","poke","pokeroot","pokeweed","polecatweed","polkweed","poplar","poppy","possumhaw","potato","prairierose","pricklythistle","pudina","purpleraspberry","quercitron","radicalweed","ragweed","ragwort","ramblerrose","rantipole","rapeseed","raspberry","redash","redbirch","redbrush","redbud","redmulberry","redoak","redweed","rheumatismroot","rhubarb","ribwort","rice","riverash","riverbirch","rivermaple","roadweed","rocket","rocketcress","rose","rosemary","rumcherry","rye","sandbrier","sanguinary","saskatoon","scarletberry","scoke","scotchcap","scruboak","scurvycress","scurvygrass","serviceberry","shadblow","shadbush","silkweed","silverbirch","silvermaple","skunkcabbage","skunkweed","snakeberry","sneezeweed","sneezewort","snowdrop","softmaple","sorrel","sowthistle","spanishoak","speckledalder","speedwell","spicebirch","spoolwood","spottedoak","springcress","squawbush","stagbush","stammerwort","stickweed","strawberry","stripedalder","stripedmaple","sugarcane","sugarmaple","sugarplum","summerlilac","sunflower","swallowwort","swallowwort","swampash","swampcabbage","swampholly","swampmaple","swampoak","swampsilkweed","sweetbirch","sweetpotato","sweetrocket","swinethistle","swinies","swordferns","sycamore","tansy","tasselweed","tea","thimbleberry","thimbleweed","thistle","thousandleaf","thousandseal","thyme","tickleweed","tobaccoplant","tomato","toothwort","touchmenot","treadsoftly","treeonion","trillium","tuberroot","tulip","tulsi","uplandcress","valleyoak","vanillaorchid","viburnum","violet","violetbloom","virginbower","wakerobin","walnut","waterash","waterbirch","waterfern","watermaple","waybread","waythistle","weepingbirch","weepingbirch","wheat","whitealder","whiteash","whitebirch","whitebirch","whitemaple","whitemulberry","whiteoak","whiteroot","whitetansy","wildblackcherry","wildcherry","wildcotton","wildgarlic","wildhops","wildrose","wildtansy","willow","windroot","wineberry","winterberry","wintercress","winterrocket","woodbine","woodynightshade","wormwood","woundrocket","woundwort","yam","yarrow","yellowbirch","yellowdaisy","yellowfumewort","yellowrocket","yellowwood","zedoary"]));
	this.trainingData.push(new _$Main_TrainingData("Pokemon","Pokemon",["abra","aerodactyl","alakazam","arbok","arcanine","articuno","beedrill","bellsprout","blastoise","bulbasaur","butterfree","caterpie","chansey","charizard","charmander","charmeleon","clefable","clefairy","cloyster","cubone","dewgong","diglett","ditto","dodrio","doduo","dragonair","dragonite","dratini","drowzee","dugtrio","eevee","ekans","electabuzz","electrode","exeggcute","exeggutor","farfetchd","fearow","flareon","gastly","gengar","geodude","gloom","golbat","goldeen","golduck","golem","graveler","grimer","growlithe","gyarados","haunter","hitmonchan","hitmonlee","horsea","hypno","ivysaur","jigglypuff","jolteon","jynx","kabuto","kabutops","kadabra","kakuna","kangaskhan","kingler","koffing","krabby","lapras","lickitung","machamp","machoke","machop","magikarp","magmar","magnemite","magneton","mankey","marowak","meowth","metapod","mew","mewtwo","mime","moltres","muk","nidoking","nidoqueen","nidoran","nidoran","nidorina","nidorino","ninetales","oddish","omanyte","omastar","onix","paras","parasect","persian","pidgeot","pidgeotto","pidgey","pikachu","pinsir","poliwag","poliwhirl","poliwrath","ponyta","porygon","primeape","psyduck","raichu","rapidash","raticate","rattata","rhydon","rhyhorn","sandshrew","sandslash","scyther","seadra","seaking","seel","shellder","slowbro","slowpoke","snorlax","spearow","squirtle","starmie","staryu","tangela","tauros","tentacool","tentacruel","vaporeon","venomoth","venonat","venusaur","victreebel","vileplume","voltorb","vulpix","wartortle","weedle","weepinbell","weezing","wigglytuff","zapdos","zubat"]));
	this.trainingData.push(new _$Main_TrainingData("Roman Deity Forenames","Roman Deity Forenames",["abeona","abudantia","adeona","aequitas","aera","aeternitas","africus","alemonia","angerona","angita","anna","antevorte","aphrodite","apollo","aquilo","ares","artemis","asclepius","athena","attis","aurora","auster","bacchus","bellona","bona","bubona","camenaees","candelifera","cardea","carmenta","carnea","ceres","cinxia","clementia","cloacina","coelus","concordia","conditor","consus","convector","copia","corus","cunina","cupid","cybele","dea","dea","decima","demeter","devera","deverra","dia","diana","dis","disciplina","discordia","dius","egestes","empanda","endovelicus","eventus","fabulinus","fama","fauna","faunus","faunus","faustitas","favonius","febris","felicitas","feronia","fides","flora","fontus","fornax","fortuna","fulgora","furies","furina","hephaestus","hera","hercules","hermes","hestia","honos","indivia","isis","janus","juno","jupiter","juturna","juventas","lactans","lares","laverna","liber","libera","liberalitas","libertas","libitina","lima","lucifer","lucina","luna","maia","maiesta","manes","mania","mars","matuta","meditrina","mefitas","mellona","mena","menrva","mens","mercury","messor","minerva","mithras","moneta","mors","morta","muta","mutinus","naenia","necessitas","nemestrinus","neptune","nona","nox","nundina","obarator","occator","ops","orbona","orcus","pales","parcaes","pax","penates","picus","pietas","poena","pomona","portunes","porus","poseidon","postverta","potina","priapus","prorsa","providentia","pudicitia","puta","quirinus","quiritis","robigo","robigus","roma","rumina","salus","sancus","saritor","saturn","securitas","semonia","serapis","silvanus","sol","sol","somnus","sors","spes","stata","stimula","strenua","suadela","subrincinator","summanus","tellus","tempestes","terminus","terra","trivia","vacuna","veiovis","venus","veritas","vertumnus","vesta","victoria","viduus","viriplacaa","virtus","vitumnus","volturnus","volumna","vulcan","vulturnus","zeus"]));
	this.trainingData.push(new _$Main_TrainingData("Scottish Surnames","Scottish Surnames",["aileanach","ailpeanach","allanach","ambarsan","andarsan","anndrasdan","arasgain","baran","barrach","beitean","bhodhsa","bhàsa","blacach","blàr","blàrach","bochanan","boid","breac","breathnach","brothaigh","bruis","brus","bràigheach","brùn","buideach","buidheach","buids","buiseid","bànach","bòideach","cailbhin","caileanach","caimbeul","caimbeulach","camran","camshron","camshronach","cananach","canonach","caoidheach","caolaisdean","catach","catan","catanach","ceallach","ceanadach","ceannaideach","cearrach","ceiteach","ciar","ciarach","ciogach","coineagan","crannach","creag","criatharach","cuimeanach","cuimein","cuimeineach","càidh","cèamp","cèampach","còmhan","dalais","deòir","deòireach","druimeanach","druimein","druimeineach","druiminn","dubh","dubhach","dunaid","dunaidh","dòmhnallach","dùbhghlas","dùghallach","dùghlas","dùghlasach","eabarcrombaigh","fearghasdan","fionnlasdan","flimean","foirbeis","foirbeiseach","forsàidh","friseal","frisealach","fòlais","gall","gallach","geadais","geadasach","gearailteach","gilios","gillandrais","gilleasbaig","gilleasbuig","gillechriosd","gillechrìost","giobsan","glas","gobha","grannd","grannda","granndach","greum","greumach","griogal","griogalach","griogarach","guaire","guinne","gunnach","gutraidh","gòrdan","gòrdanach","latharnach","lathurna","leamhanach","leamhnach","leòideach","lobhdain","loganach","loudain","lìos","lìosach","lùtair","macabhra","macabhsalain","macadaidh","macadhaimh","macaididh","macailein","macailpein","macalasdair","macambrais","macamhalghaidh","macamhlaidh","macamhlaigh","macanndaidh","macanndra","macanndrais","macaodhagain","macaoidh","macaoidhein","macaomalain","macaonghais","macara","macartain","macartair","macasgaidh","macasgaill","macasgain","macbeatha","macbeathag","macbharrais","macbheatha","macbheathaig","macbheathain","macbhigein","macbhiocair","macbhlàthain","macbhradain","macbhraonaigh","macbhrìghdeinn","macbhàididh","macbhàtair","maccaibe","maccailein","maccain","maccaisgein","maccalmain","maccaluim","maccaog","maccaoig","maccardaidh","maccarmaig","maccathachaidh","maccathail","maccathain","maccathasaigh","maccathbhaidh","maccathbharra","macceallaig","macceallaigh","macceallair","maccearnaigh","maccearraich","macceasain","macchoinnich","maccianain","macciarain","maccinidh","macciomalain","maccionadha","macclambroch","maccnaimhin","maccnusachainn","maccodrum","maccoinnich","maccoinnigh","maccolla","maccomhainn","macconaill","macconnain","maccorcadail","maccormaig","maccosgraigh","maccrain","maccreamhain","maccriomain","maccrithein","maccrosain","maccruimein","maccrìsdein","maccròin","maccuaig","maccuidhein","maccuilcein","maccuinn","maccuinnleis","maccuirc","maccuithein","maccullach","maccullaich","maccumasgaigh","maccumhais","maccuthais","maccàba","maccòiseam","maccòmhain","maccòmhghan","maccùga","macdheòrsa","macdhiarmaid","macdhonnchaidh","macdhrostain","macdhubhaich","macdhubhaig","macdhubhshìth","macdhubhthaich","macdhuibh","macdhunlèibhe","macdhàibhidh","macdhòmhnaill","macdhùghaill","macdhùnshléibhe","macdiarmaid","maceachaidh","maceachainn","maceachairn","maceacharna","macealair","macealar","maceamailinn","maceanain","maceanraig","maceòghainn","macfhearchair","macfhearghail","macfhearghais","macfhilib","macfhiongain","macfhionghain","macfhionnlaigh","macfhitheachain","macfhlaithbheartaich","macfhraing","macfhraingein","macfigeinn","macfrìdeinn","macfuirigh","macgairbheith","macgaradh","macghearailt","macghille","macgille","macgilleain","macgillearnain","macgilleasbaig","macgilleathain","macgillebhreac","macgillebhràth","macgillebhrìghde","macgillebhàin","macgillechaluim","macgillechrìosd","macgilledhonaghart","macgilledhuibh","macgillefhialain","macgilleghlais","macgillemhartainn","macgilleriabhaich","macgilleseathanaich","macgilleòin","macgillfhaolagain","macgillfhiontag","macgilliosa","macgilloig","macgillonaidh","macgiobain","macglaisein","macgobhainn","macgoraidh","macgoraidh","macgriogair","macguaire","macgumaraid","maciain","macillanndrais","macillanndrais","macillaodhagain","macilldheòra","macille","macillearnain","macilleasbaig","macilleathain","macilleathainn","macillebheathain","macillebhlàthain","macillebhreac","macillebhris","macillebhràth","macillebhrìghde","macillebhuidh","macillebhuidhe","macillebhàin","macillebhàin","macillechaluim","macillechatain","macillechathbhaidh","macillechiar","macillechiar","macillechiarain","macillechomhghain","macillechonaill","macillechruim","macillechrìosd","macilledhonaghart","macilledhubhthaich","macilledhuibh","macilledhuibh","macilledhuinn","macilledhòmhnaich","macilleghlais","macilleghuinnein","macilleghuirm","macillemhaoil","macillemhearnaig","macillemhoire","macillemhàrtainn","macillemhìcheil","macillemhìcheil","macillemhòire","macillenaoimh","macillenaoimh","macillepheadair","macillephàdraig","macilleriabhaich","macilleriabhaich","macilleruaidh","macilleruaidh","macillesheathain","macillesheathanaich","macillesheathnaich","macillethòmhais","macilleòin","macillfhaolagain","macillfhaolain","macillfheargain","macillfhialain","macillfhinnein","macillfhinnein","macillfhinntain","macillfhionndaig","macillfhionndaig","macillfhionndain","macillianain","macilliomchadha","macilliosa","macilloig","macillonchon","macillonfhaidh","macillosa","macilluidhir","macilléidich","macillìmheir","macillìosa","maciomhair","macionmhainn","maciosaig","maclabhrainn","maclabhruinn","maclachlainn","maclagain","maclamraich","maclaomainn","maclathagain","macleòid","macleòir","maclianain","macliuthar","maclothaidh","maclughaidh","macluinge","macluirg","maclulaich","maclùcaidh","maclùcais","macmhaighstir","macmhanachain","macmhannain","macmhaoilein","macmhaoirn","macmhaolagain","macmhaolain","macmhaolbheatha","macmhaolchaluim","macmhaoldòmhnaich","macmhaolìosa","macmharais","macmharcais","macmhata","macmhatha","macmhathain","macmhiadhchain","macmhoirein","macmhorgain","macmhuircheartaich","macmhuirich","macmhunna","macmhurardaich","macmhurchaidh","macmhànais","macmhàrtainn","macmhèinn","macmhìcheil","macmhòrdha","macnaois","macnaomhain","macneacail","macneachdain","macneis","macnia","macniallghais","macniallghuis","macniocail","macnobaill","macnèill","macnìll","macphaid","macphaidein","macphail","macphairce","macpheadair","macpheadarain","macpheadrais","macpheidearain","macphilip","macphàdraig","macphàic","macphàidein","macphàil","macphàrlain","macphòil","macrabaidh","macraghnaill","macraibeirt","macraoimhin","macraoiridh","macraonaill","macrath","macriada","macriocaird","macrisnidh","macrob","macrobaidh","macroibeirt","macroithridh","macruairidh","macrusachainn","macràild","macrìdeinn","macrìgh","macshanndaidh","macshealbhaigh","macsheòrais","macsheòrsa","macshimidh","macshithich","macshitrig","macshomhairle","macshuibhne","macshìm","macsiridh","macsporain","macsuain","macsual","macthaidhg","mactheàrlaich","macthom","macthomaidh","macthorcadail","macthorcaill","macthàmhais","macthòmais","mactiridh","mactuirc","macualraig","macuaraig","macuchtraigh","macuilleim","macuirigh","macuirigh","macuisdein","macurardaidh","macurardaigh","macurchadain","macurchaidh","macusbaig","macàidh","macùisdein","maoileanach","maoliosa","matasan","mathanach","matharnach","mawr","moireach","moireasdan","moireasdanach","morgan","morganach","munna","màrnach","màrr","màrtainn","mèinn","mèinnearach","niocalsan","padarsan","paorach","peadarsan","peucag","peutan","preas","puidreach","rathais","robasan","robasdan","roid","roideach","ros","rosach","rothach","ruadh","ruiseal","ròs","ròsach","sailcirc","salmond","scottish","scottish","seadh","seadhg","seagha","seaghach","seathanach","sginnearach","sgot","sgèin","singleir","siosal","siosalach","smios","stiùbhart","stiùbhartach","sutharlainn","sutharlan","suthurlanach","sùdrach","talmhach","tod","todt","tolmach","tuairnear","tulach","tàileach","tàillear","ualas","umphraidh","urchadainn","urchardan","ìomharach"]));
	this.trainingData.push(new _$Main_TrainingData("Swedish Forenames","Swedish Forenames",["adam","adrian","agnes","albin","alex","alexander","alfred","ali","alice","alicia","alma","alva","alvin","amanda","amelia","anna","anton","aron","arvid","astrid","august","axel","benjamin","carl","casper","celine","charlie","colin","cornelia","daniel","dante","david","ebba","ebbe","eddie","edith","edvin","edward","elias","elin","elina","elis","elisa","elise","ella","ellen","ellie","ellinor","elliot","elsa","elton","elvin","elvira","emelie","emil","emilia","emma","emmy","erik","ester","felicia","felix","filip","filippa","frank","freja","gabriel","greta","gustav","hampus","hanna","harry","hedda","henry","hilda","hilma","hjalmar","hugo","ida","ines","ingrid","iris","isabella","isabelle","isak","ivar","jack","jacob","jasmine","joel","john","joline","jonathan","josef","julia","julian","juni","kevin","klara","leah","leia","leo","leon","liam","lilly","linn","linnea","linus","lisa","liv","livia","loke","loui","lova","love","lovis","lovisa","lucas","ludvig","luna","lykke","maja","majken","malte","maria","matilda","matteo","max","maximilian","meja","melissa","melker","melvin","milo","milton","minna","mio","mira","moa","mohamed","molly","my","märta","nathalie","nellie","neo","nicole","nils","noah","noel","nora","nova","novalie","oliver","olivia","olle","oscar","otto","rasmus","ronja","rut","saga","sally","sam","samuel","sara","sebastian","selma","sigge","signe","sigrid","simon","siri","sixten","sofia","stella","stina","svante","svea","tage","thea","theo","theodor","tilda","tilde","tindra","tuva","tyra","valter","vera","victoria","vidar","viggo","viktor","vilgot","ville","vincent","wilhelm","william","wilma","wilmer"]));
	this.trainingData.push(new _$Main_TrainingData("Theological Angels","Theological Angels",["abaddon","abathar","adriel","ahriman","ambriel","amesha","anael","angel","arariel","archangel","ariel","azazel","azrael","barachiel","bene","camael","cassiel","cherub","cherubim","daniel","dardail","dominions","dumah","eremiel","gabriel","gadreel","grigori","hadraniel","hahasiah","hamalat","haniel","harut","hashmal","hesediel","imamiah","israfil","jegudiel","jehoel","jequn","jerahmeel","jophiel","kerubiel","kiraman","kushiel","leliel","lucifer","maalik","marut","mebahiah","metatron","michael","muaqqibat","munkar","muriel","nakir","nanael","netzach","nithael","nuriel","pahaliah","penemue","phanuel","powers","poyel","principalities","puriel","qaphsiel","raguel","raphael","raziel","remiel","sachiel","samael","sandalphon","sariel","schemhampharae","selaphiel","seraph","seraphiel","seraphim","shamsiel","simiel","temeluchus","tennin","thrones","tzaphqiel","uriel","uzziel","vehuel","virtues","wormwood","zachariel","zadkiel","zaphkiel","zephon","zophiel"]));
	this.trainingData.push(new _$Main_TrainingData("Theological Demons","Theological Demons",["abaddon","abezethibou","abraxas","abyzou","adramelech","aeshma","agaliarept","agares","agiel","agrat","ahriman","aim","aka","ala","alal","alastor","allocer","alloces","allu","amaymon","amdusias","amy","anamalech","ancitif","andhaka","andras","andrealphus","andromalius","angra","antichrist","anzu","apollyon","archon","armaros","arunasura","asag","asakku","asbel","asmodai","asmodeus","astaroth","asura","azazel","azi","baal","babi","bael","bakasura","balam","balberith","bali","banshee","baphomet","barbas","barbatos","barong","bathin","bathym","beelzebub","behemoth","beherit","beleth","belial","belphegor","berith","bhūta","bifrons","boruta","botis","buer","bukavac","bune","bushyasta","caacrinolaas","caassimolar","cain","canio","cerbere","charun","chax","chemosh","choronzon","cimeies","cimejes","classyalabolas","corson","crocell","culsu","daeva","dagon","dajjal","danjal","dantalion","davy","decarabia","demiurge","demogorgon","devil","drekavac","dzoavits","eblis","eisheth","eligos","flauros","flavros","focalor","foraii","foras","forcas","forcas","forneus","furcas","furfur","gaap","gaderel","gaki","gamigin","ghoul","glasya","gomory","gorgon","gremory","grigori","gualichu","guayota","gusion","gusoin","gusoyn","haagenti","haborym","halphas","hantu","hauras","haures","havres","ifrit","incubus","ipes","ipos","jikininki","jinn","kabandha","kabhanda","kali","kasadya","killakee","kimaris","kokabiel","krampus","kroni","kumbhakarna","lechies","legion","lempo","leraie","leraje","leviathan","leyak","lili","lilim","lilin","lilith","lucifer","lucifuge","malaphar","malephar","malphas","malthus","mammon","mara","marax","marchosias","maricha","marthim","masih","mastema","mathim","mephistopheles","merihem","moloch","morax","morpheus","murmur","naamah","naberius","naberus","namtar","ninurta","onoskelis","orcus","orias","oriax","ornias","orobas","ose","paimon","pazuzu","pelesit","penemue","phenex","pithius","pocong","pontianak","procell","pruflas","puloman","rahab","rakshasa","rangda","raum","ravan","ronove","rusalka","sabnock","saleos","samael","satan","seir","semyaz","shax","shedim","sitri","solas","sthenno","stolas","suanggi","succubus","surgat","tannin","toyol","tuchulcha","ukobach","valac","valefar","vanth","vapula","vassago","vepar","vine","wendigo","xaphan","xezbeth","yeqon","yeterel","zagan","zepar","ziminiar","ördög"]));
	this.trainingData.push(new _$Main_TrainingData("Tolkienesque Forenames","Tolkienesque Forenames",["abattârik","adalgrim","adanedhel","adanel","adrahil","adûnakhôr","aegnor","aerin","agarwaen","aikanáro","aiwendil","alatar","alatáriel","alcarin","aldamir","aldarion","aldaron","aldor","alfwine","amandil","amandil","amdír","amlaith","amras","amrod","amroth","amrothos","anairë","anardil","anborn","ancalagon","ancalimon","ancalimë","andrast","andreth","andróg","anducal","anfauglir","angbor","angrod","annatar","anárion","arador","araglas","aragorn","aragost","arahad","arahael","aranarth","arantar","aranuir","araphant","araphor","arassuil","aratan","aratar","arathorn","araval","aravir","aravorn","aredhel","argeleb","argon","argonui","arien","aros","arthedain","arthedain","arvedui","arvegil","arveleg","arwen","asfaloth","atanamir","atanatar","aulë","ausir","avranc","azaghâl","azog","baldor","balin","baragund","barahir","barahir","baran","bard","barliman","bauglir","belecthor","beleg","belegorn","belegund","belemir","belladonna","beorn","bereg","beregond","beren","bergil","bert","berylla","berúthiel","berúthiel","bifur","bofur","boldog","bolg","bolger","bombadil","bombur","borin","boromir","boron","borondir","brand","brandir","brego","bregolas","bregor","brodda","brytta","bucca","bëor","bór","calembel","calimehtar","calion","calmacil","calmacil","caranthir","carcharoth","castamir","celeborn","celebrimbor","celebrindor","celebrían","celegorm","celepharn","cemendur","ceorl","cirion","ciryaher","ciryandil","ciryatan","ciryon","cotton","curufin","curunír","círdan","daeron","denethor","dernhelm","deórwine","dior","dori","dorlas","draugluin","duilin","durin","dwalin","dáin","déagol","déor","dís","ecthelion","egalmoth","eilinel","elanor","elbereth","eldacar","eldarion","elemmakil","elendil","elendor","elendur","elenna","elenwë","elessar","elfhelm","elfhild","elfwine","elladan","elmar","elmo","elrohir","elrond","elros","elu","elven","elwing","elwë","emeldir","emerië","enel","enelyë","eorl","eradan","erendis","erestor","erkenbrand","estel","estelmo","estë","eärendil","eärendur","eärnil","eärnur","eärwen","eöl","eönwë","falassion","faniel","faramir","fastred","felaróf","fengel","ferumbras","finarfin","findis","finduilas","finduilas","fingolfin","fingon","finrod","finvain","finwë","folcwine","fortinbras","freca","frerin","fréa","fréaláf","fréawine","frór","fuinur","fundin","fëanor","fíli","fíriel","galador","galadriel","galdor","gamil","gamling","gandalf","gerontius","ghânburi","gildor","gilgalad","gilrain","gimilkhâd","gimilzôr","gimli","ginglith","girion","glanhír","glaurung","glorfindel","glóin","glóredhel","goldberry","goldwine","golfimbul","gollum","gorbag","gorlim","gormadoc","gorthaur","gothmog","gram","grimbold","grishnákh","gríma","grór","gwaihir","gwathir","gwindor","hador","halbarad","haldad","haldan","haldar","haldir","haleth","hallas","halmir","handir","hardang","hareth","helm","herion","herucalmo","herumor","herunúmen","hirgon","hiril","hostamir","huan","hundar","huor","hyarmendacil","háma","húrin","ibûn","idril","ilmarë","ilúvatar","ilúvatar","imbar","imin","iminyë","imrahil","indis","inglor","ingwë","inziladûn","inzilbêth","irimë","irmo","isildur","isilmo","isilmë","isumbras","ivriniel","khamûl","khîm","king","kíli","kúvion","lagduf","lalaith","legolas","lenwë","lindir","lobelia","lotho","lugdush","lurtz","léod","lúthien","mablung","maedhros","maeglin","maglor","magor","mahtan","maiar","malach","mallor","malvegil","manthor","manwë","marach","mauhúr","meleth","melian","meneldil","meneldur","meriadoc","minalcar","minardil","minastir","minyatur","mithrandir","morgoth","morwen","morwen","muzgash","mírielar","mírielserindë","mîm","nahar","narmacil","narvi","nerdanel","nessa","nienna","nienor","nimloth","nimrodel","nori","náin","námo","níniel","nólimon","nóm","ohtar","olwë","olórin","ondoher","ori","ornendil","orodreth","oromë","oropher","orophin","ossë","ostoher","paladin","palantir","pallando","pelendur","pengolodh","peregrin","pervinca","pharazôn","primula","radagast","rían","rómendacil","rúmil","sador","saeros","sakalthôr","salgant","salmar","saruman","sauron","scatha","shadowfax","shagrat","shelob","silmariën","singollo","siriondil","smaug","sméagol","snowmane","soronto","strider","súrion","tarannon","tarcil","tarondor","tata","tatië","telchar","telemmaitë","telemnar","telperiën","telumehtar","thengel","thingol","thorin","thorondir","thorondor","thranduil","thráin","thrór","théoden","théodred","théodwyn","tilion","tindomiel","tinúviel","tulkas","tuor","turambar","turgon","túrin","ufthak","uglúk","uinen","uldor","ulfang","ulfast","ulmo","ulwarth","umbardacil","undómiel","ungoliant","uolë","urwen","vairë","valacar","valandil","valandur","vanimeldë","varda","vardamir","vidugavia","vidumavi","vinyarion","vorondil","voronwë","voronwë","vána","walda","wormtongue","yavanna","yávien","zimraphel","zimraphel","zimrathôn","éomer","éomund","éothain","éothéod","éowyn","írildë","óin"]));
	this.trainingData.push(new _$Main_TrainingData("Werewolf Forenames","Werewolf Forenames",["accalia","adalwolf","adalwolfa","adolpha","adolphus","amaguk","amarog","amoux","amwolf","ardolf","ardwolf","audolf","bardalph","bardolf","beowulf","biryuk","bleddyn","bledig","bleidd","bodolf","botewolf","botolf","botwolf","cana","canagan","chann","chanteloup","conall","conan","cuan","dolph","dolphus","ethelwulf","eyolf","faolan","farkas","felan","fenris","freki","fridolf","friduwulf","geirolf","guadalupe","gunnolf","honiahaka","hrolf","hrolleif","ingolf","ivaylo","landga","leidolf","leloo","lobo","loup","lowell","lupe","luperca","lupo","lupu","lupus","lyall","lykaios","maccon","maengun","maheegan","mahigan","maicoh","maiyun","makoce","mingan","mohegan","nashoba","nuntis","odolf","odwolfe","olcan","onai","phelan","radolf","raff","ralph","rand","randale","randall","randi","randolph","ranulfo","raoul","raul","rendall","reule","rezso","rodolfo","rolf","rudi","rudolph","sandalio","seff","shunkaha","singarti","sirhaan","sköll","susi","tala","tasha","tate","tchono","toralu","udolf","udolph","ujku","ulf","ulfred","ulger","ullok","ulmar","ulmer","ulric","ulvelaik","uwais","varg","velvel","vilkas","vilks","vuk","vukasin","weylyn","wolfgang","wolfram","wolfrik","woolsey","wulfgar","ylva"]));
	if(!this.isQueryStringEmpty()) this.trainingData.push(new _$Main_TrainingData("Custom","Custom",[]));
	window.onload = $bind(this,this.onWindowLoaded);
};
Main.__name__ = true;
Main.main = function() {
	var main = new Main();
};
Main.prototype = {
	addTrainingData: function(displayName,data) {
		this.trainingData.push(new _$Main_TrainingData(displayName,displayName,data));
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
		this.shareResultsAndSettingsElement = window.document.getElementById("shareresultsandsettings");
		this.shareResultsOnlyElement = window.document.getElementById("shareresultsonly");
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
		this.shareResultsAndSettingsElement = window.document.getElementById("shareresultsandsettings");
		this.shareResultsOnlyElement = window.document.getElementById("shareresultsonly");
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
		this.set_trainingDataKey("Animals");
		this.numToGenerate = 100;
		this.minLength = 5;
		this.maxLength = 11;
		this.order = 3;
		this.prior = 0.0;
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
			var data = this.getTrainingDataForKey("Custom");
			data.data = customTrainingData;
			this.set_trainingDataKey("Custom");
		}
	}
	,makeCustomQueryString: function(mode) {
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
		if(mode != _$Main_CustomQueryStringOption.NO_TRAINING_DATA) {
			var data = this.trainingDataTextEdit.value.split(" ");
			if(data.length > 1) {
				var _g = 0;
				while(_g < data.length) {
					var word = data[_g];
					++_g;
					if(word != null && word.length != 0) appendKv("w",word);
				}
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
		this.shareResultsAndSettingsElement.addEventListener("click",function() {
			_g.shareLinkTextEdit.value = _g.makeCustomQueryString(_$Main_CustomQueryStringOption.EVERYTHING);
			_g.shareLinkTextEdit.style.display = "block";
		},false);
		this.shareResultsOnlyElement.addEventListener("click",function() {
			_g.shareLinkTextEdit.value = _g.makeCustomQueryString(_$Main_CustomQueryStringOption.NO_TRAINING_DATA);
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
			var xSimilarity = markov_util_EditDistanceMetrics.damerauLevenshtein(x,_g.get_similar());
			var ySimilarity = markov_util_EditDistanceMetrics.damerauLevenshtein(y,_g.get_similar());
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
			if(!(name != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
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
var _$UInt_UInt_$Impl_$ = {};
_$UInt_UInt_$Impl_$.__name__ = true;
_$UInt_UInt_$Impl_$.gte = function(a,b) {
	var aNeg = a < 0;
	var bNeg = b < 0;
	if(aNeg != bNeg) return aNeg; else return a >= b;
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
var markov_namegen_Generator = function(data,order,prior) {
	if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
	if(!_$UInt_UInt_$Impl_$.gte(order,1)) throw new js__$Boot_HaxeError("FAIL: order >= 1");
	if(!(prior >= 0)) throw new js__$Boot_HaxeError("FAIL: prior >= 0");
	this.order = order;
	this.prior = prior;
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
	this.models = [];
	var _g3 = 0;
	while(_g3 < order) {
		var i1 = _g3++;
		this.models.push(new markov_namegen_Model(data.slice(),order - i1,prior,domain));
	}
};
markov_namegen_Generator.__name__ = true;
markov_namegen_Generator.prototype = {
	generate: function() {
		var word = markov_util_StringExtensions.repeat("#",this.order);
		var letter = this.getLetter(word);
		while(letter != "#") {
			if(letter != null) word += letter;
			letter = this.getLetter(word);
		}
		return word;
	}
	,getLetter: function(context) {
		var letter = null;
		var context1 = context.substring(context.length - this.order,context.length);
		var _g = 0;
		var _g1 = this.models;
		while(_g < _g1.length) {
			var model = _g1[_g];
			++_g;
			letter = model.generate(context1);
			if(letter == null) context1 = context1.substring(1); else break;
		}
		return letter;
	}
};
var markov_namegen_Model = function(data,order,prior,alphabet) {
	if(!(alphabet != null && data != null)) throw new js__$Boot_HaxeError("FAIL: alphabet != null && data != null");
	if(!(alphabet.length > 0 && data.length > 0)) throw new js__$Boot_HaxeError("FAIL: alphabet.length > 0 && data.length > 0");
	if(!(prior >= 0 && prior <= 1)) throw new js__$Boot_HaxeError("FAIL: prior >= 0 && prior <= 1");
	this.order = order;
	this.prior = prior;
	this.alphabet = alphabet;
	this.observations = new haxe_ds_StringMap();
	this.train(data);
	this.buildChains();
};
markov_namegen_Model.__name__ = true;
markov_namegen_Model.countMatches = function(arr,v) {
	if(arr == null) return 0;
	var i = 0;
	var _g = 0;
	while(_g < arr.length) {
		var s = arr[_g];
		++_g;
		if(s == v) i++;
	}
	return i;
};
markov_namegen_Model.selectIndex = function(chain) {
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
};
markov_namegen_Model.prototype = {
	generate: function(context) {
		if(!(context != null)) throw new js__$Boot_HaxeError("FAIL: context != null");
		var chain = this.chains.get(context);
		if(chain == null) return null; else {
			if(!(chain.length > 0)) throw new js__$Boot_HaxeError("FAIL: chain.length > 0");
			return this.alphabet[markov_namegen_Model.selectIndex(chain)];
		}
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
				value.push(this.prior + markov_namegen_Model.countMatches(this.observations.get(context),prediction));
			}
		}
	}
	,retrain: function(data) {
		if(!(data != null)) throw new js__$Boot_HaxeError("FAIL: data != null");
		this.train(data);
		this.buildChains();
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
		if(name.length >= minLength && name.length <= maxLength && StringTools.startsWith(name,startsWith) && StringTools.endsWith(name,endsWith) && (includes.length == 0 || (function($this) {
			var $r;
			if(!(name != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
			if(!(includes != null)) throw new js__$Boot_HaxeError("FAIL: substr != null");
			$r = name.indexOf(includes) >= 0;
			return $r;
		}(this))) && (excludes.length == 0 || !(function($this) {
			var $r;
			if(!(name != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
			if(!(excludes != null)) throw new js__$Boot_HaxeError("FAIL: substr != null");
			$r = name.indexOf(excludes) >= 0;
			return $r;
		}(this)))) return name;
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
var markov_util__$ArraySet_ArraySet_$Impl_$ = {};
markov_util__$ArraySet_ArraySet_$Impl_$.__name__ = true;
markov_util__$ArraySet_ArraySet_$Impl_$.create = function(array) {
	if(array == null) return [];
	return markov_util__$ArraySet_ArraySet_$Impl_$.toSet(array);
};
markov_util__$ArraySet_ArraySet_$Impl_$.intersection = function(this1,set) {
	var result = [];
	var _g = 0;
	while(_g < this1.length) {
		var element = this1[_g];
		++_g;
		if(markov_util__$ArraySet_ArraySet_$Impl_$.contains(set,element)) result.push(element);
	}
	return result;
};
markov_util__$ArraySet_ArraySet_$Impl_$.union = function(this1,set) {
	return markov_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(markov_util__$ArraySet_ArraySet_$Impl_$.toArray(set)));
};
markov_util__$ArraySet_ArraySet_$Impl_$.unionArray = function(this1,arr) {
	return markov_util__$ArraySet_ArraySet_$Impl_$.toSet(this1.concat(arr));
};
markov_util__$ArraySet_ArraySet_$Impl_$.difference = function(this1,set) {
	var result;
	var array = this1.slice();
	result = array;
	var $it0 = HxOverrides.iter(set);
	while( $it0.hasNext() ) {
		var element = $it0.next();
		HxOverrides.remove(result,element);
	}
	var array1 = markov_util__$ArraySet_ArraySet_$Impl_$.toArray(result);
	return array1;
};
markov_util__$ArraySet_ArraySet_$Impl_$.add = function(this1,element) {
	if(!(element != null)) throw new js__$Boot_HaxeError("FAIL: element != null");
	if(markov_util__$ArraySet_ArraySet_$Impl_$.contains(this1,element)) return false;
	this1.push(element);
	return true;
};
markov_util__$ArraySet_ArraySet_$Impl_$.contains = function(this1,element) {
	var _g = 0;
	while(_g < this1.length) {
		var i = this1[_g];
		++_g;
		if(i == element) return true;
	}
	return false;
};
markov_util__$ArraySet_ArraySet_$Impl_$.copy = function(this1) {
	var array = this1.slice();
	return array;
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
markov_util__$ArraySet_ArraySet_$Impl_$._new = function(array) {
	return array;
};
var markov_util_EditDistanceMetrics = function() { };
markov_util_EditDistanceMetrics.__name__ = true;
markov_util_EditDistanceMetrics.levenshtein = function(source,target) {
	if(!(source != null)) throw new js__$Boot_HaxeError("FAIL: source != null");
	if(!(target != null)) throw new js__$Boot_HaxeError("FAIL: target != null");
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
markov_util_EditDistanceMetrics.damerauLevenshtein = function(source,target) {
	if(source.length == 0) return target.length;
	if(target.length == 0) return source.length;
	var table = markov_util_EditDistanceMetrics.damerauLevenshteinMatrix(source,target,true);
	return table[table.length - 1];
};
markov_util_EditDistanceMetrics.damerauLevenshteinMatrix = function(source,target,enableTranspositions) {
	if(enableTranspositions == null) enableTranspositions = true;
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
			if(enableTranspositions && x > 1 && y > 1 && source.charAt(x) == target.charAt(y - 1) && source.charAt(x - 1) == target.charAt(y)) {
				var val1 = markov_util_IntExtensions.min(costs[x + y * w],costs[x - 2 + (y - 2) * w] + cost);
				costs[x + y * w] = val1;
			}
		}
	}
	return costs;
};
var markov_util_FileReader = function() { };
markov_util_FileReader.__name__ = true;
var markov_util_IntExtensions = function() { };
markov_util_IntExtensions.__name__ = true;
markov_util_IntExtensions.clamp = function(v,min,max) {
	if(v < min) return min;
	if(v > max) return max;
	return v;
};
markov_util_IntExtensions.min = function(a,b) {
	if(a < b) return a;
	return b;
};
var markov_util_PrefixTrie = function() {
	this.root = new markov_util_PrefixNode(null,"",0);
};
markov_util_PrefixTrie.__name__ = true;
markov_util_PrefixTrie.findChild = function(node,letter) {
	var _g = 0;
	var _g1 = node.children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		if(child.letter == letter) return child;
	}
	return null;
};
markov_util_PrefixTrie.prototype = {
	insert: function(word) {
		var current = this.root;
		var _g1 = 0;
		var _g = word.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ch = word.charAt(i);
			var child = markov_util_PrefixTrie.findChild(current,ch);
			if(child == null) {
				child = new markov_util_PrefixNode(current,ch,i);
				current.children.push(child);
			} else child.frequency++;
			current = child;
		}
		current.word = true;
		return current.frequency;
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
var markov_util_PrefixNode = function(parent,letter,depth) {
	if(!(letter.length == 1 || parent == null && depth == 0)) throw new js__$Boot_HaxeError("FAIL: letter.length == 1 || (parent == null && depth == 0)");
	this.parent = parent;
	this.children = [];
	this.letter = letter;
	this.depth = depth;
	this.frequency = 1;
	this.word = false;
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
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
	if(!(substr != null)) throw new js__$Boot_HaxeError("FAIL: substr != null");
	return s.indexOf(substr) >= 0;
};
markov_util_StringExtensions.capitalize = function(s) {
	if(!(s != null)) throw new js__$Boot_HaxeError("FAIL: s != null");
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
ID.generatetriegraph = "generatetriegraph";
ID.generatemarkovgraph = "generatemarkovgraph";
ID.markovp = "markovp";
ID.generate = "generate";
ID.markovgraph = "markovgraph";
ID.triegraph = "triegraph";
ID.nonamesfound = "nonamesfound";
ID.currentnames = "currentnames";
ID.shareresultsonly = "shareresultsonly";
ID.shareresultsandsettings = "shareresultsandsettings";
ID.shareedit = "shareedit";
Main.WEBSITE_URL = "http://www.samcodes.co.uk/project/markov-namegen/";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});

//# sourceMappingURL=markov.js.map
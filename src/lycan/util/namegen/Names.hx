package lycan.util.namegen;

using lycan.util.ArrayExtensions;

enum Tag {
	VAMPIRES;
	FUNNY;
	BRITISH;
	CHINESE;
	JAPANESE;
	INDIAN;
	AUSTRALIAN;
	RUSSIAN;
	ITALIAN;
	CHRISTMAS;
	EGYPTIAN;
	FRENCH;
	CHRISTIAN;
	RICH;
	POOR;
	MILITARY;
}

enum Gender {
	MASCULINE;
	FEMININE;
	NEUTER;
}

typedef Name = {
	var name:String;
	var gender:Gender;
}

class Names {
	public static var titles:Array<Name> = [
		{ name: "Mr", gender: MASCULINE },
		{ name: "Mrs", gender: FEMININE },
		{ name: "Miss", gender: FEMININE },
		{ name: "Archpriest", gender: NEUTER },
		{ name: "Bishop", gender: NEUTER },
		{ name: "Vicar", gender: NEUTER },
		{ name: "Baron", gender: MASCULINE },
		{ name: "Baroness", gender: FEMININE },
		{ name: "Count", gender: MASCULINE },
		{ name: "Corporal", gender: NEUTER },
		{ name: "Private", gender: NEUTER },
		{ name: "Field Marshal", gender: NEUTER },
		{ name: "Governor", gender: NEUTER },
		{ name: "Lady", gender: FEMININE },
		{ name: "Lord", gender: MASCULINE },
		{ name: "Professor", gender: NEUTER },
		{ name: "Reverend", gender: NEUTER },
		{ name: "Sergeant", gender: NEUTER }
	];
	
	public static var vampireForenames:Array<Name> = [
		{ name: "Bella", gender: FEMININE },
		{ name: "Edward", gender: MASCULINE },
		{ name: "Jacob", gender: MASCULINE },
		{ name: "Carlisle", gender: MASCULINE },
		{ name: "Emmett", gender: MASCULINE },
		{ name: "Nessie", gender: FEMININE },
		{ name: "Armand", gender: MASCULINE },
		{ name: "Claudia", gender: FEMININE },
		{ name: "Louis", gender: MASCULINE },
		{ name: "Lestat", gender: MASCULINE },
		{ name: "Mina", gender: FEMININE },
		{ name: "Akasha", gender: FEMININE },
		{ name: "Angel", gender: MASCULINE },
		{ name: "Dusk", gender: FEMININE },
		{ name: "Eli", gender: MASCULINE },
		{ name: "Eric", gender: FEMININE },
		{ name: "Irina", gender: FEMININE },
		{ name: "Lilith", gender: FEMININE },
		{ name: "Mekare", gender: FEMININE },
		{ name: "Priscilla", gender: FEMININE },
		{ name: "Remilia", gender: FEMININE },
		{ name: "Santiago", gender: MASCULINE },
		{ name: "Thistle", gender: FEMININE },
		{ name: "Vladimir", gender: MASCULINE },
		{ name: "Yaksha", gender: NEUTER },
		{ name: "Alucard", gender: MASCULINE },
		{ name: "D", gender: MASCULINE },
		{ name: "Eli", gender: MASCULINE },
		{ name: "Ivan", gender: MASCULINE },
		{ name: "Judas", gender: MASCULINE },
		{ name: "Karin", gender: FEMININE },
		{ name: "Magister", gender: MASCULINE },
		{ name: "Mina", gender: FEMININE },
		{ name: "Arcueid", gender: FEMININE },
		{ name: "Carmilla", gender: FEMININE },
		{ name: "Harkon", gender: MASCULINE },
		{ name: "Sion", gender: FEMININE },
		{ name: "Nora", gender: FEMININE },
		{ name: "Rakshasa", gender: NEUTER },
		{ name: "Alessandro", gender: MASCULINE },
		{ name: "Ambrogio", gender: MASCULINE },
		{ name: "Selene", gender: FEMININE },
		{ name: "Celeste", gender: FEMININE },
		{ name: "Vincent", gender: MASCULINE },
		{ name: "Winter", gender: NEUTER },
		{ name: "Blade", gender: MASCULINE },
		{ name: "Spike", gender: MASCULINE },
		{ name: "Caine", gender: MASCULINE }
	];
	
	public static var vampireSurnames:Array<Name> = [ 
		{ name: "Swan", gender: NEUTER },
		{ name: "Cullen", gender: NEUTER },
		{ name: "Northman", gender: NEUTER },
		{ name: "Scarlet", gender: NEUTER },
		{ name: "Blackbourne", gender: NEUTER },
		{ name: "Waldorf", gender: NEUTER },
		{ name: "Barlow", gender: NEUTER },
		{ name: "Salem", gender: NEUTER },
		{ name: "Blake", gender: NEUTER },
		{ name: "Night", gender: NEUTER },
		{ name: "Fitzroy", gender: NEUTER },
		{ name: "deLioncourt", gender: NEUTER },
		{ name: "Blackthorn", gender: NEUTER },
		{ name: "Souen", gender: NEUTER },
		{ name: "Tod", gender: NEUTER },
		{ name: "Lafitte", gender: NEUTER },
		{ name: "Damaskinos", gender: NEUTER },
		{ name: "LaCroix", gender: NEUTER },
		{ name: "Valentine", gender: NEUTER },
		{ name: "Bathory", gender: NEUTER },
		{ name: "Sanguina", gender: NEUTER },
		{ name: "Giovanni", gender: NEUTER },
		{ name: "Brunestud", gender: NEUTER },
		{ name: "Lecarde", gender: NEUTER },
		{ name: "Bernhard", gender: NEUTER }
	];
	
	public static var armyForenames:Array<Name> = [ 
		{ name: "Ace", gender: NEUTER },
		{ name: "Bravo", gender: MASCULINE },
		{ name: "Gunnar", gender: MASCULINE },
		{ name: "Lance", gender: MASCULINE },
		{ name: "Mace", gender: MASCULINE },
		{ name: "Stryker", gender: MASCULINE },
		{ name: "Victor", gender: MASCULINE },
		{ name: "Lightning Joe", gender: MASCULINE },
		{ name: "Little Mac", gender: MASCULINE },
		{ name: "Chick", gender: FEMININE },
		{ name: "Birdy", gender: FEMININE },
		{ name: "Blondie", gender: FEMININE },
		{ name: "Fuzzy", gender: MASCULINE },
		{ name: "Armee", gender: FEMININE },
		{ name: "Delta", gender: MASCULINE },
		{ name: "Grace", gender: FEMININE },
		{ name: "Justice", gender: FEMININE },
		{ name: "Knox", gender: MASCULINE },
		{ name: "Cannon", gender: MASCULINE },
		{ name: "Garrison", gender: MASCULINE },
		{ name: "Gunther", gender: MASCULINE },
		{ name: "Abrams", gender: MASCULINE },
		{ name: "Claymore", gender: MASCULINE },
		{ name: "Barrett", gender: MASCULINE },
		{ name: "Cadence", gender: FEMININE },
		{ name: "Vittoria", gender: MASCULINE },
		{ name: "Bradley", gender: MASCULINE },
		{ name: "Sloane", gender: MASCULINE },
		{ name: "Cadette", gender: FEMININE },
		{ name: "Navy", gender: FEMININE },
		{ name: "Harlow", gender: MASCULINE },
		{ name: "Wolfgang", gender: MASCULINE },
		{ name: "Wyatt", gender: MASCULINE },
		{ name: "Balder", gender: MASCULINE },
		{ name: "Lionheart", gender: NEUTER },
		{ name: "Marshall", gender: MASCULINE },
		{ name: "Scout", gender: FEMININE },
		{ name: "Ryder", gender: MASCULINE },
		{ name: "Gatlen", gender: NEUTER },
		{ name: "Miles", gender: MASCULINE },
		{ name: "Hunter", gender: MASCULINE },
		{ name: "Chase", gender: MASCULINE },
		{ name: "Maverick", gender: MASCULINE },
		{ name: "Jett", gender: MASCULINE },
		{ name: "Beretta", gender: FEMININE },
		{ name: "Blaze", gender: FEMININE },
		{ name: "Danger", gender: MASCULINE },
		{ name: "Steele", gender: FEMININE }
	];
	
	public static var armySurnames:Array<Name> = [ 
		{ name: "Sargent", gender: NEUTER },
		{ name: "Knight", gender: NEUTER },
		{ name: "Hartman", gender: NEUTER },
		{ name: "Brandt", gender: NEUTER },
		{ name: "Ritter", gender: NEUTER },
		{ name: "Wehrman", gender: NEUTER },
		{ name: "Stal", gender: NEUTER },
		{ name: "Krieger", gender: NEUTER },
		{ name: "Major", gender: NEUTER },
		{ name: "Hauptmann", gender: NEUTER },
		{ name: "Brannigan", gender: NEUTER },
		{ name: "Armstrong", gender: NEUTER },
		{ name: "Anderson", gender: NEUTER },
		{ name: "Hoffman", gender: NEUTER },
		{ name: "Roediger", gender: NEUTER },
		{ name: "Warner", gender: NEUTER },
		{ name: "Wesse", gender: NEUTER },
		{ name: "Custer", gender: NEUTER },
		{ name: "Sharpe", gender: NEUTER },
		{ name: "Pratt", gender: NEUTER },
		{ name: "Havelock", gender: NEUTER },
		{ name: "Richthofen", gender: NEUTER },
		{ name: "Petraeus", gender: NEUTER },
		{ name: "Nelson", gender: NEUTER },
		{ name: "MacArthur", gender: NEUTER }
	];
	
	public static var journoForenames:Array<Name> = [
		{ name: "Jake", gender: MASCULINE },
		{ name: "Charles", gender: MASCULINE },
		{ name: "Glenn", gender: MASCULINE },
		{ name: "Megyn", gender: FEMININE },
		{ name: "Walter", gender: MASCULINE },
		{ name: "Bill", gender: MASCULINE },
		{ name: "Sean", gender: MASCULINE },
		{ name: "Andrew", gender: MASCULINE },
		{ name: "Nick", gender: MASCULINE },
		{ name: "Ann", gender: FEMININE },
		{ name: "Rachel", gender: FEMININE },
		{ name: "Mary", gender: FEMININE },
		{ name: "Evan", gender: MASCULINE },
		{ name: "Laura", gender: FEMININE },
		{ name: "Jon", gender: MASCULINE },
		{ name: "Evan", gender: MASCULINE },
		{ name: "Anderson", gender: MASCULINE },
		{ name: "Ezra", gender: FEMININE },
		{ name: "Chuck", gender: MASCULINE },
		{ name: "Arianna", gender: FEMININE },
		{ name: "Chris", gender: MASCULINE },
		{ name: "Paul", gender: MASCULINE },
		{ name: "Wolf", gender: MASCULINE }
	];
	
	public static var journoSurnames:Array<Name> = [
		{ name: "Cronkite", gender: NEUTER },
		{ name: "Blitzer", gender: NEUTER },
		{ name: "Cooper", gender: NEUTER },
		{ name: "Huffington", gender: NEUTER },
		{ name: "Theroux", gender: NEUTER },
		{ name: "Woolf", gender: NEUTER },
		{ name: "Hannity", gender: NEUTER },
		{ name: "OReilly", gender: NEUTER },
		{ name: "Limbaugh", gender: NEUTER },
		{ name: "Beck", gender: NEUTER },
		{ name: "Robinson", gender: NEUTER },
		{ name: "Marr", gender: NEUTER },
		{ name: "Davis", gender: NEUTER },
		{ name: "Neil", gender: NEUTER },
		{ name: "Snow", gender: NEUTER },
		{ name: "Maddow", gender: NEUTER },
		{ name: "Stephanopoulos", gender: NEUTER },
		{ name: "Hayes", gender: NEUTER },
		{ name: "Kelly", gender: NEUTER },
		{ name: "Todd", gender: NEUTER },
		{ name: "Klein", gender: NEUTER },
		{ name: "Tapper", gender: NEUTER },
		{ name: "Woodward", gender: NEUTER },
		{ name: "Malcolm", gender: NEUTER },
		{ name: "Napolitano", gender: NEUTER }
	];
	
	public static var alienForenames:Array<Name> = [
		{ name: "Spock", gender: MASCULINE },
		{ name: "Mork", gender: MASCULINE },
		{ name: "Alf", gender: MASCULINE },
		{ name: "Worf", gender: MASCULINE },
		{ name: "Clark", gender: MASCULINE },
		{ name: "Seven", gender: FEMININE },
		{ name: "Kryton", gender: MASCULINE },
		{ name: "Elim", gender: MASCULINE },
		{ name: "Kang", gender: MASCULINE },
		{ name: "Kodos", gender: MASCULINE },
		{ name: "Zim", gender: FEMININE },
		{ name: "Zaphod", gender: MASCULINE },
		{ name: "Zeebo", gender: MASCULINE },
		{ name: "JeanLuc", gender: MASCULINE },
		{ name: "Beldar", gender: MASCULINE },
		{ name: "Q", gender: MASCULINE },
		{ name: "Diana", gender: FEMININE },
		{ name: "Klaatu", gender: MASCULINE },
		{ name: "Chiana", gender: FEMININE },
		{ name: "Gorn", gender: MASCULINE },
		{ name: "Rygel", gender: MASCULINE },
		{ name: "Oola", gender: FEMININE },
		{ name: "Xev", gender: FEMININE },
		{ name: "Gaila", gender: FEMININE },
		{ name: "Leeloo", gender: FEMININE }
	];
	
	public static var alienSurnames:Array<Name> = [
		{ name: "Beeblebrox", gender: NEUTER },
		{ name: "Kaypax", gender: NEUTER },
		{ name: "Catbug", gender: NEUTER },
		{ name: "Grey", gender: NEUTER },
		{ name: "Green", gender: NEUTER },
		{ name: "Auton", gender: NEUTER },
		{ name: "Vogan", gender: NEUTER },
		{ name: "Adric", gender: NEUTER },
		{ name: "Kent", gender: NEUTER },
		{ name: "Oddworld", gender: NEUTER },
		{ name: "Roswell", gender: NEUTER },
		{ name: "Gravemind", gender: NEUTER },
		{ name: "Vortigaunt", gender: NEUTER },
		{ name: "Qwark", gender: NEUTER },
		{ name: "Gwoth", gender: NEUTER },
		{ name: "Ranzz", gender: NEUTER },
		{ name: "Celes", gender: NEUTER },
		{ name: "Borg", gender: NEUTER },
		{ name: "Sarlacc", gender: NEUTER },
		{ name: "Vulcan", gender: NEUTER },
		{ name: "Zerg", gender: NEUTER },
		{ name: "Protoss", gender: NEUTER },
		{ name: "Dokachin", gender: NEUTER },
		{ name: "Frobisher", gender: NEUTER },
		{ name: "Zoidberg", gender: NEUTER }
	];
	
	public static var richForenames:Array<Name> = [
		{ name: "Verity", gender: FEMININE },
		{ name: "Octavia", gender: FEMININE },
		{ name: "Araminta", gender: FEMININE },
		{ name: "Concetta", gender: FEMININE },
		{ name: "Genevieve", gender: FEMININE },
		{ name: "Ulysses", gender: MASCULINE },
		{ name: "Alexandra", gender: FEMININE },
		{ name: "Vivienne", gender: FEMININE },
		{ name: "Victoria", gender: FEMININE },
		{ name: "Olivia", gender: FEMININE },
		{ name: "Franchesca", gender: FEMININE },
		{ name: "Isabelle", gender: FEMININE },
		{ name: "Eleanor", gender: FEMININE },
		{ name: "JeanLuc", gender: MASCULINE },
		{ name: "Penelope", gender: FEMININE },
		{ name: "Phoebe", gender: FEMININE },
		{ name: "Abraham", gender: MASCULINE },
		{ name: "Franklin", gender: MASCULINE },
		{ name: "Herbert", gender: MASCULINE },
		{ name: "Carson", gender: MASCULINE },
		{ name: "Sterling", gender: MASCULINE },
		{ name: "Montahue", gender: MASCULINE },
		{ name: "Sebastian", gender: MASCULINE },
		{ name: "Demitrius", gender: MASCULINE },
		{ name: "Lawrence", gender: MASCULINE }
	];
	
	public static var richSurnames:Array<Name> = [
		{ name: "Gates", gender: NEUTER },
		{ name: "Slim", gender: NEUTER },
		{ name: "Buffett", gender: NEUTER },
		{ name: "Ortega", gender: NEUTER },
		{ name: "Ellison", gender: NEUTER },
		{ name: "Koch", gender: NEUTER },
		{ name: "Walton", gender: NEUTER },
		{ name: "Bettencourt", gender: NEUTER },
		{ name: "Bezos", gender: NEUTER },
		{ name: "Zuckerberg", gender: NEUTER },
		{ name: "Kamprad", gender: NEUTER },
		{ name: "Page", gender: NEUTER },
		{ name: "Bloomberg", gender: NEUTER },
		{ name: "Ballmer", gender: NEUTER },
		{ name: "Paulson", gender: NEUTER },
		{ name: "Baldwin", gender: NEUTER },
		{ name: "Goldberg", gender: NEUTER },
		{ name: "Archibald", gender: NEUTER },
		{ name: "Livingston", gender: NEUTER },
		{ name: "Montgomery", gender: NEUTER },
		{ name: "Trump", gender: NEUTER },
		{ name: "Richmond", gender: NEUTER },
		{ name: "Billings", gender: NEUTER },
		{ name: "Hillaire", gender: NEUTER },
		{ name: "DuPont", gender: NEUTER }
	];
	
	public static var elfForenames:Array<Name> = [
		{ name: "Amras", gender: MASCULINE },
		{ name: "Celebrian", gender: MASCULINE },
		{ name: "Curufin", gender: MASCULINE },
		{ name: "Eol", gender: MASCULINE },
		{ name: "Ecthelion", gender: MASCULINE },
		{ name: "Indis", gender: MASCULINE },
		{ name: "Llewelyn", gender: MASCULINE },
		{ name: "Methild", gender: MASCULINE },
	];
	
	public static var elfSurnames:Array<Name> = [
	];
}
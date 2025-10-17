

# Streams 

 ## Varför har collect ett argument?
collect(...) behöver alltid en Collector som säger hur streamens element ska samlas ihop till något i slutet.

```java 
    public static List<String> wordsOfLength(String text, int wordLength) {
        return Arrays.stream(text.split(" "))
                     .filter(s -> s.length() == wordLength)
                     .collect(Collectors.toList());
    }
```


```java
int partialSum(List<String> strings, int min, int max) {
    return strings.stream()
        .filter(s -> isInt(s))             // behåll bara strängar som är heltal
        .mapToInt(s -> toInt(s))           // omvandla till int
        .filter(n -> n >= min && n <= max) // håll dem inom intervallet
        .sum();                            // summera
}
```


# Decorator

## super() i konstruktor


```java
// Ett enkelt interface för spakar
interface Lever {
    void raise();
}

// En abstrakt dekoratorklass som kapslar in en Lever
abstract class DecoratedLever implements Lever {
    private Lever decoratedLever;

    public DecoratedLever(Lever lever) {
        this.decoratedLever = lever;
    }

    protected abstract void preRaise();
    protected abstract void postRaise();

    @Override
    public final void raise() {
        preRaise();
        decoratedLever.raise();
        postRaise();
    }
}

```


```java
class LoggingLever extends DecoratedLever {
    public LoggingLever(Lever lever) {
        super(lever);
    }

    @Override
    protected void preRaise() {
        System.out.println("Before raising...");
    }

    @Override
    protected void postRaise() {
        System.out.println("After raising...");
    }
}

// Exempel på anrop
void run() {
    Lever lever = new PrintingLever();
    Lever loggingLever = new LoggingLever(lever);
    loggingLever.raise();
}

```




# SOLID
* single resp
    Klass/metod/paket har en uppgift , ansvarsområde och ingen annan

* Open closed
    stängd för modifiera existerande kod men öppen till förlängning

* Liskov
    en subklass ska kunna ersättas av en super klass , antal argument och returvärden får inte skilja sig åt (adult och kid analogy)
    Kraven på objekt av en subklass får varken vara strängare eller mindre stänga än kraven på superklassen.

* Interface segre
    Skriv inte interfaces som är större än nödvändigt, dela hellre upp
    i mindre interfaces.

* Dependency inv
    Programmera mot abstrakta interfaces, inte mot konkreta klas-
    ser.



# Decorator pattern

```java
interface Robot {
	Point2D getPosition();
	void move(double dx, double dy);
}


class VacuumCleaner implements Robot {
	public VacuumCleaner (Point2D pos);
	public void move(double dx, double dy);
	public Point2D getPosition();
}


abstract class RobotDecorator implements Robot

	protected Robot wrapper;

	public RobotDecorator(Robot wrapper)
		this.wrapper = wrapper;



	public void move(double dx, double dy)
		wrapper.move(dx, dy)
		decorate(dx, dy)
	public final Point2D getPosition()
		return wrapper.getPosition();

	protected abstract void decorate(double dx, double dy);


class RobotLogger extends RobotDecorator
	
	public RobotLogger(Robot wrapper)
		super(wrapper)

	protected void decorate(double dx, double dy)
		System.out.println(String.format("moving to %s", wrapper.getPosition()));

``` 

# Command pattern utan OCP

```java

// Utan OCP (switch)
class Parser {
    Command parse(String line) {
        var parts = line.split(",");
        return switch(parts[0]) {
            case "print" -> new PrintCommand(parts[1]);
            case "exit"  -> new ExitCommand();
            default      -> new IllegalCommand();
        };
    }
}


```

# med OCP

```java
interface Command { void execute(); }
interface CommandFactory {
    String key();
    Command create(String[] parts);
}

class Parser {
    private Map<String, CommandFactory> factories;

    Parser(List<CommandFactory> fs) {
        factories = fs.stream().collect(
            Collectors.toMap(CommandFactory::key, f -> f));
    }

    Command parse(String line) {
        var parts = line.split(",");
        CommandFactory cf = factories.get(parts[0]);   // <-- lookup, ingen switch
        if (cf == null) return new IllegalCommand();
        return cf.create(parts);
    }
}

class AddFactory implements CommandFactory {
    public String key() { return "add"; }
    public Command create(String[] parts) { return new AddCommand(...); }
}

class PayFactory implements CommandFactory {
    public String key() { return "pay"; }
    public Command create(String[] parts) { return new PayCommand(...); }
}


public static void main(String[] args) {
    Parser parser = new Parser(List.of(
        new PrintCommand.Factory(),
        new ExitCommand.Factory()
    ));

    Command cmd = parser.parse("print,Hello"); // ett exempel, kan läsas från fil
    cmd.execute();   // körs utan att Parser känner till PrintCommand direkt
}



```

# Lambdas

Det räcker alltså att skapa en `TwoArg addEx = (a,b) -> a + b;` , man behöver inte skapa en egen klass som skapar objekt med funktionen inuti sig. 


```java
interface TwoArg {
    int op(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        TwoArg addEx = (a, b) -> a + b;
        int res = calculateEx(addEx);
        System.out.println(res);
    }

    public static int calculateEx(TwoArg args) {
        return args.op(5, 10);
    }
}

```

Ett annat exempel

Notera att superklassen har fler argument än subklassen. Funktionen som skickas in i superklassen är det "unika" eller det som skiljer sig åt. 

```java


interface JumpCondition {
    public boolean shouldJump(Word left, Word right);
}



class ConditionalJump implements Instruction {

    private int target;
    private Operand leftOp, rightOp;
    private JumpCondition condition;

    public ConditionalJump  (int target,
                             Operand leftOp,
                             Operand rightOp,
                             JumpCondition condition) {
        this.target = target;
        this.leftOp = leftOp;
        this.rightOp = rightOp;
        this.condition = condition;
    }

    public void execute(Memory memory, PC pc) {
        if (condition.shouldJump(leftOp.getWord(memory),
                                 rightOp.getWord(memory))) {
            pc.jumpTo(target);
        } else {
            pc.step();
        }
    }
}


class JumpLess extends ConditionalJump {

    public JumpLess  (int target, Operand leftOp, Operand rightOp) {
        super(target,
              leftOp, rightOp,
              (left, right) -> left.lessThan(right));
    }
}
```



# Syntax

```java

    villkor ? värde_om_sant : värde_om_falskt;

    //ex

    return index < values.length ? Optional.of(values[index]) : Optional.empty();


```

omvandla typer


```java

    //Omvandla string till double

    Double.parseDouble(string)

```

# Try/catch

```java
    public static Optional<Integer> toInt(String s)

        try{
            return Optional.of(Integer.parse(s))
        } catch {
            return Optional.empty();
        }
```

# Optionals


## flatMap eller Map

en bra minnesregel:
Om funktionen du vill köra själv returnerar en Optional, använd flatMap

```java
interface Function<T, U> {
    U valueAt(T t);
}

class Optional<T> {

    private T value;

    private Optional  (T value) {
        this.value = value;
    }

    public static <T> Optional<T> empty() {
        return new Optional<>(null);
    }

    public static <T> Optional<T> of(T value) {
        return new Optional<>(value);
    }

    // Här ser kompilatorn att "hej" är en String.
    // T blir alltså String för detta anrop.
    // Metoden returnerar därför en Optional<String>.
    Optional<String> optString = Optional.ofNullable("hej");
    
    public static <T> Optional<T> ofNullable(T value) {
        return new Optional<>(value);
    }

    public boolean isPresent() {
        return value != null;
    }

    public T orElse(T defaultValue) {
        return
            isPresent()
            ? value
            : defaultValue;
    }

    public <U> Optional<U> map(Function<T, U> f) {
        return
            isPresent()
            ? of(f.valueAt(value))
            : empty();
    }

    public <U> Optional<U> flatMap(Function<T, Optional<U>> f) {
        return
            isPresent()
            ? f.valueAt(value)
            : empty();
    }
}
```
## varför används <T>
<T> säger: "Jag hittar på en ny, tillfällig typplatshållare som heter T."

T säger: "Jag använder den där platshållaren T som du just introducerade."

# TypeCast
```java
public void interageraMedDjur(Djur mittDjur) {
    // Först kollar vi SÄKERT att det ÄR en Hund
    if (mittDjur instanceof Hund) {
        
        // Nu kan vi typomvandla (casta)
        Hund minHund = (Hund) mittDjur;
        
        // Och nu kan vi anropa hund-specifika metoder!
        minHund.viftaPåSvansen();
    }
}

// Användning:
interageraMedDjur(new Hund()); // Output: *viftar på svansen*
interageraMedDjur(new Katt()); // Output: (inget händer, if-satsen är falsk)
```

# Cirkulärt beroende

## Bakgrund

Om du vill att två paket inte ska vara beroende av varandra så ska de kunna kompileras var för sig.

Klasserna ska inte "känna till" varandras inre tillstånd. Om en klass är beroende av t.ex. Word objekt genom `getWord(int index) : Word ` så behöver klassen veta vad en Word är -> den kan alltså inte kompileras så länge vi inte kompilerar Word först. 

I exemplet hade vi även att Word implementerar Operand, som ligger i ett annat paket, vilket leder till att vi får cirkulärt beroende. Om vi istället låter en ny klass enkapsulera ett Word-objekt och implementera Operande i samma paket så slipper vi ha en implementations-pil och istället ha en aggregationpil. Detta innebär att vi tidigare hade implementation som pekade från    

    hardware --> software

och nu pekar den istället:

    software --> hardware 

Varför? Jo eftersom software "har en" Word genom enkapsulation, den "äger" en referens till Word i WordOperand. 

Så totalt har vi två beroenden från paketen som båda pekar till hardware: 


    Operand -----------> Memory  (getWord(Memory))

    WordOperand <>-----> Word 

Och innan implementerade word Operand , vilket vi nu tar bort och vänder hållet på pilen!

    Operand <|.......... Word 


# Flow synch

## bakgrund

Varför vill vi dela in program i MVC -> SRP och lättare att läsa och förstå. 


Denna klassen gör allt i MVC , vi bryter ner den


```java
class Switch extends JButton implements ActionListener {

    private boolean on = false;

    public Switch() {
        super("Off");
        addActionListener(this);
    }

    public void actionPerformed(ActionEvent e) {
        on = !on;
        setText(on ? "On" : "Off");
    }
}
```

# MVC 

Om man ritar MVC förhållandet får man att 

    V -> M
    C -> V
    C -> M

och

    M --> V
    V --> C

View kan vilja kalla på Controller ifall user klickat på något. 
View kan även observera tillståndet i model för att representera tillståndet (observer och observable)

Baserat på relationerna ser vi att model inte direkt har någon relation utåt , förutom en svag relation till view.

```java
class SwitchModel {

    private boolean isOn = false;

    public SwitchModel  () {   // behövs egentligen inte
    }

    public boolean isOn() {
        return isOn;
    }

    public void toggle() {
        isOn = !isOn;
    }
}
```

Medan vi ser att View har en Model och kan anropa på controller ifall user klickar

```java
class SwitchView extends JButton {

    private SwitchModel model;

    public SwitchView  (SwitchModel model) {
        super("Loading...");
        this.model = model;
        update();
    }

    public void update() {
        setText(model.isOn()
                ? "I'm on"
                : "I'm off");
    }
}
```

och

```java
class SwitchController {
  
    public SwitchController  (SwitchModel model,
                              SwitchView view) {
        view.addActionListener(ae -> {
                model.toggle();
                view.update();
            });                    
    }
}
```

Med andra ord så när vi får ett anrop från view via actionListener så går vi via controller som gör två anrop inuti 
sitt lambdauttryck ; `toggle()` och `update()` där den första ändrar i model och den sista ändrar vyn. 

# Observer och observable


 Om vi vill använda Observer synchronization måste vi börja med att göra vår modell observerbar, så vi skrev:

```java 
class SwitchModel extends Observable {
  
    private boolean isOn = false;
  
    public SwitchModel  () {}   // behövs egentligen inte

    public void toggle() {
        isOn = !isOn;
        setChanged();
        notifyObservers();            
    }

    public boolean isOn() {
        return isOn;
    }

}
```

Vi kan använda samma SwitchView som ovan:

```java

class SwitchView extends JButton {

    private SwitchModel model;

    public SwitchView  (SwitchModel model) {
        super("Loading...");
        this.model = model;
        update();
    }

    public void update() {
        setText(model.isOn()
                ? "I'm on"
                : "I'm off");
    }
}
```


Dessa båda klasser kopplade vi sedan ihop med hjälp av en controller, men denna gång såg den till att vyn själv lyssnade på modellen:


```java
class SwitchController {
  
    public SwitchController  (SwitchModel model,
                              SwitchView view) {
        model.addObserver((obs, obj) -> view.update());
        view.addActionListener(e -> model.toggle());
    }
}
``` 

Detta är inte helt observer synch men nästan , när vi user knapptryck så är det view som pratar med model och när vi får
`toggle` så kommer den att ändra State och notifiera alla observers vilket innebär att `view.update()` anropas.  



# Factory


```java
class CommandFactory {

    public Command parse(String line) {
        var tokens = line.split(",");
        return
            switch (tokens[0]) {
            case "ny-patient" ->
                new AddPatientCommand(tokens[1],
                                      tokens[2],
                                      tokens[3]);

            case "mätning" ->
                new AddMeasurementCommand(tokens[1],
                                          tokens[2],
                                          Double.parseDouble(tokens[3]));

            default ->
                new IllegalCommand(line);
            };
    }
}
```
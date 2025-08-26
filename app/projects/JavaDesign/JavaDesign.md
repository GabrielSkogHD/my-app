

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


# Syntax

```java

    villkor ? värde_om_sant : värde_om_falskt;

    //ex

    return index < values.length ? Optional.of(values[index]) : Optional.empty();


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
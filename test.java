import java.util.Scanner;

public class test {
    public static void main(String args[]){

        Scanner scan = new Scanner(System.in);

        System.out.print("Enter code: ");
        String userInput = scan.nextLine();

        // Split the string into an array of tokens
        String[] inputArray = userInput.split("\\s*([=;])\\s*|\\s*(?<=\")(.*?)(?=\")");

        // Display the resulting array of tokens
        System.out.println("Output:");
        for (String token : inputArray) {
            if (token.trim().length() > 0) {
                System.out.println(token);
            }
        }

        
    }
}

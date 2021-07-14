package queue;

public class Receiver {
    public void receiveMessage(String message) {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Received <" + message + ">");
    }

}


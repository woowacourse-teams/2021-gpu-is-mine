package mine.is.gpu.infra;

public class MailComponent {
    private final String subject;
    private final String content;

    public MailComponent(String subject, String content) {
        this.subject = subject;
        this.content = content;
    }

    public String getSubject() {
        return subject;
    }

    public String getContent() {
        return content;
    }
}

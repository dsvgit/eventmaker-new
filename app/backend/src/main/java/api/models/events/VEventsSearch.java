package api.models.events;

public class VEventsSearch {
    private String searchText;

    public VEventsSearch() {
    }

    public VEventsSearch(String searchText) {
        this.searchText = searchText;
    }

    public String getSearchText() {
        return searchText;
    }

    public void setSearchText(String searchText) {
        this.searchText = searchText;
    }
}

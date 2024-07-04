import React, { useState, useEffect } from 'react';
import "../../../scss/Components/Project/Details/Searchbar.scss"

interface SearchComponentProps {
    participants: string[];
    onSelect: (selected: string[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ participants, onSelect }) => {
    const [query, setQuery] = useState('');
    const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
    const [filteredPeople, setFilteredPeople] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setQuery(query);

        if (query) {
            setFilteredPeople(participants.filter(person => person.toLowerCase().includes(query)));
        } else {
            setFilteredPeople([]);
        }
    };

    const handleSuggestionClick = (person: string) => {
        if (!selectedPeople.includes(person)) {
            const updatedSelectedPeople = [...selectedPeople, person];
            setSelectedPeople(updatedSelectedPeople);
            onSelect(updatedSelectedPeople);
        }
        setQuery('');
        setFilteredPeople([]);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest('.search-container')) {
            setFilteredPeople([]);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className="search-container">
            <input
                type="text"
                id="searchInput"
                value={query}
                onChange={handleInputChange}
                placeholder="Suche nach Personen..."
            />
            <div id="suggestions" className="suggestions">
                {filteredPeople.map(person => (
                    <div
                        key={person}
                        className="suggestion"
                        onClick={() => handleSuggestionClick(person)}
                    >
                        {person}
                    </div>
                ))}
            </div>
            <div id="selectedNames" className="selected-names">
                {/* Ausgewählte Personen: {selectedPeople.map(p => `"${p}"`).join(', ')} */}
            </div>
        </div>
    );
};

export default SearchComponent;

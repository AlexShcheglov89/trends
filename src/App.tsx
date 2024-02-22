import React, { useState, useEffect } from 'react';
import { AppBar, Container, Tab, Tabs, styled } from '@mui/material';
import RepoList from './components/RepoList';
import StarredRepos from './components/StarredRepos';
import TabPanel from './components/TabPanel';
import { RepoItemProps } from './components/RepoItem';
import axios from 'axios';
import moment from 'moment';

const DATE_LAST_WEEK = moment().subtract(1, "week").format("YYYY-MM-DD");

const StyledContainer = styled(Container)({
  paddingTop: '24px',
});

const App: React.FC = () => {
  const [value, setValue] = useState(0);
  const [starredRepos, setStarredRepos] = useState<RepoItemProps[]>([]);
  const [repos, setRepos] = useState<RepoItemProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const storedStarredRepos = JSON.parse(localStorage.getItem('starredRepos') || '[]');
    // localStorage.clear();
    setStarredRepos([...storedStarredRepos]);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<{ items: RepoItemProps[] }>(
          `https://api.github.com/search/repositories?q=created:>${DATE_LAST_WEEK}&sort=stars&order=desc`
        );
        setRepos(response.data.items);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const handleStarToggle = (id: string) => {
    const updatedStarredRepos: RepoItemProps[] = starredRepos;
    const selectedStarredItem = updatedStarredRepos.findIndex(item => item.id === id);
    const selectedItem = repos.findIndex(item => item.id === id);

    if(selectedStarredItem >= 0){
      updatedStarredRepos.splice(selectedStarredItem, 1)
    } else {
      updatedStarredRepos.push(repos[selectedItem]);
    }

    setStarredRepos([...updatedStarredRepos]);
    localStorage.setItem("starredRepos", JSON.stringify(updatedStarredRepos));
  };

  return (
    <div>
      <AppBar position="static" color='default'>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Repositories" />
          <Tab label="Starred Repos" />
        </Tabs>
      </AppBar>
      <StyledContainer>
        <TabPanel value={value} index={0}>
          <RepoList repos={repos} starredRepos={starredRepos}  onStarToggle={handleStarToggle} loading={loading} error={error}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StarredRepos onStarToggle={handleStarToggle} starredRepos={starredRepos} />
        </TabPanel>
      </StyledContainer>
    </div>
  );
};

export default App;

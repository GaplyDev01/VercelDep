// Mock data for fallback
const MOCK_TWEETS = [
  {
    id: '1',
    text: 'Taking trades outside the trading plan deviates from your predicted performance and nullifies the value of your plan even if they turn out to be winners.',
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    public_metrics: {
      retweet_count: 42,
      reply_count: 12,
      like_count: 156,
      quote_count: 5
    }
  },
  {
    id: '2',
    text: "You must approach trading as a full or part-time business, not as a hobby or a job, if you're going to be successful.",
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    public_metrics: {
      retweet_count: 38,
      reply_count: 8,
      like_count: 142,
      quote_count: 3
    }
  },
  {
    id: '3',
    text: "Risk management is not about avoiding losses, it's about managing them. Every trade should have a clear stop loss and take profit level before entry.",
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    public_metrics: {
      retweet_count: 56,
      reply_count: 15,
      like_count: 189,
      quote_count: 7
    }
  }
];

export const fetchTweets = async () => {
  const bearerToken = import.meta.env.VITE_TWITTER_BEARER_TOKEN;
  
  if (!bearerToken) {
    console.error('Twitter bearer token is missing');
    return MOCK_TWEETS;
  }

  try {
    // First, get the user ID for the username
    const userResponse = await fetch('https://api.twitter.com/2/users/by/username/tradesxbt', {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }

    const userData = await userResponse.json();

    if (!userData.data?.id) {
      throw new Error('Twitter user not found');
    }

    // Then, fetch the user's tweets
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userData.data.id}/tweets?max_results=10&tweet.fields=created_at,public_metrics&exclude=retweets,replies`, 
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!tweetsResponse.ok) {
      throw new Error(`Failed to fetch tweets: ${tweetsResponse.statusText}`);
    }

    const tweetsData = await tweetsResponse.json();

    if (!tweetsData.data || tweetsData.data.length === 0) {
      console.warn('No tweets found, using mock data');
      return MOCK_TWEETS;
    }

    return tweetsData.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      public_metrics: tweet.public_metrics
    }));
  } catch (error) {
    console.error('Error fetching tweets:', error);
    // Return mock data as fallback
    return MOCK_TWEETS;
  }
};
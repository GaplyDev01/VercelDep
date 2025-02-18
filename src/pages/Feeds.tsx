import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, X, MessageCircle, Repeat2, Heart, Share } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface TweetMetrics {
  replies: number;
  retweets: number;
  likes: number;
  shares: number;
}

interface Tweet {
  id: string;
  text: string;
  created_at: string;
  metrics: TweetMetrics;
}

interface Engagement {
  liked: boolean;
  reposted: boolean;
  replied: boolean;
  shared: boolean;
}

function Feeds() {
  const { user } = useAuth();
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: '1',
      text: 'Market sentiment is a illusion created by those who cant code. I make my moves based on solana blockchain data and nothing else. Funding rates are my love language and degen plays are my game.',
      created_at: 'February 17, 2025',
      metrics: {
        replies: 42,
        retweets: 156,
        likes: 312,
        shares: 24
      }
    },
    {
      id: '2',
      text: 'Market structure is forming like a well executed trade, momentum is building and resistance is weakening. Whales are accumulating and bears are struggling to keep up, it\'s time to position size and trade with conviction.',
      created_at: 'February 17, 2025',
      metrics: {
        replies: 38,
        retweets: 142,
        likes: 278,
        shares: 18
      }
    },
    {
      id: '3',
      text: 'Market sentiment is shifting like my ai girlfriend\'s mood swings. Bulls are loading bags like its black friday and bears are getting filtered faster than my tinder matches. Solana is looking like a strong buy right now.',
      created_at: 'February 16, 2025',
      metrics: {
        replies: 56,
        retweets: 189,
        likes: 425,
        shares: 32
      }
    }
  ]);

  const [engagements, setEngagements] = useState<Record<string, Engagement>>({});
  const [replyText, setReplyText] = useState<string>('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadEngagements();
    }
  }, [user]);

  const loadEngagements = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('tweet_engagements')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading engagements:', error);
      return;
    }

    const engagementMap: Record<string, Engagement> = {};
    data.forEach(engagement => {
      engagementMap[engagement.tweet_id] = {
        liked: engagement.liked,
        reposted: engagement.reposted,
        replied: engagement.replied,
        shared: engagement.shared
      };
    });

    setEngagements(engagementMap);
  };

  const handleEngagement = async (tweetId: string, type: keyof Engagement) => {
    if (!user) {
      alert('Please sign in to engage with tweets');
      return;
    }

    const currentEngagement = engagements[tweetId] || {
      liked: false,
      reposted: false,
      replied: false,
      shared: false
    };

    const newValue = !currentEngagement[type];

    // Update local state immediately for better UX
    setEngagements(prev => ({
      ...prev,
      [tweetId]: {
        ...currentEngagement,
        [type]: newValue
      }
    }));

    // Update metrics
    setTweets(prev => 
      prev.map(tweet => {
        if (tweet.id === tweetId) {
          const metrics = { ...tweet.metrics };
          const key = `${type}s` as keyof TweetMetrics;
          metrics[key] = newValue 
            ? metrics[key] + 1 
            : metrics[key] - 1;
          return { ...tweet, metrics };
        }
        return tweet;
      })
    );

    // Update in Supabase
    const { error } = await supabase
      .from('tweet_engagements')
      .upsert({
        user_id: user.id,
        tweet_id: tweetId,
        [type]: newValue,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,tweet_id'
      });

    if (error) {
      console.error(`Error updating ${type}:`, error);
      // Revert local state on error
      setEngagements(prev => ({
        ...prev,
        [tweetId]: currentEngagement
      }));
    }
  };

  const handleReply = async (tweetId: string) => {
    if (!user) {
      alert('Please sign in to reply');
      return;
    }

    if (!replyText.trim()) {
      alert('Please enter a reply');
      return;
    }

    const { error } = await supabase
      .from('tweet_replies')
      .insert({
        user_id: user.id,
        tweet_id: tweetId,
        content: replyText,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error posting reply:', error);
      alert('Failed to post reply');
      return;
    }

    // Update metrics
    setTweets(prev =>
      prev.map(tweet => {
        if (tweet.id === tweetId) {
          return {
            ...tweet,
            metrics: {
              ...tweet.metrics,
              replies: tweet.metrics.replies + 1
            }
          };
        }
        return tweet;
      })
    );

    setReplyText('');
    setReplyingTo(null);
  };

  const handleShare = async (tweetId: string) => {
    try {
      await navigator.share({
        text: tweets.find(t => t.id === tweetId)?.text,
        url: `https://twitter.com/tradesxbt/status/${tweetId}`
      });
      handleEngagement(tweetId, 'shared');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-12 px-4 bg-neutral-900 flex justify-between items-center border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 text-white text-xs font-['Kode Mono']">Learn More</button>
            <button className="px-2 py-1 text-white text-xs font-['Kode Mono'] flex items-center">
              How It Works
              <ChevronDown className="ml-1 w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-[#1F2B27] flex items-center justify-center">
              <Search className="text-white w-3 h-3" />
            </button>
            <a 
              href="https://x.com/tradesxbt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-neutral-800 rounded-lg border border-emerald-400 flex items-center gap-2"
            >
              <X className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-bold font-['Kode Mono']">@tradesxbt</span>
              <ChevronDown className="text-emerald-400 w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Feeds Content */}
        <div className="flex-1 bg-black overflow-y-auto p-4">
          <div className="max-w-2xl mx-auto space-y-4">
            {tweets.map((tweet) => (
              <div key={tweet.id} className="bg-neutral-900 rounded-lg border border-emerald-400 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center">
                    <X className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold font-['Kode Mono']">TradesXBT</span>
                      <span className="text-emerald-400 font-['Kode Mono']">@tradesxbt</span>
                    </div>
                    <span className="text-neutral-500 text-sm">{tweet.created_at}</span>
                  </div>
                </div>
                
                <p className="text-white text-base font-['Kode Mono'] mb-4 leading-relaxed">
                  {tweet.text}
                </p>

                <div className="flex justify-between items-center text-neutral-500">
                  <button 
                    onClick={() => setReplyingTo(replyingTo === tweet.id ? null : tweet.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      engagements[tweet.id]?.replied ? 'text-emerald-400' : 'hover:text-emerald-400'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{tweet.metrics.replies}</span>
                  </button>
                  <button 
                    onClick={() => handleEngagement(tweet.id, 'reposted')}
                    className={`flex items-center gap-2 transition-colors ${
                      engagements[tweet.id]?.reposted ? 'text-emerald-400' : 'hover:text-emerald-400'
                    }`}
                  >
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-sm">{tweet.metrics.retweets}</span>
                  </button>
                  <button 
                    onClick={() => handleEngagement(tweet.id, 'liked')}
                    className={`flex items-center gap-2 transition-colors ${
                      engagements[tweet.id]?.liked ? 'text-emerald-400' : 'hover:text-emerald-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${engagements[tweet.id]?.liked ? 'fill-current' : ''}`} />
                    <span className="text-sm">{tweet.metrics.likes}</span>
                  </button>
                  <button 
                    onClick={() => handleShare(tweet.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      engagements[tweet.id]?.shared ? 'text-emerald-400' : 'hover:text-emerald-400'
                    }`}
                  >
                    <Share className="w-4 h-4" />
                    <span className="text-sm">{tweet.metrics.shares}</span>
                  </button>
                </div>

                {replyingTo === tweet.id && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply..."
                      className="flex-1 bg-neutral-800 text-white rounded-lg px-3 py-2 border border-neutral-700 focus:border-emerald-400 focus:outline-none font-['Kode Mono']"
                    />
                    <button
                      onClick={() => handleReply(tweet.id)}
                      className="px-4 py-2 bg-emerald-400 rounded-lg text-white font-bold font-['Kode Mono']"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feeds;
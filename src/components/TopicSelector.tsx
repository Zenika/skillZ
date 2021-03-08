import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

type Topic = {
  id: string;
  name: string;
};

type TopicSelectorData = {
  Topic: Topic[];
  UserTopic: { Topic: Topic }[];
};

const TOPIC_SELECTOR_QUERY = gql`
  query topicSelectorQuery($email: String!) {
    Topic {
      id
      name
    }
    UserTopic(where: { User: { email: { _eq: $email } } }) {
      Topic {
        id
        name
      }
    }
  }
`;

const TopicSelector = ({ email, topics, setTopics }) => {
  const { data, error, loading } = useQuery<TopicSelectorData>(
    TOPIC_SELECTOR_QUERY,
    {
      variables: {
        email,
      },
    }
  );
  const addTopic = (topic: Topic) => {
    if (topics.filter((t) => t.Topic.id === topic.id).length <= 0) {
      setTopics([...topics, { Topic: topic }]);
    } else {
      setTopics([...topics.filter((t) => t.Topic.id !== topic.id)]);
    }
  };
  return (
    <div className="flex flex-auto flex-col">
      <div className="flex flex-auto flex-col text-center">
        {data?.Topic.map((topic) => (
          <button
            className={`flex-grow-0 rounded-full py-3 px-6 mx-6 my-2 ${
              topics.filter((t) => t.Topic.id === topic.id).length > 0
                ? "gradient-red"
                : "dark:bg-dark-panel"
            }`}
            key={topic.id}
            onClick={() => addTopic(topic)}
          >
            {topic.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;

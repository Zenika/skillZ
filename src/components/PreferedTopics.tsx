import { gql, useQuery } from "@apollo/client";
import { TopicSelectorQueryQuery } from "../generated/graphql";
import Button from "./Button";

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
  const { data, error, loading } = useQuery<TopicSelectorQueryQuery>(
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
          <Button
            type={"primary"}
            key={topic.id}
            style={
              topics.filter((t) => t.Topic.id === topic.id).length > 0
                ? "contained"
                : "outlined"
            }
            callback={() => addTopic(topic)}
          >
            {topic.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopicSelector;

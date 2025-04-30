
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import { Link, useParams } from 'react-router-dom';
import { Car } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

// Mock conversation data
const conversationData = {
  id: 'm1',
  vehicleId: '1',
  vehicleTitle: 'Mercedes-Benz E 220d AMG Line',
  vehicleImage: 'https://images.unsplash.com/photo-1554223090-7e482851df45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80',
  vehiclePrice: 49990,
  buyerId: 'buyer123',
  buyerName: 'Thomas Dupont',
  buyerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  sellerId: 'seller456',
  sellerName: 'Garage Premium',
  sellerImage: 'https://images.unsplash.com/photo-1560286756-4775327f521e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  messages: [
    {
      id: '1',
      senderId: 'buyer123',
      text: 'Bonjour, je suis intéressé par cette Mercedes. Est-elle toujours disponible?',
      timestamp: '2023-04-30T10:15:00Z',
      read: true
    },
    {
      id: '2',
      senderId: 'seller456',
      text: 'Bonjour Thomas, oui la voiture est toujours disponible. Souhaitez-vous venir la voir?',
      timestamp: '2023-04-30T10:30:00Z',
      read: true
    },
    {
      id: '3',
      senderId: 'buyer123',
      text: 'Oui, ce serait bien. Quels sont vos horaires d\'ouverture?',
      timestamp: '2023-04-30T10:45:00Z',
      read: true
    },
    {
      id: '4',
      senderId: 'seller456',
      text: 'Nous sommes ouverts de 9h à 19h du lundi au samedi. Quand souhaiteriez-vous venir?',
      timestamp: '2023-04-30T11:00:00Z',
      read: true
    },
    {
      id: '5',
      senderId: 'buyer123',
      text: 'Je pourrais venir ce samedi vers 14h, est-ce possible?',
      timestamp: '2023-04-30T11:15:00Z',
      read: true
    },
    {
      id: '6',
      senderId: 'seller456',
      text: 'Parfait, je note le rendez-vous pour samedi à 14h. Je serai là pour vous accueillir et vous montrer le véhicule.',
      timestamp: '2023-04-30T11:30:00Z',
      read: true
    },
    {
      id: '7',
      senderId: 'buyer123',
      text: 'Est-ce que le prix est négociable?',
      timestamp: '2023-04-30T14:35:00Z',
      read: false
    }
  ]
};

// Current user (would come from authentication in a real app)
const currentUserId = 'seller456';

const Chat = () => {
  const { id } = useParams();
  const [conversation, setConversation] = useState(conversationData);
  const [newMessage, setNewMessage] = useState('');
  
  // Format timestamp for display
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for group headings
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };
  
  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  conversation.messages.forEach(message => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
        read: false
      };
      
      setConversation(prev => ({
        ...prev,
        messages: [...prev.messages, newMsg]
      }));
      setNewMessage('');
    }
  };
  
  const otherUser = currentUserId === conversation.buyerId ? 
    { id: conversation.sellerId, name: conversation.sellerName, image: conversation.sellerImage } :
    { id: conversation.buyerId, name: conversation.buyerName, image: conversation.buyerImage };
  
  return (
    <div className="min-h-screen bg-autovista-light-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-[calc(100vh-13rem)]">
          {/* Chat Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <img 
                  src={otherUser.image} 
                  alt={otherUser.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-semibold">{otherUser.name}</h2>
                <p className="text-sm text-autovista-dark-gray">
                  À propos de: <Link to={`/vehicle/${conversation.vehicleId}`} className="hover:underline text-autovista-blue">{conversation.vehicleTitle}</Link>
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to={`/vehicle/${conversation.vehicleId}`} className="flex items-center">
                <Car className="h-4 w-4 mr-2" />
                Voir le véhicule
              </Link>
            </Button>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[calc(100%-13rem)] overflow-y-auto p-4 bg-gray-50">
            {/* Vehicle Info Card */}
            <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden flex">
              <div className="w-24 h-24">
                <img 
                  src={conversation.vehicleImage} 
                  alt={conversation.vehicleTitle}
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-3 flex-1">
                <h3 className="font-semibold text-sm truncate">{conversation.vehicleTitle}</h3>
                <p className="font-bold text-autovista-blue">{conversation.vehiclePrice.toLocaleString()} €</p>
              </div>
            </div>
            
            {/* Message Groups */}
            {Object.entries(groupedMessages).map(([date, messages]) => (
              <div key={date} className="mb-6">
                <div className="text-center mb-4">
                  <span className="bg-gray-200 text-autovista-dark-gray text-xs px-3 py-1 rounded-full">
                    {formatDate(messages[0].timestamp)}
                  </span>
                </div>
                
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex mb-4 ${
                      message.senderId === currentUserId ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.senderId !== currentUserId && (
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                        <img 
                          src={conversation.buyerId === message.senderId ? conversation.buyerImage : conversation.sellerImage} 
                          alt={conversation.buyerId === message.senderId ? conversation.buyerName : conversation.sellerName}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    <div 
                      className={`max-w-[70%] px-4 py-2 rounded-lg ${
                        message.senderId === currentUserId 
                          ? 'bg-autovista-teal text-white' 
                          : 'bg-white border'
                      }`}
                    >
                      <p>{message.text}</p>
                      <div 
                        className={`text-[10px] mt-1 ${
                          message.senderId === currentUserId 
                            ? 'text-white/70 text-right' 
                            : 'text-autovista-dark-gray'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                        {message.senderId === currentUserId && (
                          <span className="ml-1">{message.read ? '✓✓' : '✓'}</span>
                        )}
                      </div>
                    </div>
                    {message.senderId === currentUserId && (
                      <div className="w-8 h-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
                        <img 
                          src={conversation.sellerId === currentUserId ? conversation.sellerImage : conversation.buyerImage} 
                          alt={conversation.sellerId === currentUserId ? conversation.sellerName : conversation.buyerName}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input 
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-autovista-teal hover:bg-autovista-blue"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

import {Component, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms"; // ✅ Import CommonModule for ngClass

@Component({
  selector: 'app-chat',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule, FormsModule], // ✅ Include CommonModule to enable ngClass
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnDestroy {

  ngOnDestroy() {
    console.log('Chat component destroyed');
  }

  newMessage: string = "";
  messages: { sender: string; text: string; time: string; avatar: string }[] = [
    { sender: "Patient", text: "Doctor can i come visit you on March 31th", time: "2:05 PM", avatar: "assets/user1.png" },
    { sender: "Doctor", text: "You have to check if there are any appointments available in the app", time: "5:37 PM", avatar: "assets/user2.png" },
    { sender: "Patient", text: "Okay Doctor thank you", time: "6:10 PM", avatar: "assets/user1.png" }
  ];

  sendMessage() {
    if (this.newMessage.trim() !== "") {
      this.messages.push({
        sender: "me",
        text: this.newMessage,
        time: new Date().toLocaleTimeString(),
        avatar: "assets/user2.png"
      });
      this.newMessage = "";
    }
  }
}

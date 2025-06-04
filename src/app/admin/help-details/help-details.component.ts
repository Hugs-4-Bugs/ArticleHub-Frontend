import { Component } from '@angular/core';

@Component({
  selector: 'app-help-details',
  templateUrl: './help-details.component.html',
  styleUrls: ['./help-details.component.scss']
})
export class HelpDetailsComponent {

  handleAddAction(action: 'faq' | 'support') {
    if (action === 'faq') {
      // Navigate to FAQ page, open modal, or show inline FAQ
      alert('📄 Redirecting to Frequently Asked Questions...');
      // Optionally navigate using router:
      // this.router.navigate(['/faq']);
    } else if (action === 'support') {
      // Trigger support modal, open email, or display form
      alert('📝 Opening contact support form...');
      // You could also do:
      // window.location.href = 'mailto:Mailtoprabhat72@gmail.com';
    }
  }

}

package com.dbanksdesign.styledictionarydarkmode;

import android.os.Bundle;

import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.navigation.Navigation;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


public class ComponentsFragment extends Fragment {


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_components, container, false);

        CardView buttonCard = view.findViewById(R.id.button_card_view);
        buttonCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_navigation_components_to_navigation_button);
            }
        });

        CardView badgeCard = view.findViewById(R.id.badge_card_view);
        badgeCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Navigation.findNavController(view).navigate(R.id.action_navigation_components_to_navigation_badge);
            }
        });

        return view;
    }
}